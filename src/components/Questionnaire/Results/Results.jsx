import React, { useState, useEffect } from "react";

import ResultComponent from "./ResultComponent";
// import Header from "./Results/Header";
import SmallBar from "./SmallBar";
import ResultsDiamond from "./ResultsDiamond";
import HeroResult from "./HeroResult";

export default function Results({ questionList, categories }) {
  const [results, setResults] = useState({});
  const [slides, setSlides] = useState(["diamond"]);
  const [curSlide, setCurSlide] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [desiredTotal, setDesiredTotal] = useState(0);

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
            <div className="mt-[2%] absolute left-[10%] md:w-1/4 animate-fade-up animate-once animate-duration-[600ms] animate-delay-300 ">
              <div className=" text-[30pt] font-bold">YOUR RESULTS</div>
              <div className="ml-2 text-xl mt-[35%] ">
                Overall: {Math.floor(currentTotal * 5)}
                {currentTotal > 0 && currentTotal < 0.4 && " Starting"}
                {currentTotal >= 0.4 && currentTotal < 0.6 && " Developing"}
                {currentTotal >= 0.6 && currentTotal < 0.8 && " Intermediate"}
                {currentTotal >= 0.8 && " Advanced"}
              </div>
              <div className=" text-sm  text-[#000001] mt-4 bg-slate-50/50  p-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia, cumque asperiores quasi ducimus modi tenetur quas
                aliquid laudantium fuga nulla ex illum. Reiciendis sit
                aspernatur ad rem molestias, quaerat laudantium.
              </div>
              <div className="ml-2 text-xl mt-6">
                My Goal: {Math.floor(desiredTotal * 5)}
                {desiredTotal > 0 && desiredTotal < 0.4 && " Starting"}
                {desiredTotal >= 0.4 && desiredTotal < 0.6 && " Developing"}
                {desiredTotal >= 0.6 && desiredTotal < 0.8 && " Intermediate"}
                {desiredTotal >= 0.8 && " Advanced"}
              </div>
              <div className=" text-sm text-[#000001] mt-4 bg-slate-50/50  p-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia, cumque asperiores quasi ducimus modi tenetur quas
                aliquid laudantium fuga nulla ex illum. Reiciendis sit
                aspernatur ad rem molestias, quaerat laudantium.
              </div>
            </div>
            <div className="mt-[10%] hidden md:block w-[60vw] h-auto mr-[5%] animate-fade-up animate-once animate-duration-[600ms] animate-delay-300  text-xs md:text-md lg:text-[1rem] xl:text-lg overflow-hidden">
              <ResultsDiamond components={categories} results={results} />
            </div>
          </>
        )}
        <div
          onClick={() => {
            handleCurrentSlide(1);
          }}
          className="cursor-pointer absolute h-20 w-12 bg-[#878787] z-30 mt-[19%] mr-8 text-white text-[40pt] pl-2"
        >
          {">"}
        </div>
        <div
          onClick={() => {
            handleCurrentSlide(-1);
            // console.log(curSlide);
          }}
          className="cursor-pointer left-8 absolute h-20 w-12 bg-[#878787] z-30 mt-[19%]  text-white text-[40pt] pl-2"
        >
          {"<"}
        </div>
      </div>
      {slides[curSlide] == "topRight" && (
        <div className="absolute animate-fade-left animate-once animate-duration-700">
          <ResultComponent component={"topRight"} questionList={questionList} />
        </div>
      )}
      {slides[curSlide] == "topLeft" && (
        <div className="absolute animate-fade-left animate-once animate-duration-700">
          <ResultComponent component={"topLeft"} questionList={questionList} />
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
    </div>
  );
}
