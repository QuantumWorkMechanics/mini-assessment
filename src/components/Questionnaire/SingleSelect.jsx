import { useState } from "react";
import img7 from "../../assets/image7.jpeg";
import logo from "../../assets/colorLogo.png";
import Header from "./Header";
import Controls from "../Utils.jsx/Controls";

function SingleSelect({ currentQuestion, handleSingleSelect, handleNext, count, questionIndex, handleBack, isAutoAdvance, setIsAutoAdvance, img }) {
  const colNumTailwind = Math.min(Math.floor(currentQuestion.Response_1.length / 3), 3);

  return (
    <>
      <div className="w-screen md:w-1/2 ">
        <Header currentQuestion={currentQuestion} count={count} questionIndex={questionIndex} />

        <div className="flex flex-col justify-center items-center md:w-full">
          <h2 className="text-md md:text-xl h-40 p-4 pt-10 pl-8 pr-8">{currentQuestion.question}</h2>
          <div className="flex flex-col justify-center items-center gap-1 md:w-full max-sm:-m-28 max-sm:-mb-5  max-sm:h-[400px]">
            {currentQuestion.Response_1.map((choice, i) => {
              let item = choice.replace("-", "").trim();
              // let isSelected = questionNum.selections.indexOf(item) > -1;
              return (
                <div
                  className={
                    "cursor-pointer w-72  p-1 rounded  md:hover:bg-blue-200 border-2 " +
                    (!currentQuestion.selections && item != currentQuestion.selections && "  bg-blue-50 ") +
                    (currentQuestion.selections && item == currentQuestion.selections && " text-white bg-[#09497B] ")
                  }
                  // className={
                  // "cursor-pointer rounded w-72 border-2 p-2 " +
                  // (currentQuestion.selections.indexOf(item) < 0 && "hover:bg-slate-200 ") +
                  // (currentQuestion.selections.indexOf(item) > -1 && " bg-sky-700 text-white")
                  // }
                  key={`btn_${choice}_${i}`}
                  onClick={() => {
                    // setIsSelected((prev) => !prev);
                    handleSingleSelect(item);
                    // if (`#${item}_check`)
                    //   console.log(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mt-6 max-sm:w-screen">
            <Controls
              currentQuestion={currentQuestion}
              handleBack={handleBack}
              handleNext={handleNext}
              questionIndex={questionIndex}
              isActive={typeof currentQuestion.selections == "string"}
              isAutoAdvance={isAutoAdvance}
              setIsAutoAdvance={setIsAutoAdvance}
              showAutoAdvance={false}
            />
          </div>
          {/* <div onClick={handleNext} className="btn bg-[#FFCB18]  mt-10">
              NEXT
            </div> */}
        </div>
      </div>
      <>
        <div className="hidden md:block min-w-1/2 mt-2">
          <img src={img} className="h-screen object-cover fixed" alt={currentQuestion.img_aria} />
        </div>

        <img src={logo} className="hidden md:block fixed w-[280px] bottom-0 right-1" alt="" />
      </>
    </>
  );
}

export default SingleSelect;
