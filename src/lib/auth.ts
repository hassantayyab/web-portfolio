import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

/**
 * Authentication utilities for blog admin access
 * Uses JWT tokens stored in HTTP-only cookies
 */

// Environment variables
const BLOG_PASSWORD = process.env.BLOG_ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const COOKIE_NAME = 'blog-admin-token';
const TOKEN_EXPIRY = '7d'; // 7 days

if (!BLOG_PASSWORD) {
  console.warn('⚠️  BLOG_ADMIN_PASSWORD not set in environment variables');
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Verify the blog admin password
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!BLOG_PASSWORD) {
    console.error('BLOG_ADMIN_PASSWORD not configured');
    return false;
  }

  // For simplicity, we're doing a direct comparison
  // In production, you'd store a hashed password
  return password === BLOG_PASSWORD;
}

/**
 * Create a JWT token
 */
export async function createToken(payload: Record<string, unknown>): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);

  return token;
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as Record<string, unknown>;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Remove auth cookie
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get auth token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) return false;

  const payload = await verifyToken(token);
  return !!payload;
}

/**
 * Require authentication (throws if not authenticated)
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error('Authentication required');
  }
}

/**
 * Get auth token from request (for middleware)
 */
export function getAuthTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}

/**
 * Verify authentication in middleware
 */
export async function verifyAuthFromRequest(request: NextRequest): Promise<boolean> {
  const token = getAuthTokenFromRequest(request);
  if (!token) return false;

  const payload = await verifyToken(token);
  return !!payload;
}

/**
 * Create redirect response to login page
 */
export function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

/**
 * Auth session type
 */
export interface AuthSession extends Record<string, unknown> {
  authenticated: boolean;
  role: 'admin';
  expiresAt: number;
}

/**
 * Create auth session payload
 */
export function createSessionPayload(): AuthSession {
  return {
    authenticated: true,
    role: 'admin',
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

