'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSessionCookie } from '@/utils/cookies'; // Assuming this reads and verifies token

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await getSessionCookie();
        setIsLoggedIn(!!token); // You could verify it further with Firebase if needed
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
