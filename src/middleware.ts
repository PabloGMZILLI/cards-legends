import { withAuth } from '@/core/decorators/withAuth';
import { withGuestOnly } from '@/core/decorators/withGuestOnly';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authenticatedRoutes = [
        '/dashboard',
        '/profile',
    ];

    const publicRoutes = [
        '/login',
        '/signup',
    ];

    // Protege rotas privadas
    if (authenticatedRoutes.some(route => pathname.startsWith(route))) {
        const authRedirect = await withAuth(request);
        if (authRedirect) return authRedirect;
      }

    // Impede usuário logado de acessar login/register
    if (publicRoutes.includes(pathname)) {
        const guestRedirect = await withGuestOnly(request);
        if (guestRedirect) return guestRedirect;
      }

    return null;
}

export const config = {
    matcher: [
        '/login',
        '/signup',
        '/dashboard/:path*',
        '/profile/:path*',
    ],
};
