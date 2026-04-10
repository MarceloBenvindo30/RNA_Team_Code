import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAccessToken as saveToken } from '../api/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: { access_token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('rna_user');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('rna_access_token');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  useEffect(() => {
    if (token) {
      saveToken(token);
    } else {
      saveToken(null);
    }
  }, [token]);

  const login = ({ access_token, user }: { access_token: string; user: User }) => {
    setToken(access_token);
    setUser(user);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('rna_access_token', access_token);
      window.localStorage.setItem('rna_user', JSON.stringify(user));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('rna_access_token');
      window.localStorage.removeItem('rna_user');
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
