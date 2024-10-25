'use client';

import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/contexts/authContext';

import appwriteAuth from '@/appwrite/appwriteAuth';

import React, { useEffect, useState } from 'react';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    appwriteAuth.isLoggedIn().then((authStatus) => {
      setAuthStatus(authStatus);
      if (!authStatus) {
        router.replace('/login');
        return <></>;
      }
    });
  }, []);
  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthProvider>
  );
};

export default ProtectedLayout;
