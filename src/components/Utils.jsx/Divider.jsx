import qLogo from "../../assets/image12.png";

function Divider({ text }) {
  return (
    <div className="hidden  md:mx-20 xl:mx-40 mt-14 full md:flex justify-center">
      <div className="bg-[#09497B] p-1 px-2 w-full text-[#FDB517] text-2xl font-bold flex justify-between">
        {text} <img className="h-8" src={qLogo} alt="" />
      </div>
    </div>
  );
}

export default Divider;
