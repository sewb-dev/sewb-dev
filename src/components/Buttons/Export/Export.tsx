import React from 'react';
import Button from '../Button';

const Export = () => {
  return (
    <Button>
      <button
        className={`w-full cursor-pointer rounded border border-gray-600 bg-black px-4 py-2 text-white hover:opacity-90`}
      >
        Export
      </button>
    </Button>
  );
};

export default Export;
