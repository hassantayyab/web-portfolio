import { ContactEmail } from '@/emails/contact';
import { REQUEST_SECURITY } from '@/lib/constants';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import { checkRateLimit } from '@/lib/rate-limit';
import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

/**
 * Contact form API route handler
 * Handles form submissions, rate limiting, and email sending via Resend
 */

const resend = new Resend(env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(
      REQUEST_SECURITY.MAX_NAME_LENGTH,
      `Name must be at most ${REQUEST_SECURITY.MAX_NAME_LENGTH} characters`,
    )
    .regex(/^[a-zA-Z0-9\s\-'.,]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email address is too long')
    .toLowerCase(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(
      REQUEST_SECURITY.MAX_SUBJECT_LENGTH,
      `Subject must be at most ${REQUEST_SECURITY.MAX_SUBJECT_LENGTH} characters`,
    ),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(
      REQUEST_SECURITY.MAX_MESSAGE_LENGTH,
      `Message must be at most ${REQUEST_SECURITY.MAX_MESSAGE_LENGTH} characters`,
    ),
  // Honeypot field - should be empty (spam protection)
  website: z.string().max(0).optional(),
});

/**
 * Validate IP address format (IPv4 and IPv6)
 */
function isValidIP(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 regex (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  // IPv6 compressed format
  const ipv6CompressedRegex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ipv6CompressedRegex.test(ip);
}

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Read request body with size limit
 * For Next.js Request, we can use the text() method directly
 */
async function readRequestBody(request: NextRequest): Promise<string> {
  // Clone the request to avoid consuming the original body
  const clonedRequest = request.clone();

  try {
    const bodyText = await clonedRequest.text();

    // Check size
    const bodySize = new TextEncoder().encode(bodyText).length;
    if (bodySize > REQUEST_SECURITY.MAX_BODY_SIZE) {
      throw new Error(
        `Request body exceeds maximum size of ${REQUEST_SECURITY.MAX_BODY_SIZE} bytes`,
      );
    }

    return bodyText;
  } catch (error) {
    if (error instanceof Error && error.message.includes('exceeds maximum size')) {
      throw error;
    }
    throw new Error('Failed to read request body');
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  // Set up timeout
  const timeoutPromise = new Promise<NextResponse>((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json({ error: 'Request timeout. Please try again.' }, { status: 408 }));
    }, REQUEST_SECURITY.TIMEOUT_MS);
  });

  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIP || 'unknown';

    // Validate IP format
    if (ip === 'unknown' || !isValidIP(ip)) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 400 });
    }

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset),
          },
        },
      );
    }

    // Read and parse request body with size limit
    const bodyText = await Promise.race([
      readRequestBody(request),
      timeoutPromise.then(() => {
        throw new Error('Request timeout');
      }),
    ]);

    let body: unknown;
    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: result.error.flatten(),
          requestId,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, website } = result.data;

    // Honeypot check - if filled, it's a bot
    if (website && website.length > 0) {
      logger.info('Honeypot triggered - potential spam detected', {
        requestId,
        ip,
      });
      return NextResponse.json(
        {
          error: 'Invalid form submission',
          requestId,
        },
        { status: 400 },
      );
    }

    // Sanitize inputs (React Email will handle escaping, but extra safety)
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Check if Resend API key is configured
    if (!env.RESEND_API_KEY) {
      logger.info('Contact form submission (Resend not configured)', {
        requestId,
        name: sanitizedName,
        email,
        subject: sanitizedSubject,
      });

      return NextResponse.json({
        success: true,
        message: 'Message received (email delivery not configured)',
        requestId,
      });
    }

    // Render React Email component
    const emailHtml = await render(
      ContactEmail({
        name: sanitizedName,
        email,
        subject: sanitizedSubject,
        message: sanitizedMessage,
      }),
    );

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [env.CONTACT_EMAIL || 'hello@example.com'],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: emailHtml,
    });

    if (error) {
      logger.error('Resend API error', error, {
        requestId,
        email,
      });
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again.',
          requestId,
        },
        { status: 500 },
      );
    }

    const responseTime = Date.now() - startTime;

    // Get current rate limit status for headers
    const currentRateLimit = await checkRateLimit(ip);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: data?.id,
        requestId,
      },
      {
        headers: {
          'X-Response-Time': `${responseTime}ms`,
          'X-RateLimit-Limit': String(currentRateLimit.limit),
          'X-RateLimit-Remaining': String(currentRateLimit.remaining),
          'X-RateLimit-Reset': String(currentRateLimit.reset),
        },
      },
    );
  } catch (error) {
    const responseTime = Date.now() - startTime;

    // Handle timeout errors
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json(
        {
          error: 'Request timeout. Please try again.',
          requestId,
        },
        {
          status: 408,
          headers: {
            'X-Response-Time': `${responseTime}ms`,
          },
        },
      );
    }

    // Handle body size errors
    if (error instanceof Error && error.message.includes('exceeds maximum size')) {
      return NextResponse.json(
        {
          error: 'Request body too large',
          requestId,
        },
        {
          status: 413,
          headers: {
            'X-Response-Time': `${responseTime}ms`,
          },
        },
      );
    }

    logger.error('Contact API error', error, {
      requestId,
      responseTime: `${responseTime}ms`,
    });

    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        requestId,
      },
      {
        status: 500,
        headers: {
          'X-Response-Time': `${responseTime}ms`,
        },
      },
    );
  }
}
