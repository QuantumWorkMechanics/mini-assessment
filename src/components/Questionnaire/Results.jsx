import React, { useState, useEffect } from "react";

import RechartBar from "./RechartTest";
import ResultComponent from "./ResultComponent";
import Header from "./Header";
import SmallBar from "./SmallBar";
import ResultsDiamond from "./ResultsDiamond";

export default function Results({ questionList, categories }) {
  const [results, setResults] = useState({});

  function findAvg(location, type) {
    let loc = questionList.filter((el) => el.DiamondLoc == location);
    console.log({ loc });
    let total = loc.reduce(function (accumulator, answer) {
      return (
        accumulator + (type == "current" ? answer.Current : answer.Desired)
      );
    }, 0);
    console.log({ total });
    return total / loc[0].Of;
  }

  useEffect(() => {
    let tempObj = { ...categories };
    let tempCurrent = 0;
    let tempDesired = 0;
    if (categories.topLeft) {
      tempCurrent = findAvg("topLeft", "current");
      tempDesired = findAvg("topLeft", "desired");
      tempObj = {
        ...tempObj,
        topLeft: { current: tempCurrent, desired: tempDesired },
      };
    }
    if (categories.topRight) {
      tempCurrent = findAvg("topRight", "current");
      tempDesired = findAvg("topRight", "desired");
      tempObj = {
        ...tempObj,
        topRight: { current: tempCurrent, desired: tempDesired },
      };
    }
    if (categories.rightCircle) {
      tempCurrent = findAvg("rightCircle", "current");
      tempDesired = findAvg("rightCircle", "desired");
      tempObj = {
        ...tempObj,
        rightCircle: { current: tempCurrent, desired: tempDesired },
      };
    }
    if (categories.leftCircle) {
      tempCurrent = findAvg("leftCircle", "current");
      tempDesired = findAvg("leftCircle", "desired");
      tempObj = {
        ...tempObj,
        leftCircle: { current: tempCurrent, desired: tempDesired },
      };
    }
    if (categories.bottomCircle) {
      tempCurrent = findAvg("bottomCircle", "current");
      tempDesired = findAvg("bottomCircle", "desired");
      tempObj = {
        ...tempObj,
        bottomCircle: { current: tempCurrent, desired: tempDesired },
      };
    }
    if (categories.middleCircle) {
      tempCurrent = findAvg("middleCircle", "current");
      tempDesired = findAvg("middleCircle", "desired");
      tempObj = {
        ...tempObj,
        middleCircle: { current: tempCurrent, desired: tempDesired },
      };
    }
    console.log({ tempObj });
    setResults(tempObj);
  }, []);

  return (
    <div className="bg-webs">
      {" "}
      <header>
        <h1 className="pt-2 pl-2 pl-14 md:p-6 md:pl-40 text-sm md:text-md font-bold flex ">
          My Results
        </h1>{" "}
      </header>
      <div className="hidden md:block w-[80%] ml-[10%] animate-fade-up animate-once animate-duration-[600ms] animate-delay-300">
        <ResultsDiamond components={categories} results={results} />
      </div>
      {categories.topLeft && (
        <ResultComponent component={"topLeft"} questionList={questionList} />
      )}
      {categories.topRight && (
        <ResultComponent component={"topRight"} questionList={questionList} />
      )}
      {categories.rightCircle && (
        <ResultComponent
          component={"rightCircle"}
          questionList={questionList}
        />
      )}
      {categories.leftCircle && (
        <ResultComponent component={"leftCircle"} questionList={questionList} />
      )}
      {categories.middleCircle && (
        <ResultComponent
          component={"middleCircle"}
          questionList={questionList}
        />
      )}
      {categories.bottomCircle && (
        <ResultComponent
          component={"bottomCircle"}
          questionList={questionList}
        />
      )}
    </div>
  );
}
