import Image from 'next/image';
const Nav = () => {
  return (
    <nav className='flex h-16 w-full items-center gap-2  border-b border-b-slate-600 bg-black px-6 md:h-20'>
      <Image
        src='/qnaAI-light.svg'
        width='0'
        height='0'
        sizes='100vw'
        className='h-auto w-20 md:w-28'
        alt='logo'
        priority={true}
      />
      {/* <div className="ml-auto">
            <p>QNAI</p>
            </div> */}
    </nav>
  );
};

export default Nav;
