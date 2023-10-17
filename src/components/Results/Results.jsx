import React, { useState, useEffect, useRef } from "react";
import ResultComponent from "./ResultComponent";
import SmallBar from "./SmallBar";
import ResultsDiamond from "./ResultsDiamond";
import LaunchForm from "./LaunchForm";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PDFResult from "./PDFResult";
import categoryList from "../Utils.jsx/CategoryList";

export default function Results({ questionList, categories }) {
  const [results, setResults] = useState({});
  const [slides, setSlides] = useState(["diamond"]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [desiredTotal, setDesiredTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const printRef = useRef();

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
    let tempResults = { ...categories };
    let tempCurrent = 0;
    let tempDesired = 0;
    let tempSlidesArr = ["diamond"];

    categoryList.map((selectedCategory) => {
      if (categories[selectedCategory]) {
        tempCurrent = findAvg(selectedCategory, "current");
        tempDesired = findAvg(selectedCategory, "desired");
        tempResults[selectedCategory] = {
          current: tempCurrent,
          desired: tempDesired,
        };
        tempSlidesArr.push(selectedCategory);
      }

      // console.log(tempObj);
    });

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
    setResults(tempResults);
    setSlides(tempSlidesArr);
  }, []);

  function handleCurrentSlide(num) {
    if (currentSlide + num >= 0 && currentSlide + num < slides.length) {
      let tempNum = currentSlide;
      tempNum = tempNum + num;
      setCurrentSlide(tempNum);
      // forceUpdate();
      // console.log(tempNum);
    }
  }

  return (
    <>
      {showForm == false && (
        <div id="results-wrapper">
          {" "}
          <div className="flex justify-end h-[100%] -mt-2">
            <div className="absolute h-full result-bg w-[100vw] bg-cover -ml-[30%] z-0 animate-fade animate-once animate-duration-[2000ms]">
              <div className="w-[120vw] -ml-[20vw] h-full bg-gradient-to-tl from-white from-40%"></div>
            </div>
            {/* <div className=" absolute z-30 left-0">Result</div> */}
            {currentSlide == 0 && (
              <>
                <div ref={printRef} className="flex flex-col">
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
                  <div
                    id="diamond"
                    className=" mt-[10%] block w-screen md:w-[60vw] h-auto mr-[5%] lg:-ml-[6%] md:-ml-[8%] animate-fade-up animate-once animate-duration-[600ms] animate-delay-300  text-xs md:text-md lg:text-[1rem] xl:text-lg "
                  >
                    <ResultsDiamond components={categories} results={results} />
                  </div>
                </div>
              </>
            )}
            <div
              onClick={() => {
                handleCurrentSlide(1);
              }}
              className="hidden md:block cursor-pointer absolute h-20 w-12 bg-[#878787] z-30 mt-[70%] md:mt-[19%] mr-2 lg:mr-8 text-white text-[40pt] pl-2"
            >
              {">"}
            </div>
            <div
              onClick={() => {
                handleCurrentSlide(-1);
                // console.log(currentSlide);
              }}
              className="hidden md:block cursor-pointer left-0 md:left-2 lg:left-8 absolute h-20 w-12 bg-[#878787] z-30 mt-[70%] md:mt-[19%]  text-white text-[40pt] pl-2"
            >
              {"<"}
            </div>
          </div>
          {slides[currentSlide] != "diamond" && (
            <div className="absolute animate-fade-left animate-once animate-duration-700">
              <ResultComponent
                // component={slides[currentSlide]}
                slides={slides}
                currentSlide={currentSlide}
                questionList={questionList}
              />
            </div>
          )}
          <div
            id="launch-form"
            className=" hidden md:block fixed w-screen md:w-[50%] right-[8%] bottom-10"
          >
            <LaunchForm
              setShowForm={setShowForm}
              // handleDownloadPDF={handleDownloadPDF}
            />
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
      {showForm && (
        <div>
          <PDFResult components={categories} results={results} />
        </div>
      )}
    </>
  );
}
