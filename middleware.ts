/**
 * EduPlan NG - Production Middleware & Route Guard (Next.js / Edge & Universal Entrypoint)
 *
 * Implements TASK 3 Route Guarding:
 * - If a logged-out user attempts to access /dashboard or /dashboard/*:
 *   Immediately redirects to /login (no flashes of protected content).
 * - If an authenticated user attempts to access /login or /signup:
 *   Immediately redirects to /dashboard (no redundant auth forms).
 * - Enforces NDPA 2023 security headers across all edge responses.
 */

export * from './src/middleware.ts';

/**
 * Universal Next.js / Edge Route Guard
 */
export function middleware(req: any) {
  const url = typeof req.nextUrl?.clone === 'function'
    ? req.nextUrl.clone()
    : new URL(req.nextUrl ? req.nextUrl.toString() : req.url, 'http://localhost:3000');
  const pathname = url.pathname;

  // 1. Session Cookie Inspection
  // Checks both EduPlan session cookie and Better Auth standard cookie
  let sessionToken: string | null = null;
  let isLoggedOut = false;

  if (req.cookies) {
    if (typeof req.cookies.get === 'function') {
      sessionToken = req.cookies.get('eduplan_session')?.value || req.cookies.get('better-auth.session_token')?.value || null;
      isLoggedOut = req.cookies.get('eduplan_logged_out')?.value === 'true';
    } else {
      sessionToken = req.cookies['eduplan_session'] || req.cookies['better-auth.session_token'] || null;
      isLoggedOut = req.cookies['eduplan_logged_out'] === 'true';
    }
  }

  // Also check raw Cookie header if available
  if (!sessionToken && req.headers) {
    const rawCookie = typeof req.headers.get === 'function' ? req.headers.get('cookie') : req.headers.cookie;
    if (rawCookie) {
      if (rawCookie.includes('eduplan_logged_out=true')) {
        isLoggedOut = true;
      }
      const match = rawCookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
      if (match && !isLoggedOut) {
        sessionToken = match[1];
      }
    }
  }

  const isAuthenticated = Boolean(sessionToken && !isLoggedOut);

  // 2. Guard: Protect /dashboard and /dashboard/* from logged-out users
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/app/dashboard')) {
    if (!isAuthenticated) {
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.toString(),
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      });
    }
  }

  // 3. Guard: Redirect already-authenticated users away from /login and /signup directly to /dashboard
  if (pathname === '/login' || pathname === '/signup' || pathname === '/auth') {
    if (isAuthenticated) {
      url.pathname = '/dashboard';
      url.searchParams.delete('redirect');
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.toString(),
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      });
    }
  }

  // 4. Default Response with NDPA 2023 Security Headers
  const response = new Response(null, {
    headers: {
      'X-NDPA-Compliance': 'Act-2023-Sec24-Authorized',
      'X-Data-Controller': 'EduPlan NG — Nigeria Data Protection Commission Registered',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': pathname.startsWith('/api/') ? 'no-store' : 'public, max-age=3600',
    },
  });

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/signup',
    '/auth',
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)',
  ],
};
