import React, { useState, useEffect } from "react";
import Ranges from "./Ranges";

export default function Sliders({
  handleCurrent,
  handleDesired,
  currentSlide,
  desiredSlide,
}) {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [desiredSlide, setDesiredSlide] = useState(0);

  // function handleCurrent(x) {
  //   setCurrentSlide(x);
  //   console.log({ x });
  // }

  return (
    <>
      <div className="md:place-self-start md:my-40 flex flex-col md:flex-row justify-center md:justify-start p-6 md:p-0">
        <div className="m-4 text-slate-600 md:hidden">Current Level</div>
        <div className=" md:-mr-20">
          <div className=" ">
            <input
              type="range"
              value={currentSlide}
              min={0}
              max={5}
              className="bg-white md:w-80 md:-rotate-90 range range-xs range-primary"
              step="1"
              onChange={(e) => handleCurrent(e.target.value)}
            />
            <div className="z-20"></div>
          </div>
        </div>

        <div className="text-slate-600 md:hidden m-4">Desired Level</div>
        <div className=" md:-ml-44">
          <div className="flex flex-col">
            <div className=" bottom-0">
              <input
                id="desired"
                type="range"
                value={desiredSlide}
                min={0}
                max={5}
                className="bg-white  md:w-80 md:-rotate-90 range range-xs range-secondary"
                step="1"
                onChange={(e) => handleDesired(e.target.value)}
              />
              <div className="flex justify-between w-full h-full md:-rotate-90 md:ml-8 pointer-events-none md:-mt-9 p-2">
                <div className=""></div>
                <div className="w-1 h-6 bg-slate-400 rounded"></div>
                <div className="w-1 h-6 bg-slate-400 rounded"></div>
                <div className="w-1 h-6 bg-slate-400 rounded"></div>
                <div className="w-1 h-6 bg-slate-400 rounded"></div>
                <div className="w-1 h-6 bg-slate-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden text-xs text-[#878787] flex flex-row flex-row-reverse justify-between w-full -ml-1">
          <div>5</div>
          <div></div>
          <div></div>
          <div></div>
          <div className="pl-2">1</div>
          <div></div>
        </div>
      </div>
    </>
  );
}
