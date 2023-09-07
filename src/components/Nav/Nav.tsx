import Image from "next/image";
const Nav = () => {
  return (
    <nav className="flex gap-2 w-full h-16  border-b border-b-slate-600 px-6 items-center bg-black">
      <Image
        src="/qnaAI-light.svg"
        style={{
          width: "auto",
          height: "auto",
        }}
        width={100}
        height={100}
        alt="logo"
      />
      {/* <div className="ml-auto">
            <p>QNAI</p>
            </div> */}
    </nav>
  );
};

export default Nav;
