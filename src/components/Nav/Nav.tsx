import Image from "next/image";
const Nav = () => {
  return (
    <nav className="flex gap-2 w-full h-16  border-b border-b-slate-600 px-6 items-center bg-black">
      <Image
        src="/qnaAI-light1.svg"
        style={{
          width: "auto",
          height: "auto",
        }}
        width={150}
        height={150}
        alt="logo"
      />
      {/* <div className="ml-auto">
            <p>QNAI</p>
            </div> */}
    </nav>
  );
};

export default Nav;