'use client';
import Image from 'next/image';
import Login from '../Login';
import envVariables from '@/lib/env';
import { Box, Button, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const { data: session, status } = useSession();
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
        <Tooltip
          title='Login to access Dashboard'
          arrow={true}
          disableHoverListener={status === 'authenticated'}
        >
          <Link href={status === 'authenticated' ? '/ai' : '#'}>
            <Button
              variant='contained'
              disabled={status !== 'authenticated'}
              sx={{
                '&.Mui-disabled': {
                  background: '#4A5568',
                },
              }}
            >
              Dashboard
            </Button>
          </Link>
        </Tooltip>
        {envVariables.getEnv('SHOW_FEATURE') === 'true' && <Login />}
      </Box>
    </nav>
  );
};

export default Nav;
