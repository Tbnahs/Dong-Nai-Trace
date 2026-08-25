import React, { createContext, useContext, useState } from 'react';

export interface FileDoc {
  name: string;
  dataUrl: string;
  mimeType: string;
}

export interface OrgProfile {
  name: string;
  taxCode: string;
  type: string;
  industry: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  representative: string;
  representativePhone: string;
  representativeEmail: string;
  cccd: string;
  gcp?: string;
}

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
  type: string;
  profile: OrgProfile;
  documents: {
    businessLicense?: FileDoc;
    authorization?: FileDoc;
    certification?: FileDoc;
    certificationType?: string;
    businessImage?: FileDoc;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string) => void;
  logout: () => void;
  saveRegistrationDocs: (
    email: string,
    docs: { businessLicense?: FileDoc; authorization?: FileDoc; certification?: FileDoc; certificationType?: string; businessImage?: FileDoc },
  ) => void;
  saveRegistrationProfile: (
    email: string,
    profile: OrgProfile,
    docs: { businessLicense?: FileDoc; authorization?: FileDoc; certification?: FileDoc; certificationType?: string; businessImage?: FileDoc },
  ) => void;
  updateProfile: (
    profile: OrgProfile,
    docs: { businessLicense?: FileDoc; authorization?: FileDoc; certification?: FileDoc; certificationType?: string; businessImage?: FileDoc },
  ) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  saveRegistrationDocs: () => {},
  saveRegistrationProfile: () => {},
  updateProfile: () => {},
});

function loadDocs(email: string): AuthUser['documents'] {
  try {
    const raw = localStorage.getItem(`regDocs_${email}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const defaultProfile = (email: string): OrgProfile => ({
  name: 'HTX Nông nghiệp Xanh',
  taxCode: '3601234567',
  type: 'Hợp tác xã (HTX)',
  industry: 'Nông sản & Rau củ',
  address: 'Xã Bình Lộc, Huyện Vĩnh Cửu',
  district: 'Vĩnh Cửu',
  phone: '0901234567',
  email,
  representative: 'Nguyễn Văn A',
  representativePhone: '0901234567',
  representativeEmail: email,
  cccd: '',
});

function loadProfile(email: string): OrgProfile {
  try {
    const raw = localStorage.getItem(`regProfile_${email}`);
    return raw ? { ...defaultProfile(email), ...JSON.parse(raw) } : defaultProfile(email);
  } catch {
    return defaultProfile(email);
  }
}

function toAuthUser(profile: OrgProfile, documents: AuthUser['documents']): AuthUser {
  return {
    name: profile.name,
    email: profile.representativeEmail || profile.email,
    initials: profile.name.slice(0, 2).toUpperCase(),
    type: profile.type,
    profile,
    documents,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string) => {
    const profile = loadProfile(email);
    const docs = loadDocs(email);
    setUser(toAuthUser(profile, docs));
  };

  const logout = () => setUser(null);

  const saveRegistrationDocs = (
    email: string,
    docs: AuthUser['documents'],
  ) => {
    try {
      localStorage.setItem(`regDocs_${email}`, JSON.stringify(docs));
    } catch {
      // localStorage quota exceeded — skip silently
    }
  };

  const saveRegistrationProfile = (
    email: string,
    profile: OrgProfile,
    docs: AuthUser['documents'],
  ) => {
    try {
      localStorage.setItem(`regProfile_${email}`, JSON.stringify(profile));
      localStorage.setItem(`regDocs_${email}`, JSON.stringify(docs));
    } catch {
      // localStorage quota exceeded — keep the in-memory flow usable
    }
  };

  const updateProfile = (
    profile: OrgProfile,
    docs: AuthUser['documents'],
  ) => {
    const previousEmail = user?.email;
    const email = profile.representativeEmail || profile.email;
    try {
      localStorage.setItem(`regProfile_${email}`, JSON.stringify(profile));
      localStorage.setItem(`regDocs_${email}`, JSON.stringify(docs));
      if (previousEmail && previousEmail !== email) {
        localStorage.removeItem(`regProfile_${previousEmail}`);
        localStorage.removeItem(`regDocs_${previousEmail}`);
      }
    } catch {
      // localStorage quota exceeded — keep the current session updated
    }
    setUser(toAuthUser(profile, docs));
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!user,
      user,
      login,
      logout,
      saveRegistrationDocs,
      saveRegistrationProfile,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
