import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/sign-in' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';
    const isAdmin = request.cookies.get('admin')?.value === 'true';

    // Redirect to home if logged-in user tries to access public paths
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    
    if (path.startsWith('/admin')) {
        // If no token or not admin, redirect to login
        if (!token || !isAdmin) {
            return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
        }
    }
}


export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/verifyemail',
        '/profile',
        '/admin/:path*' 

    ]
}