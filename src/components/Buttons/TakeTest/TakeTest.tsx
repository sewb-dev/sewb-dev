import React from "react";
import Link from "next/link";
import Button from "../Button";
const TakeTest = () => {
  return (
    <Button>
      <Link href="/">
        <button
          className={`rounded border-gray-600 border bg-gray-500 text-white px-4 py-2 cursor-pointer w-full hover:opacity-90`}
        >
          Take Test
        </button>
      </Link>
    </Button>
  );
};

export default TakeTest;
