import React from "react";

export default function Header({ currentQuestion, count, questionIndex }) {
  return (
    <>
      <div className="max-sm:flex max-sm:gap-2 max-sm:w-screen justify-between">
        <div className="w-1/2 mt-2 md:-mb-1 md:ml-40  text-slate-600 text-sm md:text-sm">
          Question <span className="font-bold text-[#09497B]">{questionIndex} </span>of <span className="font-bold text-[#09497B]">{count}</span>
        </div>
        <h3 className="md:hidden text-right font-bold text-xs h-4 overflow-auto mt-2">{currentQuestion.Dimension}</h3>
      </div>
      <header className="mt-2">
        {/* <h1 className="hidden md:block pt-2 pl-2 md:p-6 md:pl-40 text-xs md:text-xs font-bold">My Assessment</h1> */}
        {/* <h2 className="pt-4 text-lg md:text-xl font-light pl-8 md:pl-0 md:ml-40 md:pl-2  md:mt-0 bg-slate-100 md:bg-white">{questionNum.Type}</h2> */}

        <div className="md:ml-40 max-sm:hidden md:bg-[#bde1f7] w-fit p-3">
          <h3 className="max-sm:hidden font-bold text-xs md:text-xs">{currentQuestion.Dimension}</h3>
        </div>
      </header>
    </>
  );
}
