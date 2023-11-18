'use client';

import Nav from '@/components/Nav';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ThemeRegistry>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <ToastContainer />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  </ThemeRegistry>
);

export default RootLayout;
