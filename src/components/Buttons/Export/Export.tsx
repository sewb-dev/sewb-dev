import React from "react";
import Button from "../Button";

const Export = () => {
  return (
    <Button>
      <button
        className={`rounded border-gray-600 border bg-black text-white px-4 py-2 cursor-pointer w-full hover:opacity-90`}
      >
        Export
      </button>
    </Button>
  );
};

export default Export;
