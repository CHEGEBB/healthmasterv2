import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    '/dashboard',
    '/reminders',
    '/medication',
    '/health-stats',
    '/profile',
    '/settings'
  ];

  const authToken = req.cookies.get('authToken')?.value || null;

  // If the user tries to access a protected route and is not authenticated
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !authToken) {
    // Redirect to the login page
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed if authenticated
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes that match these patterns
  matcher: ['/dashboard', '/reminders', '/medication', '/health-stats', '/profile', '/settings'],
};
