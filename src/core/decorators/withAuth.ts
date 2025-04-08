import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from '@/utils/cookies';

export async function withAuth(request: NextRequest) {
  const token = await getSessionCookie();

  if (!token) {
    // Usuário não está logado, redireciona para login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return null; // Permite o acesso
}
