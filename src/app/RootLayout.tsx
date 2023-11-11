'use client';

import Nav from '@/components/Nav';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ThemeRegistry>
    <SessionProvider>
      <Nav />
      <ToastContainer />
      {children}
    </SessionProvider>
  </ThemeRegistry>
);

export default RootLayout;
