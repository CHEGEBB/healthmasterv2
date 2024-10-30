'use client';

import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/contexts/authContext';
import { UserProvider } from '@/contexts/userContext';
import appwriteAuth from '@/appwrite/auth';
import appwriteInfo from '@/appwrite/info';

import React, { useEffect, useState } from 'react';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState<{} | null>(null);
  useEffect(() => {
    appwriteAuth.isLoggedIn().then((authStatus) => {
      setAuthStatus(authStatus);
      appwriteInfo.getPersonalInfo().then((data) => {
        setUser(data);
      }
      );
      if (!authStatus) {
        router.replace('/login');
        return <></>;
      }
    });
  }, []);
  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      <UserProvider value={{ user, setUser }}>
        {children}
      </UserProvider>
    </AuthProvider>
  );
};

export default ProtectedLayout;
