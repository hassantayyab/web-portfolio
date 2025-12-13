import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminPassword,
  createToken,
  setAuthCookie,
  createSessionPayload,
} from '@/lib/auth';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/auth/verify-password
 * Verify admin password and create session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { password } = validation.data;

    // Verify password
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      // Add a small delay to prevent brute force attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create session token
    const sessionPayload = createSessionPayload();
    const token = await createToken(sessionPayload);

    // Set auth cookie
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      session: {
        authenticated: true,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

