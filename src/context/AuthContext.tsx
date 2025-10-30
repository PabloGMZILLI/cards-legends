'use client';

import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CustomUser } from '@/types';

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  user: CustomUser | null; // você pode tipar melhor se tiver um tipo custom
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  user: null,
});

export const AuthProviderContext = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const isLoggedIn = status === 'authenticated';
  const loading = status === 'loading';
  const user = session?.user ?? null;

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      loading,
      user, 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
