import React from "react";
import { Button } from "@mui/material";
import RechartBar from "./RechartTest";
import Sliders from "./Sliders";
import { SpotlightTour, useSpotlight } from "react-spotlight-tour";
import Spotlight from "react-spotlight-tour/spotlight";

export default function AssessmentBody({
  currentSlide,
  desiredSlide,
  questionNum,
  questionIndex,
  handleBack,
  handleNext,
  handleCurrent,
  handleDesired,
}) {
  const spotlightRef2 = useSpotlight("Press next to continue.", "top");
  return (
    <>
      <div className="w-1/4 hidden md:flex text-xs md:-ml-5 md:-mb-5 mt-3 font-bold">
        <div className="ml-40 flex items-center pl-5 py-4">
          <div className="w-[10px] bg-[#09497B] h-[10px] rounded-full mr-2"></div>
          Current
        </div>
        <div className="ml-5 flex items-center">
          <div className="w-[10px] bg-[#FDB517] h-[10px] rounded-full mr-2"></div>
          Desired
        </div>
      </div>
      <div className="md:hidden p-1 relative mb-2 px-4 mb-8 mt-4">
        <div className="absolute -mt-5 text-sm">
          {currentSlide == 1 && questionNum.Response_1}
          {currentSlide == 2 && questionNum.Response_2}
          {currentSlide == 3 && questionNum.Response_3}
          {currentSlide == 4 && questionNum.Response_4}
          {currentSlide == 5 && questionNum.Response_5}
        </div>
      </div>
      <div className="mt-5 md:flex">
        <div className="md:-mr-10 z-20">
          <Sliders
            handleCurrent={handleCurrent}
            currentSlide={currentSlide}
            handleDesired={handleDesired}
            desiredSlide={desiredSlide}
          ></Sliders>
        </div>

        <div className="md:hidden p-1 relative -mt-4 px-4 text-sm">
          <div className="absolute">
            {desiredSlide == 1 && questionNum.Response_1}
            {desiredSlide == 2 && questionNum.Response_2}
            {desiredSlide == 3 && questionNum.Response_3}
            {desiredSlide == 4 && questionNum.Response_4}
            {desiredSlide == 5 && questionNum.Response_5}
          </div>
        </div>
        <div className="hidden display h-80 md:flex text-slate-500 flex-row flex-row-reverse md:flex-col justify-between -ml-14 text-xs mt-2">
          <div>Level 5</div>
          <div>Level 4</div>
          <div>Level 3</div>
          <div>Level 2</div>
          <div className="mb-4">Level 1</div>
          <div></div>
        </div>
        <div className="hidden h-80 flex flex-col md:flex justify-between ml-10 text-slate-700 text-xs md:w-1/3">
          <div
            className={
              "p-1 " +
              ((currentSlide == 5 && "outline outline-[#09497B] ") || "") +
              (desiredSlide == 5 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_5}
          </div>

          <div
            className={
              "p-1 " +
              ((currentSlide == 4 && "outline outline-[#09497B] ") || "") +
              (desiredSlide == 4 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_4}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSlide == 3 && "outline outline-[#09497B] ") || "") +
              (desiredSlide == 3 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_3}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSlide == 2 && "outline outline-[#09497B] ") || "") +
              (desiredSlide == 2 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_2}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSlide == 1 && "outline outline-[#09497B] ") || "") +
              (desiredSlide == 1 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_1}
          </div>
          <div></div>
        </div>
        <div className="md:-mt-24 -mt-18 md:flex md:justify-center relative -z-10">
          <RechartBar
            currentSlide={currentSlide}
            desiredSlide={desiredSlide}
          ></RechartBar>
        </div>
      </div>
      <div className="w-screen flex -mt-80 md:mt-0 justify-between md:justify-center ">
        <div className="p-2 ">
          {questionIndex > 0 && (
            <Button variant="outlined" size="large" onClick={handleBack}>
              BACK
            </Button>
          )}
          {questionIndex == 0 && (
            <Button variant="outlined" size="large" disabled>
              BACK
            </Button>
          )}
        </div>
        <div ref={spotlightRef2} className="p-2">
          {currentSlide != 0 && desiredSlide != 0 && (
            <Button variant="outlined" size="large" onClick={handleNext}>
              NEXT
            </Button>
          )}
          {(currentSlide == 0 || desiredSlide == 0) && (
            <Button variant="outlined" size="large" disabled>
              NEXT
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
