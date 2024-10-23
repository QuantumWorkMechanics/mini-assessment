import logo from "../../assets/grayScaleLogo.png";
function HeaderDiag() {
  return (
    <div className="w-screen h-20 bg-[#878787] sticky top-0">
      <img src={logo} alt="" className=" h-40 -mt-10 -ml-4 absolute " />
      <div className="bg-[#fdb517] px-4 py-2 absolute right-4 md:right-40  top-5 font-noto ">
        <a className="text-white " href="https://quantumwork.com/">
          HOME
        </a>
      </div>
    </div>
  );
}

export default HeaderDiag;
