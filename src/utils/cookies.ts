'use server';

import { cookies } from 'next/headers';

export const setSessionCookie = async (token: string) => {
    const cookieStore = await cookies(); // not async
    cookieStore.set({
        name: 'session',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
};

export const getSessionCookie = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('session')?.value;
};

export const clearSessionCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('session');
};
