import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function withAuth(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, 
  });

  const responseUrl = new URL('/login', request.url);

  if (!token || !token.exp || token.exp as number * 1000 < Date.now()) {
    const response = NextResponse.redirect(responseUrl);
    
    const cookieName = process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';

    response.cookies.set(cookieName, '', {
      maxAge: 0,
      path: '/', 
    });

    return response;
  }

  return null;
}
