import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get refresh token from cookie
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  // Public routes (auth)
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  // Protected routes (dashboard)
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname === '/';

  // If user is logged in and tries to access auth routes, redirect to dashboard
  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (isProtectedRoute && !refreshToken && pathname !== '/login' && pathname !== '/register') {
      // Allow the home page to be public if needed, but here we protect it
      // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
