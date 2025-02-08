import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';
    const isAdmin = request.cookies.get('admin')?.value === 'true';

    // Redirect to home if logged-in user tries to access public paths
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Protect admin routes
    if (path.startsWith('/admin')) {
        // If no token or not admin, redirect to login
        if (!token || !isAdmin) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }

    // Protect non-public routes for non-logged in users
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/profile',
        '/admin/:path*'  // This will match all routes starting with /admin
    ]
}