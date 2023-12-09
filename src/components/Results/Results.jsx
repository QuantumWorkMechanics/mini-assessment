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
import dataReview from "../../assets/dataReview.png";

export default function Results({ questionList, categories, setSeeResult }) {
  const [results, setResults] = useState({});
  // const [slides, setSlides] = useState(["diamond"]);
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTotal, setCurrentTotal] = useState();
  const [desiredTotal, setDesiredTotal] = useState();
  const [showForm, setShowForm] = useState(false);
  const [continueAssessment, setContinueAssessment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleForm() {
    setShowForm(true);
  }

  useEffect(() => {
    let tempResults = { ...categories };
    let categoryCurrent;
    let categoryDesired;

    categoryList.map((selectedCategory) => {
      if (categories[selectedCategory]) {
        categoryCurrent = findAvg(selectedCategory, "current", questionList);
        categoryDesired = findAvg(selectedCategory, "desired", questionList);
        tempResults[selectedCategory] = {
          current: categoryCurrent,
          desired: categoryDesired,
        };
      }
    });

    let tempCurrent = returnAvg(questionList, "Current");
    let tempDesired = returnAvg(questionList, "Desired");
    setCurrentTotal(tempCurrent);
    setDesiredTotal(tempDesired);
    setResults(tempResults);
    // setSlides(tempSlidesArr);
  }, []);

  returnAvg(questionList, "Current");

  return (
    <>
      <div className="order-last  md:absolute   ">
        <h1 className="text-[30pt] ml-4 md:ml-40 md:text-[60pt] place-self-center  animate-fade-up animate-duration-700 animate-delay-500">
          Maturity
        </h1>
        <div className="md:ml-40 h-1 md:w-1/4 bg-[#FDB517] animate-fade-up animate-duration-700 animate-delay-500"></div>
        <div className="md:hidden block w-full flex justify-center">
          <img src={dataReview} alt="" className="w-[500px]  h-auto " />
        </div>
        <div className="w-screen md:flex justify-center">
          <div className="animate-fade-up animate-duration-700 animate-delay-1000">
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
            className="  block w-screen md:w-[700px] h-auto   text-xs md:text-md lg:text-[1rem] xl:text-lg "
          >
            <div
              className=" mt-28 w-[380px]  md:w-[600px] md:p-4 md:px-10 animate-fade-up animate-once 
            animate-duration-700 animate-delay-1000 "
            >
              <ResultsDiamond
                components={categories}
                results={results}
                idModifier={""}
              />
            </div>
            <div
              className="hidden md:flex w-full justify-center animate-fade-up animate-once 
            animate-duration-700ms animate-delay-1000"
            >
              <img
                src={dataReview}
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

      {showForm && (
        <div>
          <PDFResult components={categories} results={results} />
        </div>
      )}
    </>
  );
}
