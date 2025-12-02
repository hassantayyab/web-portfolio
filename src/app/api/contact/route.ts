import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { ContactEmail } from "@/emails/contact";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import { RATE_LIMIT } from "@/lib/constants";

/**
 * Contact form API route handler
 * Handles form submissions, rate limiting, and email sending via Resend
 */

const resend = new Resend(env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

// Rate limiting: simple in-memory store (for production, use Redis or similar)
// TODO: Replace with Upstash Redis or Vercel KV for production
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Validate IP format (basic validation)
    if (ip === "unknown" || !ip.match(/^[\d.:a-fA-F]+$/)) {
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 400 }
      );
    }

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          retryAfter: RATE_LIMIT.WINDOW_MS / 1000,
        },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(RATE_LIMIT.WINDOW_MS / 1000)),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Invalid form data", 
          details: result.error.flatten(),
          requestId,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Sanitize inputs (React Email will handle escaping, but extra safety)
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Check if Resend API key is configured
    if (!env.RESEND_API_KEY) {
      // In development, log the submission
      if (process.env.NODE_ENV === "development") {
        console.log("Contact form submission (Resend not configured):", {
          requestId,
          name: sanitizedName,
          email,
          subject: sanitizedSubject,
          message: sanitizedMessage,
        });
      }
      
      return NextResponse.json({
        success: true,
        message: "Message received (email delivery not configured)",
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
      })
    );

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [env.CONTACT_EMAIL || "hello@example.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", {
        requestId,
        error,
        email,
      });
      return NextResponse.json(
        { 
          error: "Failed to send email. Please try again.",
          requestId,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      id: data?.id,
      requestId,
    });
  } catch (error) {
    console.error("Contact API error:", {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { 
        error: "An unexpected error occurred",
        requestId,
      },
      { status: 500 }
    );
  }
}

