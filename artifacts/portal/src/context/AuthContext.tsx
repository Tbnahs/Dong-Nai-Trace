import React, { createContext, useContext, useState } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
  type: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (_email: string) => {
    setUser({
      name: 'HTX Nông nghiệp Xanh',
      email: _email,
      initials: 'HX',
      type: 'Hợp tác xã',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
