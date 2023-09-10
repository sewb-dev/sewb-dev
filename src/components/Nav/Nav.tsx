import Image from "next/image";
const Nav = () => {
  return (
    <nav className="flex gap-2 w-full h-16 md:h-20  border-b border-b-slate-600 px-6 items-center bg-black">
      <Image
        src="/qnaAI-light.svg"
        width="0"
        height="0"
        sizes="100vw"
        className="w-20 md:w-28 h-auto"
        alt="logo"
        priority={true}
      />
      {/* <div className="ml-auto">
            <p>QNAI</p>
            </div> */}
    </nav>
  );
};

export default Nav;
