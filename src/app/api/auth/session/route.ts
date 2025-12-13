import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/auth/session
 * Check if user is authenticated
 */
export async function GET() {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json({
        authenticated: false,
      });
    }

    return NextResponse.json({
      authenticated: true,
      role: 'admin',
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

