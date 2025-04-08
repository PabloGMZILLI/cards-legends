import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from '@/utils/cookies';

export async function withGuestOnly(request: NextRequest) {
  const token = await getSessionCookie();

  if (token) {
    // Usuário já está logado, redireciona pra página principal
    return NextResponse.redirect(new URL('/', request.url));
  }

  return null; // Permite o acesso
}
