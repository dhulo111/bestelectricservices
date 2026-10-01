import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Determine if the route is protected
  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin-login');
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isAuthApiRoute = pathname.startsWith('/api/admin/auth/login'); // Allow login API

  // If it's not a protected route, let it pass
  if (!isAdminRoute && (!isAdminApiRoute || isAuthApiRoute)) {
    return NextResponse.next();
  }

  // 2. Fetch the admin token
  const token = request.cookies.get('admin_token')?.value;

  // 3. Verify the token
  const verifiedToken = token && (await verifyToken(token).catch(() => null));

  // 4. Handle unauthorized access
  if (!verifiedToken) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Redirect to login if accessing frontend admin pages
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 5. User is authenticated, allow request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g., images)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
