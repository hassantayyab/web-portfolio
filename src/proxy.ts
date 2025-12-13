import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthFromRequest, redirectToLogin } from './lib/auth';

/**
 * Proxy to protect admin and blog creation routes
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes (except admin APIs)
  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/blogs/create',
    '/admin',
    '/api/blogs/draft',
    '/api/blogs/save',
    '/api/upload',
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const isAuthenticated = await verifyAuthFromRequest(request);

    if (!isAuthenticated) {
      // Redirect to login for pages, return 401 for API routes
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

