import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  businessLicense?: UploadedDocument;
  authorizationDocument?: UploadedDocument;
  certification?: UploadedDocument;
  certificationType?: string;
  businessImage?: UploadedDocument;
}

export interface UploadedDocument {
  name: string;
  uri: string;
  mimeType?: string;
  size?: number;
}

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
  type: string;
  profile: OrgProfile;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (profile: OrgProfile, password: string) => Promise<void>;
  updateProfile: (profile: Partial<OrgProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'admin@htx.vn': {
    password: 'demo123',
    user: {
      name: 'HTX Nông nghiệp Xanh Long Khánh',
      email: 'admin@htx.vn',
      initials: 'HX',
      type: 'Hợp tác xã',
      profile: {
        name: 'HTX Nông nghiệp Xanh Long Khánh',
        taxCode: '3600123456',
        type: 'Hợp tác xã',
        industry: 'Nông nghiệp',
        address: 'Số 12, đường Trần Phú, phường Xuân Tân, TP. Long Khánh',
        district: 'Long Khánh',
        phone: '0251 382 1234',
        email: 'admin@htx.vn',
        representative: 'Nguyễn Văn Minh',
        representativePhone: '0901234567',
        representativeEmail: 'nguyenvanminh@htx.vn',
        cccd: '361234567890',
        gcp: '8934673',
      },
    },
  },
};

const makeInitials = (name: string) =>
  name
    .split(' ')
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('auth_user');
        if (stored) setUser(JSON.parse(stored));
      } catch (_) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const demo = DEMO_ACCOUNTS[email.toLowerCase()];
    if (demo && demo.password === password) {
      await AsyncStorage.setItem('auth_user', JSON.stringify(demo.user));
      setUser(demo.user);
      return true;
    }
    // Allow any email with password "demo123" as a registered user
    if (password === 'demo123') {
      const storedProfile = await AsyncStorage.getItem(`profile_${email}`);
      const profile: OrgProfile = storedProfile
        ? JSON.parse(storedProfile)
        : {
            name: email.split('@')[0],
            taxCode: '',
            type: 'Hộ kinh doanh',
            industry: 'Nông nghiệp',
            address: '',
            district: '',
            phone: '',
            email,
            representative: '',
            representativePhone: '',
            representativeEmail: email,
            cccd: '',
          };
      const newUser: AuthUser = {
        name: profile.name || email.split('@')[0],
        email,
        initials: makeInitials(profile.name || email),
        type: profile.type || 'Hộ kinh doanh',
        profile,
      };
      await AsyncStorage.setItem('auth_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('auth_user');
    setUser(null);
  }, []);

  const register = useCallback(async (profile: OrgProfile, _password: string) => {
    const newUser: AuthUser = {
      name: profile.name,
      email: profile.email,
      initials: makeInitials(profile.name),
      type: profile.type,
      profile,
    };
    await AsyncStorage.setItem(`profile_${profile.email}`, JSON.stringify(profile));
    await AsyncStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const updateProfile = useCallback(async (partial: Partial<OrgProfile>) => {
    if (!user) return;
    const updated: AuthUser = {
      ...user,
      name: partial.name ?? user.name,
      initials: partial.name ? makeInitials(partial.name) : user.initials,
      profile: { ...user.profile, ...partial },
    };
    await AsyncStorage.setItem('auth_user', JSON.stringify(updated));
    await AsyncStorage.setItem(`profile_${user.email}`, JSON.stringify(updated.profile));
    setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, isLoading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
