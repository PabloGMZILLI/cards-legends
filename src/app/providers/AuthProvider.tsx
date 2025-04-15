'use client';
import { AuthProviderContext } from '@/context/AuthContext';
import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProviderContext>
        {children}
      </AuthProviderContext>
    </SessionProvider>
  );
};
