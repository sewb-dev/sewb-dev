'use client';

import Image from 'next/image';
import Login from '../Login';
import { SHOW_FEATURE } from '@/utils/constants';
const Nav = () => {
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
      {SHOW_FEATURE && <Login />}
    </nav>
  );
};

export default Nav;
