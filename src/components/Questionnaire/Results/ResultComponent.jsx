import React, { useState, useEffect } from "react";

import RechartBar from "../RechartTest";

export default function ResultComponent({ component, questionList }) {
  const [questionSet, setQuestionSet] = useState([]);
  const [current, setCurrent] = useState(0);
  const [desired, setDesired] = useState(0);

  useEffect(() => {
    let tempList = questionList.filter((el) => el.DiamondLoc == component);
    console.log({ tempList });
    setQuestionSet(tempList);
    let tempCurrent = findAvg(component, "current");
    setCurrent(tempCurrent);
    let tempDesired = findAvg(component, "desired");
    setDesired(tempDesired);
  }, []);

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

  return (
    <>
      {desired && (
        <>
          {" "}
          <div className="flex justify-center z-20">
            <div className="p-3 -mb-20 mt-10 md:mt-20 text-lg md:text-[50pt] font-lighter z-20">
              {questionSet[0].Type}
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-10 md:mb-0 z-0 md:ml-0 w-screen justify-around items-center">
            <div className="">
              <RechartBar currentSlide={current} desiredSlide={desired} />
              <div className="-mt-28 md:-mt-20 md:w-1/4 flex justify-center text-xs md:ml-14 md:-mt-24 font-bold">
                <div className="md:ml-40 flex items-center pl-5 py-4 mr-2">
                  <div className="w-[10px] bg-[#09497B] h-[10px] rounded-full mr-2"></div>
                  Current
                </div>
                <div className="md:ml-5 flex items-center">
                  <div className="w-[10px] bg-[#FDB517] h-[10px] rounded-full mr-2"></div>
                  Desired
                </div>
              </div>
            </div>
            <div className="hyphens-auto text-justify bg-gradient-to-br from-white to-neutral-50 mt-[15%] px-4  md:mr-32 text-[#666666] text-sm w-screen md:max-w-[70ch] leading-7">
              <div className="mt-2 md:my-10 md:ml-8 ">
                Your current {questionSet[0].Type} score is{" "}
                <strong className="text-lg text-[#09497B]">
                  {Math.round(current * 10) / 10}
                </strong>{" "}
                and your desired score is{" "}
                <strong className="text-lg text-[#09497B]">
                  {Math.round(desired * 10) / 10}
                </strong>
              </div>
              <div className="mb-2 mt-10 md:m-8 font-lighter">
                Achieving your desired {questionSet[0].Type} goals will require{" "}
                {desired >= 4 &&
                  "some sample text for when desired is greater than 4.                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique maxime eaque voluptatibus assumenda eveniet fugiat, magnam odit ducimus iste illo totam magni officiis et soluta rem reiciendis pariatur at necessitatibus!"}
                {desired >= 3 &&
                  desired < 4 &&
                  "some sample text for between 3 and 4.                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique maxime eaque voluptatibus assumenda eveniet fugiat, magnam odit ducimus iste illo totam magni officiis et soluta rem reiciendis pariatur at necessitatibus!"}
                {desired >= 2 &&
                  desired < 3 &&
                  "some sample text for between 2 and 3.                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique maxime eaque voluptatibus assumenda eveniet fugiat, magnam odit ducimus iste illo totam magni officiis et soluta rem reiciendis pariatur at necessitatibus!"}
                {desired >= 1 &&
                  desired < 2 &&
                  "some sample text for between 1 and 2.                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique maxime eaque voluptatibus assumenda eveniet fugiat, magnam odit ducimus iste illo totam magni officiis et soluta rem reiciendis pariatur at necessitatibus!"}
              </div>
              <div className="md:hidden h-14"></div>
            </div>
          </div>
          {/* <div className="md:hidden h-28">End</div> */}
        </>
      )}
    </>
  );
}
