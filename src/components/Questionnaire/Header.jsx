import React from "react";

export default function Header({ questionNum, count }) {
  return (
    <>
      <header>
        <h1 className="hidden md:block pt-2 pl-2 md:p-6 md:pl-40 text-xs md:text-xs font-bold">
          My Assessment
        </h1>
        {/* <div className=" divider w-40 ml-6 md:ml-40"></div> */}
        <h2 className="mt-2 text-lg md:text-xl font-light pl-8 md:pl-0 md:ml-40 md:pl-2 -mt-5 md:mt-0 bg-slate-100 md:bg-white">
          {questionNum.Type}
        </h2>
      </header>
      <div className="md:ml-40 md:bg-[#bde1f7] w-fit p-4">
        <div className="md:mt-2  md:-mb-1 md:ml-4 font-bold text-slate-600 text-sm md:text-md">
          Question {questionNum.Number} of {count}
        </div>
        <h3 className=" font-bold text-lg md:text-2xl">
          {questionNum.Dimension}
        </h3>
        {/* <div className="md:hidden divider"></div> */}
      </div>
    </>
  );
}
