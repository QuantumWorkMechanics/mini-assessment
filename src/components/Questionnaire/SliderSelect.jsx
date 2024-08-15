import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";
import RechartBar from "./RechartBar";
import Sliders from "./Sliders";
import logo from "../../assets/colorLogo.png";
import Controls from "../Utils.jsx/Controls";

export default function SliderSelect({
  currentSliderValue,
  desiredSliderValue,
  currentQuestion,
  questionIndex,
  handleBack,
  handleNext,
  handleCurrent,
  handleDesired,
  spotLight,
  setSpotLight,
  handleSlider,
  isAutoAdvance,
  setIsAutoAdvance,
}) {
  const [isError, setIsError] = useState(false);
  const CHAR_LIMIT = 300;

  useEffect(() => {
    if (desiredSliderValue > 0 && currentSliderValue > desiredSliderValue) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [currentSliderValue, desiredSliderValue]);

  return (
    <>
      <h2 className="text-xl md:min-h-20 text-center pt-8 md:mx-40">{currentQuestion.question}</h2>
      <div className="w-1/4 hidden md:flex text-xs md:-ml-5 md:-mb-5 mt-3 font-bold pt-6">
        <div className="ml-40  flex items-center pl-5 py-4">
          <div className="w-[10px] bg-[#09497B] h-[10px] rounded-full mr-2"></div>
          Current
        </div>
        <div className="ml-5 flex items-center">
          <div className="w-[10px] bg-[#FDB517] h-[10px] rounded-full mr-2"></div>
          Desired
        </div>
      </div>

      <div className="overflow-scroll border m-2 md:border-none  h-24 md:hidden p-1 relative  px-2 mb-8 mt-4">
        <div className="absolute text-sm">
          {currentSliderValue == 0 && <div className="text-slate-400">Use the sliders to see more:</div>}
          {currentSliderValue == 1 && currentQuestion.Response_1}
          {currentSliderValue == 2 && currentQuestion.Response_2}
          {currentSliderValue == 3 && currentQuestion.Response_3}
          {currentSliderValue == 4 && currentQuestion.Response_4}
          {/* {currentSliderValue == 5 && questionNum.Response_5} */}
        </div>
      </div>
      <div className="mt-5 md:items-center flex  flex-col md:flex md:flex-row">
        <div className="md:mt-40 md:-mr-10 z-20">
          {spotLight == 1 && (
            <>
              <div className="hidden md:block absolute text-white z-50 text-2xl md:w-72  ml-20 animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear ">
                Use the sliders to select your current and desired level
              </div>
              <div className=" md:hidden absolute text-white z-50 text-2xl w-72 -mt-20 ml-20 animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear ">
                Tap to select your current and desired level
              </div>
              <div
                onClick={() => setSpotLight((prev) => prev + 1)}
                className="mt-20 ml-36 md:ml-34 md:mt-44  z-50 absolute bg-white rounded animate-fade-up animate-once  animate-duration-[800ms] animate-ease-linear"
              >
                <button className="p-3 ">Continue</button>
              </div>
              <div
                onClick={() => setSpotLight((prev) => prev + 1)}
                className="pinhole z-30 w-[130px] h-[130px] mt-8 ml-32 md:mt-32 md:ml-32 rounded-full animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear "
              ></div>
            </>
          )}
          {isError && <div className=" absolute ml-24 tooltip tooltip-open w-40" data-tip={"Desired Level cannot be less than Current Level."}></div>}
          <Sliders
            handleSlider={handleSlider}
            handleCurrent={handleCurrent}
            currentSliderValue={currentSliderValue}
            handleDesired={handleDesired}
            desiredSliderValue={desiredSliderValue}
          ></Sliders>
        </div>

        <div className="overflow-scroll border m-2 md:border-none  h-24 md:hidden relative  px-2 text-sm">
          <div className="absolute">
            {desiredSliderValue == 0 && <div className="text-slate-400">Use the sliders to see more:</div>}
            {desiredSliderValue == 1 && currentQuestion.Response_1}
            {desiredSliderValue == 2 && currentQuestion.Response_2}
            {desiredSliderValue == 3 && currentQuestion.Response_3}
            {desiredSliderValue == 4 && currentQuestion.Response_4}
            {/* {desiredSliderValue == 5 && questionNum.Response_5} */}
          </div>
        </div>

        <div className="hidden display h-80 md:flex text-xs text-slate-500 flex-row flex-row-reverse md:flex-col justify-between -ml-20 text-xs ">
          {/* <div>Level 5</div> */}
          <div>LEADER</div>
          <div>MATURE</div>
          <div>EMERGING</div>
          <div className="mb-4">BASIC</div>
          <div></div>
        </div>

        <div className=" hidden h-80 flex flex-col md:flex justify-between ml-10 text-slate-700 text-xs md:w-[120%]">
          {/* <div
            className={
              "p-1 " +
              ((currentSliderValue == 5 && "outline outline-[#09497B] ") ||
                "") +
              (desiredSliderValue == 5 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {questionNum.Response_5}
          </div> */}

          <div
            className={
              "p-1 w-fit " +
              ((currentSliderValue == 4 && "outline outline-[#09497B] ") || "") +
              (desiredSliderValue == 4 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {currentQuestion.Response_4.slice(0, CHAR_LIMIT)}
          </div>
          <div
            className={
              "p-1 w-fit " +
              ((currentSliderValue == 3 && " outline outline-[#09497B] ") || "") +
              (desiredSliderValue == 3 && " ring ring-inset ring-[#FDB517]")
            }
          >
            {currentQuestion.Response_3.slice(0, CHAR_LIMIT)}
          </div>
          <div
            className={
              "p-1 w-fit " +
              ((currentSliderValue == 2 && "outline outline-[#09497B] ") || "") +
              (desiredSliderValue == 2 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {currentQuestion.Response_2.slice(0, CHAR_LIMIT)}
          </div>
          <div
            className={
              "p-1 w-fit " +
              ((currentSliderValue == 1 && "outline outline-[#09497B] ") || "") +
              (desiredSliderValue == 1 && "ring ring-inset ring-[#FDB517]")
            }
          >
            {currentQuestion.Response_1.slice(0, CHAR_LIMIT)}
          </div>
          <div></div>
        </div>
        <div className="md:hidden block  md:mt-4">
          <Controls
            handleBack={handleBack}
            handleNext={handleNext}
            questionIndex={questionIndex}
            isActive={currentQuestion.Current > 0 && currentQuestion.Desired > 0 && currentQuestion.Desired > currentQuestion.Current}
            isAutoAdvance={isAutoAdvance}
            setIsAutoAdvance={setIsAutoAdvance}
          />
        </div>
        <div className="-mt-20  md:-mt-24 md:flex md:justify-end relative -z-10">
          <RechartBar currentSliderValue={currentSliderValue} desiredSliderValue={desiredSliderValue}></RechartBar>
        </div>
      </div>
      <div className="hidden md:block md:mt-4">
        <Controls
          handleBack={handleBack}
          handleNext={handleNext}
          questionIndex={questionIndex}
          isActive={currentQuestion.Current > 0 && currentQuestion.Desired > 0 && currentQuestion.Desired > currentQuestion.Current}
          isAutoAdvance={isAutoAdvance}
          setIsAutoAdvance={setIsAutoAdvance}
          showAutoAdvance={true}
        />
      </div>
      {/* <div className="w-screen flex -mt-80 md:mt-0 justify-between md:justify-center ">
        <div className="p-2 ">
          {questionIndex == 0 && (
            <div className="btn btn-outline disabled bg-[#FFCB18] border-slate-300" size="large">
              BACK
            </div>
          )}
          {questionIndex > 0 && (
            <div className="btn  bg-[#09497B] text-white border-slate-300" size="large" onClick={handleBack}>
              BACK
            </div>
          )}
        </div>
        <div className="p-2">
          {questionIndex > 0 && (
            <div className="btn bg-[#FFCB18] border-slate-300" size="large" onClick={handleNext}>
              NEXT
            </div>
          )}
          {questionIndex == 0 && (
            <Button variant="outlined" size="large" disabled>
              NEXT
            </Button>
          )}
        </div> 
      </div>*/}
      <img src={logo} className="fixed w-[200px] md:w-[300px] overflow-hidden pl-2 right-0 -bottom-10 md:bottom-0" />
    </>
  );
}
