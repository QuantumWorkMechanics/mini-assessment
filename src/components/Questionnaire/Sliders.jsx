import React, { useState, useEffect } from "react";

export default function Sliders({ handleCurrent, handleDesired, currentSliderValue, desiredSliderValue, handleSlider }) {
  return (
    <>
      <div className="md:place-self-start md:my-40 flex flex-col md:flex-row justify-center md:justify-start -mt-6 md:mt-0 px-6 md:p-0">
        <div className="m-4 text-slate-600 md:hidden text-xs mb-1">Current Level</div>
        <div className=" md:-mr-20">
          <div className=" ">
            <input
              // ref={spotlightRef}
              type="range"
              value={currentSliderValue}
              min={0}
              max={4}
              className="bg-white md:w-80 md:-rotate-90 range range-xs range-primary"
              step="1"
              onChange={(e) => handleSlider(e.target.value, "Current")}
            />
            <div className="z-20"></div>
          </div>
        </div>

        <div className="text-slate-600 md:hidden m-4 text-xs mb-1">Desired Level</div>
        <div className=" md:-ml-44">
          <div className="flex flex-col">
            <div className=" bottom-0">
              <input
                // ref={spotlightRef}
                id="desired"
                type="range"
                value={desiredSliderValue}
                min={0}
                max={4}
                className="bg-white  md:w-80 md:-rotate-90 range range-xs range-secondary"
                step="1"
                onChange={(e) => handleSlider(e.target.value, "Desired")}
              />
              <div className="flex justify-between w-full h-full md:-rotate-90 md:ml-8 pointer-events-none md:-mt-9 p-2">
                <div className=""></div>
                {/* <div className="w-1 h-6 bg-slate-400 rounded"></div> */}
                <div className="md:mr-2 w-1 h-2 bg-slate-400 rounded"></div>
                <div className="md:mr-2 w-1 h-2 bg-slate-400 rounded"></div>
                <div className="md:mr-2 w-1 h-2 bg-slate-400 rounded"></div>
                <div className="md:mr-2 w-1 h-2 bg-slate-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden text-xs text-[#878787] flex flex-row flex-row-reverse justify-between w-full -ml-1">
          <div>BASIC</div>
          <div></div>
          <div></div>
          <div className="pl-2">LEADER</div>
          <div></div>
        </div>
      </div>
    </>
  );
}
