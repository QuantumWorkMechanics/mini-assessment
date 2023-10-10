import React, { useState, useEffect } from "react";
import questionBank from "../../../modules/question-bank";
import SmallBar from "./SmallBar";
import { Button } from "@mui/material";

import DiamondSVG from "./DiamondSVG";

export default function ResultsDiamond({ components, results }) {
  const [topLeft, setTopLeft] = useState(false);
  const [topRight, setTopRight] = useState(false);
  const [rightCircle, setRightCircle] = useState(false);
  const [bottomCircle, setBottomCircle] = useState(false);
  const [leftCircle, setLeftCircle] = useState(false);
  const [middleCircle, setMiddleCircle] = useState(false);

  useEffect(() => {
    setTopLeft(components.topLeft);
    setTopRight(components.topRight);
    setLeftCircle(components.leftCircle);
    setRightCircle(components.rightCircle);
    setMiddleCircle(components.middleCircle);
    setBottomCircle(components.bottomCircle);

    console.log({ components });
    console.log({ results });
  }, []);

  function handleTopLeft() {
    handleSelection("topLeft", !topLeft);
    setTopLeft((prev) => !prev);
  }

  function handleTopRight() {
    handleSelection("topRight", !topRight);
    setTopRight((prev) => !prev);
  }

  function handleRightCircle() {
    handleSelection("rightCircle", !rightCircle);
    setRightCircle((prev) => !prev);
  }

  function handleLeftCircle() {
    handleSelection("leftCircle", !leftCircle);
    setLeftCircle((prev) => !prev);
  }

  function handleBottomCircle() {
    handleSelection("bottomCircle", !bottomCircle);
    setBottomCircle((prev) => !prev);
  }

  function handleMiddleCircle() {
    handleSelection("middleCircle", !middleCircle);
    setMiddleCircle((prev) => !prev);
  }

  function handleSVG(e) {
    console.log(e.target.id);
    e.target.id == "topLeftCircle" && handleTopLeft();
    e.target.id == "topRightCircle" && handleTopRight();
    e.target.id == "leftCircle" && handleLeftCircle();
    e.target.id == "rightCircle" && handleRightCircle();
    e.target.id == "bottomCircle" && handleBottomCircle();
    e.target.id == "middleCircle" && handleMiddleCircle();
  }

  return (
    <>
      {/* <div className="divider w-[40%] pl-4"></div> */}
      <div className="relative">
        <div className="flex justify-center z-10">
          <div className="w-1/2 mt-[8%]">
            <DiamondSVG
              topLeft={topLeft}
              topRight={topRight}
              rightCircle={rightCircle}
              leftCircle={leftCircle}
              middleCircle={middleCircle}
              bottomCircle={bottomCircle}
            />
          </div>
        </div>
        {/* <div
          className="absolute h-[5.6%] w-[4.2%] top-[9.8%] left-[22%] rounded-full"
          onClick={handleLeadership}
        ></div> */}
        <div
          className={
            "absolute w-[26.5%] h-[1px]  bottom-[19.5%] left-[13%] " +
            ((middleCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div
          className={
            "absolute w-[1px] h-[15.5%]  top-[67%] left-[42%] rotate-45 " +
            ((middleCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div className="absolute w-[15%] h-[25%] bottom-[20%] left-[12%]">
          {results.middleCircle && (
            <SmallBar
              current={results.middleCircle.current}
              desired={results.middleCircle.desired}
            />
          )}
        </div>
        <div
          //   onClick={handleMiddleCircle}
          className={
            "text-[#016AAB] font-bold  cursor-pointer font-lighter absolute  w-[23%] md:w-[18%] top-[81%] left-[13%] leading-tight  " +
            ((middleCircle && " text-[#016AAB]") || " text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "middleCircle")
            .Type.toUpperCase()}
        </div>
        <div
          className={
            "absolute w-[17%] h-[1px]  top-[12%]  left-[13%] " +
            ((topLeft && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div
          className={
            "absolute w-[9%] h-[1px] bg-[#FDB517] top-[19%]  left-[28.5%] rotate-45 " +
            ((topLeft && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div className="absolute w-[15%] h-[25%] -top-[13%] left-[12%]">
          {results.topLeft && (
            <SmallBar
              current={results.topLeft.current}
              desired={results.topLeft.desired}
            />
          )}
        </div>
        <div
          //   onClick={handleTopLeft}
          className={
            " text-[#016AAB] font-bold  cursor-pointer font-lighter absolute  w-[20%] md:w-[18%] top-[12%] left-[13%] leading-tight " +
            ((topLeft && " text-[#016AAB]") || "text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "topLeft")
            .Type.toUpperCase()}
        </div>
        <div
          className={
            "absolute w-[24.7%] h-[1px] bg-[#FDB517] top-[12%]  right-[5%] " +
            ((topRight && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div
          className={
            "absolute w-[9%] h-[1px] bg-[#FDB517] top-[19%]  right-[28.5%] -rotate-45 " +
            ((topRight && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        {/* <div
          className={
            "absolute w-[1px] h-[10%] bg-[#FDB517] top-[36%]  right-[20%] " +
            ((rightCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div> */}
        <div
          className={
            "absolute w-[15%] h-[1px] bg-[#FDB517] top-[46%]  right-[13%] " +
            ((rightCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div className="absolute w-[15%] h-[25%] top-[21%] right-[8%]">
          {" "}
          {results.rightCircle && (
            <SmallBar
              current={results.rightCircle.current}
              desired={results.rightCircle.desired}
            />
          )}
        </div>
        <div
          //   onClick={handleRightCircle}
          className={
            "  font-bold cursor-pointer font-lighter absolute  w-[23%] md:w-[18%] top-[50%] md:top-[46%]  right-[13%] text-right leading-tight  " +
            ((rightCircle && " text-[#016AAB]") || " text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "rightCircle")
            .Type.toUpperCase()}
        </div>
        {/* <div
          className={
            "absolute w-[1px] h-[10%] bg-[#FDB517] top-[36%]  left-[20%] " +
            ((leftCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div> */}
        <div
          className={
            "absolute w-[23%] h-[1px] bg-[#FDB517] top-[46%]  left-[5%] " +
            ((leftCircle && "bg-[#FDB517] ") || "bg-slate-400 ")
          }
        ></div>
        <div className="absolute w-[15%] h-[25%] top-[21%] left-[4%] z-10 ">
          {results.leftCircle && (
            <SmallBar
              current={results.leftCircle.current}
              desired={results.leftCircle.desired}
            />
          )}
        </div>
        <div
          //   onClick={handleLeftCircle}
          className={
            " text-[#016AAB] font-bold  cursor-pointer font-lighter absolute  w-[23%] md:w-[18%] top-[39%] md:top-[46%] left-[5%] leading-tight  " +
            ((leftCircle && " text-[#016AAB]") || " text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "leftCircle")
            .Type.toUpperCase()}
        </div>
        <div
          className={
            "absolute w-[18%] h-[1px] bottom-[8%] right-[30.8%] " +
            ((bottomCircle && " bg-[#FDB517] ") || " bg-slate-400")
          }
        ></div>
        <div
          className={
            "absolute w-[21%] h-[1px] bottom-[19.5%] right-[5%] " +
            ((bottomCircle && " bg-[#FDB517] ") || " bg-slate-400")
          }
        ></div>
        <div
          className={
            "absolute w-[7.1%] h-[1px] bottom-[13.6%] right-[25%] -rotate-45 " +
            ((bottomCircle && " bg-[#FDB517] ") || " bg-slate-400")
          }
        ></div>

        <div className="absolute w-[15%] h-[25%] -top-[13%] right-[0%]">
          {" "}
          {results.topRight && (
            <SmallBar
              current={results.topRight.current}
              desired={results.topRight.desired}
            />
          )}
        </div>

        <div className="absolute w-[15%] h-[25%] bottom-[20%] right-[0%]">
          {" "}
          {results.bottomCircle && (
            <SmallBar
              current={results.bottomCircle.current}
              desired={results.bottomCircle.desired}
            />
          )}
        </div>
        {/* <div className="absolute  top-[30%] left-[3%] w-[15%] h-[33%] border-2 border-[#016AAB] rounded-full "></div> */}

        <div
          //   onClick={handleTopRight}
          className={
            " font-bold  cursor-pointer font-lighter absolute  w-[20%] h-[10%] md:w-[18%] top-[12%]  right-[5%] text-right leading-tight  " +
            ((topRight && " text-[#016AAB]") || "text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "topRight")
            .Type.toUpperCase()}
        </div>

        <div
          //   onClick={handleBottomCircle}
          className={
            " text-[#016AAB] font-bold cursor-pointer font-lighter absolute  w-[23%] md:w-[18%] top-[81%] right-[5%] text-right leading-tight " +
            ((bottomCircle && " text-[#016AAB]") || " text-slate-400")
          }
        >
          {questionBank
            .find((el) => el.DiamondLoc == "bottomCircle")
            .Type.toUpperCase()}
        </div>

        <div className="absolute bottom-3 md:bottom-6 l-2"></div>
      </div>
    </>
  );
}
