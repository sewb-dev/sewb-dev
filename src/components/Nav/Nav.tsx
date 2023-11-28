'use client';
import Image from 'next/image';
import Login from '../Login';
import envVariables from '@/lib/env';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <nav className='flex h-16 w-full items-center justify-between gap-2  border-b border-b-slate-600 bg-black px-6 md:h-20'>
      <Image
        src='/qnaAI-light.svg'
        width='0'
        height='0'
        sizes='100vw'
        className='h-auto w-20 md:w-28'
        alt='logo'
        priority={true}
      />
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {status === 'authenticated' && !pathname.startsWith('/ai') && (
          <Link href='/ai'>
            <Button variant='contained'>Dashboard</Button>
          </Link>
        )}
        {envVariables.getEnv('SHOW_FEATURE') === 'true' && <Login />}
      </Box>
    </nav>
  );
};

export default Nav;
