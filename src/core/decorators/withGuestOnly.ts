import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function withGuestOnly(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (token) {
    // Usuário já está logado, redireciona pra página principal
    return NextResponse.redirect(new URL('/', request.url));
  }

  return null; // Permite o acesso
}
