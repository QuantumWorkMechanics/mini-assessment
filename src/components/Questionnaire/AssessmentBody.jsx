import { React, useState } from "react";
import { Button } from "@mui/material";
import RechartBar from "./RechartBar";
import Sliders from "./Sliders";
import { SpotlightTour, useSpotlight } from "react-spotlight-tour";
import Spotlight from "react-spotlight-tour/spotlight";

export default function AssessmentBody({
  currentSliderValue,
  desiredSliderValue,
  questionNum,
  questionIndex,
  handleBack,
  handleNext,
  handleCurrent,
  handleDesired,
}) {
  const [spotLight, setSpotLight] = useState(1);
  // const spotlightRef2 = useSpotlight("Press next to continue.", "top");
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
          {currentSliderValue == 1 && questionNum.Response_1}
          {currentSliderValue == 2 && questionNum.Response_2}
          {currentSliderValue == 3 && questionNum.Response_3}
          {currentSliderValue == 4 && questionNum.Response_4}
          {currentSliderValue == 5 && questionNum.Response_5}
        </div>
      </div>
      <div className="mt-5 md:flex">
        <div className="md:-mr-10 z-20">
          {spotLight == 1 && (
            <>
              <div className="hidden md:block absolute text-white z-50 text-2xl md:w-72 md:mt-20 ml-20 animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear ">
                Use the sliders to select your current and desired level
              </div>
              <div className=" md:hidden absolute text-white z-50 text-2xl md:w-72 -mt-20 ml-20 animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear ">
                Tap to select your current and desired level
              </div>
              <div
                onClick={() => setSpotLight((prev) => prev + 1)}
                className="mt-20 ml-36 md:ml-34 md:mt-64  z-50 absolute bg-white rounded animate-fade-up animate-once animate-delay-[1000ms] animate-duration-[800ms] animate-ease-linear"
              >
                <Button>Continue</Button>
              </div>
              <div
                onClick={() => setSpotLight((prev) => prev + 1)}
                className="pinhole z-30 w-[130px] h-[130px] mt-8 ml-32 md:mt-52 md:ml-32 rounded-full animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear "
              ></div>
            </>
          )}
          <Sliders
            handleCurrent={handleCurrent}
            currentSliderValue={currentSliderValue}
            handleDesired={handleDesired}
            desiredSliderValue={desiredSliderValue}
          ></Sliders>
        </div>

        <div className="md:hidden p-1 relative -mt-4 px-4 text-sm">
          <div className="absolute">
            {desiredSliderValue == 1 && questionNum.Response_1}
            {desiredSliderValue == 2 && questionNum.Response_2}
            {desiredSliderValue == 3 && questionNum.Response_3}
            {desiredSliderValue == 4 && questionNum.Response_4}
            {desiredSliderValue == 5 && questionNum.Response_5}
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
              ((currentSliderValue == 5 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 5 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_5}
          </div>

          <div
            className={
              "p-1 " +
              ((currentSliderValue == 4 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 4 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_4}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSliderValue == 3 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 3 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_3}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSliderValue == 2 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 2 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_2}
          </div>
          <div
            className={
              "p-1 " +
              ((currentSliderValue == 1 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 1 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_1}
          </div>
          <div></div>
        </div>
        <div className="md:-mt-24 -mt-18 md:flex md:justify-center relative -z-10">
          <RechartBar
            currentSliderValue={currentSliderValue}
            desiredSliderValue={desiredSliderValue}
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
        <div className="p-2">
          {currentSliderValue != 0 && desiredSliderValue != 0 && (
            <Button variant="outlined" size="large" onClick={handleNext}>
              NEXT
            </Button>
          )}
          {(currentSliderValue == 0 || desiredSliderValue == 0) && (
            <Button variant="outlined" size="large" disabled>
              NEXT
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
