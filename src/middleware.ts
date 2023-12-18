import { NextResponse, NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
export async function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    const IsPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';
    
    if(IsPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

}