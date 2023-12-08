import React, { useState, useEffect, useRef } from "react";
import ResultComponent from "./ResultComponent";
import SmallBar from "./SmallBar";
import ResultsDiamond from "./ResultsDiamond";
import LaunchForm from "./LaunchForm";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PDFResult from "./PDFResult";
import categoryList from "../Utils.jsx/CategoryList";
import { findAvg } from "../Utils.jsx/Functions";
import fillForm from "../Utils.jsx/FillForm.js";
import { lorem } from "../Utils.jsx/Functions";
import Overall from "./Overall";
import SubComponent from "./SubComponent";
import { returnAvg } from "../Utils.jsx/Functions";
import LoadSpinner from "../Utils.jsx/LoadSpinner";

export default function Results({ questionList, categories, setSeeResult }) {
  const [results, setResults] = useState({});
  // const [slides, setSlides] = useState(["diamond"]);
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTotal, setCurrentTotal] = useState();
  const [desiredTotal, setDesiredTotal] = useState();
  const [showForm, setShowForm] = useState(false);
  const [continueAssessment, setContinueAssessment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const printRef = useRef();

  // console.log({ questionList, categories });

  function handleForm() {
    setShowForm(true);
  }

  useEffect(() => {
    // let tempResults = { ...categories };
    // let tempCurrent = 0;
    // let tempDesired = 0;
    // let tempSlidesArr = ["diamond"];

    // categoryList.map((selectedCategory) => {
    //   if (categories[selectedCategory]) {
    //     tempCurrent = findAvg(selectedCategory, "current", questionList);
    //     tempDesired = findAvg(selectedCategory, "desired", questionList);
    //     tempResults[selectedCategory] = {
    //       current: tempCurrent,
    //       desired: tempDesired,
    //     };
    //     tempSlidesArr.push(selectedCategory);
    //   }

    //   // console.log(tempObj);
    // });

    // let tempTotal = 0;
    // let tempTotalCurrent = 0;
    // let tempTotalDesired = 0;
    // questionList.map((el) => {
    //   tempTotal = tempTotal + 5;
    //   tempTotalCurrent = tempTotalCurrent + el.Current;
    //   tempTotalDesired = tempTotalDesired + el.Desired;
    // });

    console.log({ questionList });
    // console.log({ tempTotal, tempTotalCurrent, tempTotalDesired });
    // console.log({ tempObj, tempArr });
    let tempCurrent = returnAvg(questionList, "Current");
    let tempDesired = returnAvg(questionList, "Desired");
    setCurrentTotal(tempCurrent);
    setDesiredTotal(tempDesired);
    // setResults(tempResults);
    // setSlides(tempSlidesArr);
  }, []);

  returnAvg(questionList, "Current");

  // function handleCurrentSlide(num) {
  //   if (currentSlide + num >= 0 && currentSlide + num < slides.length) {
  //     let tempNum = currentSlide;
  //     tempNum = tempNum + num;
  //     setCurrentSlide(tempNum);
  //     // forceUpdate();
  //     // console.log(tempNum);
  //   }
  // }

  return (
    <>
      <div className="order-last  md:absolute   ">
        <div className="text-[30pt] ml-4 md:ml-40 md:text-[60pt] place-self-center  animate-fade-up animate-duration-700 animate-delay-500">
          Maturity
        </div>
        <div className="md:ml-40 h-1 md:w-1/4 bg-[#FDB517] "></div>
        <div className="md:hidden block w-full flex justify-center">
          <img
            src="../../../public/dataReview.png"
            alt=""
            className="w-[500px]  h-auto "
          />
        </div>
        <div className="w-screen md:flex justify-center">
          <div className="animate-fade-up animate-duration-700 animate-delay-1500">
            {currentTotal && (
              <div className="md:mt-10  ">
                <Overall
                  title="Overall"
                  total={currentTotal}
                  content={lorem}
                  resultLookup="all"
                />
              </div>
            )}
            {desiredTotal && (
              <div className="col-start-1 md:mt-28 ">
                <Overall
                  title="My Goal"
                  total={desiredTotal}
                  content={lorem}
                  resultLookup="all"
                />
              </div>
            )}
          </div>

          <div
            id="diamond-visible"
            className="  block w-screen md:w-[700px] h-auto  animate-fade-up animate-once 
            animate-duration-[600ms] animate-delay-1800  text-xs md:text-md lg:text-[1rem] xl:text-lg "
          >
            <div className=" mt-28 w-[380px]  md:w-[600px] md:p-4 md:px-10 ">
              <ResultsDiamond
                components={categories}
                results={results}
                idModifier={""}
              />
            </div>
            <div className="hidden md:flex w-full justify-center">
              <img
                src="../../../public/dataReview.png"
                alt=""
                className="w-[500px] mt-56 h-auto "
              />
            </div>
          </div>
        </div>
        {Object.keys(categories).map((category) => {
          let tempQuestions = questionList.filter(
            (el) => el.DiamondLoc == category
          );
          let tempAvg = returnAvg(tempQuestions, "Current");
          console.log({ tempQuestions, category });
          // console.log(categories[category]);
          if (
            tempQuestions[0] &&
            tempQuestions[0].Current == 0 &&
            continueAssessment == false
          ) {
            setContinueAssessment(true);
          }
          return (
            categories[category] &&
            tempAvg > 0 && (
              <SubComponent
                key={"sub-comp-" + category}
                data={questionList.filter((el) => el.DiamondLoc == category)}
              />
            )
          );
        })}
        {/* {categories.topLeft && (
          <SubComponent
            data={questionList.filter((el) => el.DiamondLoc == "topLeft")}
          />
        )} */}
        <div className="h-40 w-full"></div>
      </div>

      <div>
        <div
          id="diamond-png"
          className="absolute -mt-[1400px] block w-[800px] h-auto   text-lg "
        >
          <ResultsDiamond
            animation={false}
            components={categories}
            results={results}
            idModifier={"Bar"}
          />
        </div>
      </div>

      {/* {slides[currentSlide] != "diamond" && (
        <div className="absolute animate-fade-left animate-once animate-duration-700">
          <ResultComponent
            // component={slides[currentSlide]}
            slides={slides}
            currentSlide={currentSlide}
            questionList={questionList}
          />
        </div>
      )} */}

      <div id="launch-form" className="  fixed w-screen  right- bottom-0">
        <LaunchForm
          setShowForm={setShowForm}
          categories={categories}
          questionList={questionList}
          continueAssessment={continueAssessment}
          setContinueAssessment={setContinueAssessment}
          setSeeResult={setSeeResult}
          currentTotal={currentTotal}
          desiredTotal={desiredTotal}
          setIsLoading={setIsLoading}
          // handleDownloadPDF={handleDownloadPDF}
        />
      </div>
      {isLoading && <LoadSpinner />}

      {/* <div className="hidden px-2 text-white items-center text-[50pt] fixed h-[70px] w-screen bottom-0 md:hidden bg-[#999999] flex flex-row justify-between">
        <div
          className="bg-[#878787 h-14]"
          onClick={() => {
            handleCurrentSlide(-1);
          }}
        >
          {"< "}
        </div>
        <button
          onClick={() => fillForm(categories, questionList)}
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
      </div> */}
      {/* </div> */}

      {showForm && (
        <div>
          <PDFResult components={categories} results={results} />
        </div>
      )}
    </>
  );
}
