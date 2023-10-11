import React, { useState, useEffect } from "react";

import ResultComponent from "./ResultComponent";
// import Header from "./Results/Header";
import SmallBar from "./SmallBar";
import ResultsDiamond from "./ResultsDiamond";
import HeroResult from "./HeroResult";
import LaunchForm from "./LaunchForm";

export default function Results({ questionList, categories }) {
  const [results, setResults] = useState({});
  const [slides, setSlides] = useState(["diamond"]);
  const [curSlide, setCurSlide] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [desiredTotal, setDesiredTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);

  function findAvg(location, type) {
    let loc = questionList.filter((el) => el.DiamondLoc == location);
    // console.log({ loc });
    let total = loc.reduce(function (accumulator, answer) {
      return (
        accumulator + (type == "current" ? answer.Current : answer.Desired)
      );
    }, 0);
    // console.log({ total });
    return total / loc[0].Of;
  }

  function handleForm() {
    setShowForm(true);
  }

  useEffect(() => {
    let tempObj = { ...categories };
    let tempCurrent = 0;
    let tempDesired = 0;
    let tempArr = ["diamond"];
    if (categories.topLeft) {
      tempCurrent = findAvg("topLeft", "current");
      tempDesired = findAvg("topLeft", "desired");
      tempObj = {
        ...tempObj,
        topLeft: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("topLeft");
    }
    if (categories.topRight) {
      tempCurrent = findAvg("topRight", "current");
      tempDesired = findAvg("topRight", "desired");
      tempObj = {
        ...tempObj,
        topRight: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("topRight");
    }
    if (categories.rightCircle) {
      tempCurrent = findAvg("rightCircle", "current");
      tempDesired = findAvg("rightCircle", "desired");
      tempObj = {
        ...tempObj,
        rightCircle: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("rightCircle");
    }
    if (categories.leftCircle) {
      tempCurrent = findAvg("leftCircle", "current");
      tempDesired = findAvg("leftCircle", "desired");
      tempObj = {
        ...tempObj,
        leftCircle: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("leftCircle");
    }
    if (categories.bottomCircle) {
      tempCurrent = findAvg("bottomCircle", "current");
      tempDesired = findAvg("bottomCircle", "desired");
      tempObj = {
        ...tempObj,
        bottomCircle: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("bottomCircle");
    }
    if (categories.middleCircle) {
      tempCurrent = findAvg("middleCircle", "current");
      tempDesired = findAvg("middleCircle", "desired");
      tempObj = {
        ...tempObj,
        middleCircle: { current: tempCurrent, desired: tempDesired },
      };
      tempArr.push("middleCircle");
    }
    let tempTotal = 0;
    let tempTotalCurrent = 0;
    let tempTotalDesired = 0;
    questionList.map((el) => {
      tempTotal = tempTotal + 5;
      tempTotalCurrent = tempTotalCurrent + el.Current;
      tempTotalDesired = tempTotalDesired + el.Desired;
    });
    // console.log({ tempTotal, tempTotalCurrent, tempTotalDesired });
    // console.log({ tempObj, tempArr });
    setCurrentTotal(tempTotalCurrent / tempTotal);
    setDesiredTotal(tempTotalDesired / tempTotal);
    setResults(tempObj);
    setSlides(tempArr);
  }, []);

  function handleCurrentSlide(num) {
    if (curSlide + num >= 0 && curSlide + num < slides.length) {
      let tempNum = curSlide;
      tempNum = tempNum + num;
      setCurSlide(tempNum);
      console.log(tempNum);
    }
  }

  return (
    <>
      {showForm == false && (
        <div className="">
          {" "}
          {/* <header>
        <h1 className="pt-2 pl-2 pl-14 md:p-6 md:pl-40 text-sm md:text-md font-bold flex ">
          My Results
        </h1>{" "}
      </header> */}
          <div className="flex justify-end h-[100%] -mt-2">
            <div className="absolute h-full result-bg w-[100vw] bg-cover -ml-[30%] z-0 animate-fade animate-once animate-duration-[2000ms]">
              <div className="w-[120vw] -ml-[20vw] h-full bg-gradient-to-tl from-white from-40%"></div>
            </div>
            {/* <div className=" absolute z-30 left-0">Result</div> */}
            {curSlide == 0 && (
              <>
                <div className="flex flex-col">
                  <div className="ml-4 mt-4 md:hidden text-xl order-first z-20">
                    Your Results
                  </div>
                  <div className="order-last mt-[2%] md:absolute md:left-[10%] md:w-1/4 animate-fade-up animate-once animate-duration-[600ms] animate-delay-300 ">
                    <div className="hidden md:block text-[30pt] font-bold">
                      Your Results
                    </div>
                    <div className="ml-2 text-lg md:mt-[35%] ">
                      Overall: {Math.floor(currentTotal * 5)}
                    </div>
                    <div className="ml-2 text-xl font-semibold text-[#065a9e]">
                      {" "}
                      {currentTotal > 0 && currentTotal < 0.4 && " Starting"}
                      {currentTotal >= 0.4 &&
                        currentTotal < 0.6 &&
                        " Developing"}
                      {currentTotal >= 0.6 &&
                        currentTotal < 0.8 &&
                        " Intermediate"}
                      {currentTotal >= 0.8 && " Advanced"}
                    </div>
                    <div className=" text-sm  text-[#000001] mt-4 bg-slate-50/50  p-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Officia, cumque asperiores quasi ducimus modi tenetur quas
                      aliquid laudantium fuga nulla ex illum. Reiciendis sit
                      aspernatur ad rem molestias, quaerat laudantium.
                    </div>
                    <div className="ml-2 text-xl mt-[25%] md:mt-6">
                      My Goal: {Math.floor(desiredTotal * 5)}
                    </div>
                    <div className="ml-2 text-xl font-semibold text-[#065a9e]">
                      {desiredTotal > 0 && desiredTotal < 0.4 && " Starting"}
                      {desiredTotal >= 0.4 &&
                        desiredTotal < 0.6 &&
                        " Developing"}
                      {desiredTotal >= 0.6 &&
                        desiredTotal < 0.8 &&
                        " Intermediate"}
                      {desiredTotal >= 0.8 && " Advanced"}
                    </div>
                    <div className=" text-sm text-[#000001] mt-4 bg-slate-50/50  p-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Officia, cumque asperiores quasi ducimus modi tenetur quas
                      aliquid laudantium fuga nulla ex illum. Reiciendis sit
                      aspernatur ad rem molestias, quaerat laudantium.
                    </div>
                    <div className="md:hidden h-28"></div>
                  </div>
                  <div className=" mt-[10%] block w-screen md:w-[60vw] h-auto mr-[5%] animate-fade-up animate-once animate-duration-[600ms] animate-delay-300  text-xs md:text-md lg:text-[1rem] xl:text-lg ">
                    <ResultsDiamond components={categories} results={results} />
                  </div>
                </div>
              </>
            )}
            <div
              onClick={() => {
                handleCurrentSlide(1);
              }}
              className="hidden md:block cursor-pointer absolute h-20 w-12 bg-[#878787] z-30 mt-[70%] md:mt-[19%] md:mr-8 text-white text-[40pt] pl-2"
            >
              {">"}
            </div>
            <div
              onClick={() => {
                handleCurrentSlide(-1);
                // console.log(curSlide);
              }}
              className="hidden md:block cursor-pointer left-0 md:left-8 absolute h-20 w-12 bg-[#878787] z-30 mt-[70%] md:mt-[19%]  text-white text-[40pt] pl-2"
            >
              {"<"}
            </div>
          </div>
          {slides[curSlide] == "topRight" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"topRight"}
                questionList={questionList}
              />
            </div>
          )}
          {slides[curSlide] == "topLeft" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"topLeft"}
                questionList={questionList}
              />
            </div>
          )}
          {slides[curSlide] == "rightCircle" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"rightCircle"}
                questionList={questionList}
              />{" "}
            </div>
          )}
          {slides[curSlide] == "leftCircle" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"leftCircle"}
                questionList={questionList}
              />
            </div>
          )}
          {slides[curSlide] == "middleCircle" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"middleCircle"}
                questionList={questionList}
              />
            </div>
          )}
          {slides[curSlide] == "bottomCircle" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                component={"bottomCircle"}
                questionList={questionList}
              />
            </div>
          )}
          <div className="hidden md:block fixed w-screen md:w-[50%] right-[8%] bottom-10">
            <LaunchForm setShowForm={setShowForm} />
          </div>
          <div className="px-2 text-white items-center text-[50pt] fixed h-[70px] w-screen bottom-0 md:hidden bg-[#999999] flex flex-row justify-between">
            <div
              className="bg-[#878787 h-14]"
              onClick={() => {
                handleCurrentSlide(-1);
              }}
            >
              {"< "}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="text-xl rounded p-2 border text-white bg-[#3cacf4] "
            >
              GET PDF
            </button>
            <div
              onClick={() => {
                handleCurrentSlide(1);
              }}
            >
              {" >"}
            </div>
          </div>
        </div>
      )}
      {showForm && <div>Placeholder for HS form</div>}
    </>
  );
}
