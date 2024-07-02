import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, origin } = req.nextUrl;

  // Allow the request if the token exists or if the user is trying to access the login page
  if (token || pathname === '/login') {
    return NextResponse.next();
  }

  // Redirect to login if user is not authenticated
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Redirect to admin page if user is an admin
  if (token && token.role === 'admin' && pathname === '/') {
    console.log(token)
    return NextResponse.redirect(`${origin}/admin`);
  }

  // Redirect to books page if user is a normal user
  if (token && token.role === 'user' && pathname === '/') {
    return NextResponse.redirect(`${origin}/books`);
  }

  // Allow the request to proceed if authenticated and authorized
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/books/:path*'], // Adjust paths as needed
};
