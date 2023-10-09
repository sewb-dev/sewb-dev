import React from 'react';
import Link from 'next/link';
import Button from '../Button';
const TakeTest = () => {
  return (
    <Button>
      <Link href='/'>
        <button
          className={`w-full cursor-pointer rounded border border-gray-600 bg-gray-500 px-4 py-2 text-white hover:opacity-90`}
        >
          Take Test
        </button>
      </Link>
    </Button>
  );
};

export default TakeTest;
