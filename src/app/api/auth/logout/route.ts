import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

/**
 * POST /api/auth/logout
 * Logout and remove auth cookie
 */
export async function POST() {
  try {
    await removeAuthCookie();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

