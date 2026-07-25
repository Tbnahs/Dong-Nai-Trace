import React, { createContext, useContext, useState } from 'react';

export interface FileDoc {
  name: string;
  dataUrl: string;
  mimeType: string;
}

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
  type: string;
  documents: {
    businessLicense?: FileDoc;
    authorization?: FileDoc;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string) => void;
  logout: () => void;
  saveRegistrationDocs: (
    email: string,
    docs: { businessLicense?: FileDoc; authorization?: FileDoc },
  ) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  saveRegistrationDocs: () => {},
});

function loadDocs(email: string): { businessLicense?: FileDoc; authorization?: FileDoc } {
  try {
    const raw = localStorage.getItem(`regDocs_${email}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (_email: string) => {
    const docs = loadDocs(_email);
    setUser({
      name: 'HTX Nông nghiệp Xanh',
      email: _email,
      initials: 'HX',
      type: 'Hợp tác xã',
      documents: docs,
    });
  };

  const logout = () => setUser(null);

  const saveRegistrationDocs = (
    email: string,
    docs: { businessLicense?: FileDoc; authorization?: FileDoc },
  ) => {
    try {
      localStorage.setItem(`regDocs_${email}`, JSON.stringify(docs));
    } catch {
      // localStorage quota exceeded — skip silently
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout, saveRegistrationDocs }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
