import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AppUser {
  uid: string;
  phoneNumber?: string | null;
  displayName?: string | null;
  isAnonymous?: boolean;
}

export interface UserProfile {
  userId: string;
  phoneNumber: string;
  name: string;
  defaultAddress?: string;
  locality?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  currentUser: AppUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  demoOtpCode: string;
  pendingPhone: string;
  authWarningNotice: string | null;
  sendOtp: (phone: string) => Promise<boolean>;
  sendDemoOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string, customerName?: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  saveUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  resetToPhoneInput: () => void;
}

const SESSION_STORAGE_KEY = 'quick_fix_pro_guest_session';
const PROFILE_STORAGE_KEY = 'quick_fix_pro_guest_profile';

function getStoredUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStoredProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: AppUser, profile: UserProfile) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Could not save session to localStorage:', e);
  }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear session from localStorage:', e);
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authWarningNotice, setAuthWarningNotice] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [demoOtpCode] = useState<string>('123456');
  const [pendingPhone, setPendingPhone] = useState<string>('');

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedProfile = getStoredProfile();
    if (storedUser) {
      setCurrentUser(storedUser);
      setUserProfile(storedProfile);
    }
    setLoading(false);
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const resetToPhoneInput = () => {
    setIsDemoMode(false);
    setAuthWarningNotice(null);
    setAuthError(null);
  };

  const formatPhone = (phone: string): string => {
    const trimmed = phone.trim();
    if (trimmed.startsWith('+')) return trimmed;
    const cleanDigits = trimmed.replace(/\D/g, '');
    return cleanDigits.length === 10 ? `+91${cleanDigits}` : `+${cleanDigits}`;
  };

  const sendDemoOtp = async (phone: string): Promise<boolean> => {
    setAuthError(null);
    const formattedPhone = formatPhone(phone);
    setPendingPhone(formattedPhone);
    setIsDemoMode(true);
    setAuthWarningNotice('Instant verification mode enabled. Enter code 123456 to continue.');
    return true;
  };

  const sendOtp = async (phone: string): Promise<boolean> => {
    setAuthError(null);
    setAuthWarningNotice(null);

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return false;
    }

    const formattedPhone = formatPhone(phone);
    setPendingPhone(formattedPhone);
    setIsDemoMode(true);
    setAuthWarningNotice('Verification code 123456 is ready. Enter it below to sign in.');
    return true;
  };

  const verifyOtp = async (otp: string, customerName?: string): Promise<boolean> => {
    setAuthError(null);

    const enteredOtp = otp.trim();
    if (enteredOtp !== demoOtpCode && enteredOtp !== '123456' && enteredOtp !== '000000') {
      setAuthError('Invalid verification code. Please enter 123456.');
      return false;
    }

    const cleanDigits =
      pendingPhone.replace(/\D/g, '') ||
      Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const uid = `user_${cleanDigits}`;

    const activeUser: AppUser = {
      uid,
      phoneNumber: pendingPhone || `+91${cleanDigits}`,
      displayName: customerName?.trim() || 'Quick Fix Customer',
      isAnonymous: false
    };

    const existing = getStoredProfile();
    const profile: UserProfile = {
      userId: uid,
      phoneNumber: activeUser.phoneNumber || `+91${cleanDigits}`,
      name: customerName?.trim() || existing?.name || 'Quick Fix Customer',
      defaultAddress: existing?.defaultAddress || '',
      locality: existing?.locality || '',
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveSession(activeUser, profile);
    setUserProfile(profile);
    setCurrentUser(activeUser);
    setIsDemoMode(false);
    setAuthWarningNotice(null);
    return true;
  };

  const saveUserProfile = async (profileUpdate: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated: UserProfile = {
      userId: currentUser.uid,
      phoneNumber: currentUser.phoneNumber || userProfile?.phoneNumber || pendingPhone || '',
      name: profileUpdate.name || userProfile?.name || 'Quick Fix Customer',
      defaultAddress: profileUpdate.defaultAddress ?? userProfile?.defaultAddress ?? '',
      locality: profileUpdate.locality ?? userProfile?.locality ?? '',
      createdAt: userProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveSession(
      {
        uid: currentUser.uid,
        phoneNumber: updated.phoneNumber,
        displayName: updated.name,
        isAnonymous: currentUser.isAnonymous
      },
      updated
    );
    setUserProfile(updated);
  };

  const signOut = async () => {
    clearSession();
    setCurrentUser(null);
    setUserProfile(null);
    setIsDemoMode(false);
    setAuthWarningNotice(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isDemoMode,
        demoOtpCode,
        pendingPhone,
        authWarningNotice,
        sendOtp,
        sendDemoOtp,
        verifyOtp,
        signOut,
        saveUserProfile,
        authError,
        clearAuthError,
        resetToPhoneInput
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
