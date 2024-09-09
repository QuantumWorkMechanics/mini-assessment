import React, { useEffect, useState } from "react";
import DiamondNew from "./DiamondNew";
import NavBar from "../../Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { questionBank, categoriesList } from "../../../modules/question-bank-v3-scrubbed";
import { PopupButton } from "@typeform/embed-react";

export default function Selections({ setData }) {
  const navigate = useNavigate();
  const [showDiamond, setShowDiamond] = useState(true);
  const [selectedComp, setSelectedComp] = useState("none");
  const [ready, setReady] = useState(false);
  // const [animateOut, setAnimateOut] = useState(false);
  const [selections, setSelections] = useState({
    topLeft: false,
    topRight: false,
    rightCircle: false,
    leftCircle: false,
    bottomCircle: false,
    middleCircle: false,
    middleCircle2: false,
  });

  // useEffect(() => {
  //   // document.querySelector("body").style.backgroundColor = "#09497B";

  // }, []);

  function handleStart() {
    setShowDiamond(true);
  }

  function handleReady() {
    setData(selections);
    navigate("/questionnaire", { state: selections });
  }

  return (
    <>
      {showDiamond == false && (
        <>
          <div className="bg-[#09497B] h-[130vh] flex flex-col animate-fade-up animate-duration-[600ms] animate-delay-[600ms] animate-ease-linear">
            <div className="w-screen h-[90vh] md:h-[60vh] md:grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-white  mt-[40px] pl-[10%] md:pl-0 py-2 ">
              <div className="z-50 w-full md:w-[60%] md:place-self-center">
                <h1 className=" text-[25pt] pb-6 md:text-[40pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
                  Design your new world of work
                </h1>
              </div>
              <div className=" z-40 w-[80%] md:w-[60%] place-self-center">
                <div className="text-xl pb-2 ">Begin by selecting which worktech competencies you woud like to assess.</div>
                <div className="flex justify-center mr-8">
                  <div className="place self-center bg-white h-[2px] w-20 mt-2"></div>
                </div>
                <div className="hidden md:block text-white font-light mt-5 hyphens-auto">
                  Click begin to start evaluating your workforce maturity. Select all the dimensions you would like to explore for your organization.
                </div>
              </div>
            </div>
            <div className="w-screen md:mt-4 -mt-[80%] flex justify-center">
              <button
                className="text-2xl md:text-3xl text-white md:text-[#09497B] hover:text-white hover:outline-[#0EA8DC] hover:bg-[#09497B] outline outline-4  p-2"
                onClick={handleStart}
              >
                BEGIN
              </button>
            </div>
          </div>
        </>
      )}
      {showDiamond && (
        <div className="bg-[#074D7D] min-h-screen  w-screen">
          <h1 className="z-50 text-3xl pb-6 md:text-[40pt] text-[#FDB517]  font-bold text-center pt-10">WORKFORCE AGILITY DIAGNOSTIC TOOL</h1>
          <div className="z-40 bg-[#074D7D] flex md:justify-center md:flex-row-reverse flex-col items-center w-screen animate-fade-up animate-duration-[600ms] animate-delay-[800ms] animate-ease-linear">
            <div className="w-full md:w-1/2">
              <div className="md:p-6 ml-3  z-50 md:mt-20 md:-mr-2  ">
                <div className="absolute"></div>
                <DiamondNew setReady={setReady} handleReady={handleReady} selections={selections} setSelections={setSelections}></DiamondNew>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:p-20 ">
              <h1 className="text-2xl p-4 leading-10 md:pb-8  md:text-[25pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
                Design your new world of work
              </h1>
              <h2 className="text-md px-4 text-justify pt-0 pb-2 text-white font-extralight md:text-[16pt] md:leading-10">
                Click on the diamond components to select the worktech competencies you woud like to assess.
              </h2>
              <div className="self-end text-xs text-white font-light px-4">*HR, IS and EP selected by default.</div>
              {!ready && (
                <button
                  className="text-2xl m-4 font-lighter w-[100px] btn btn-disabled  text-[#016AAB] bg-white font-semibold hover:text-[#0EA8DC] "
                  onClick={() => handleReady()}
                >
                  READY
                </button>
              )}
              {ready && (
                <button
                  className="text-2xl m-4 font-lighter w-[100px] btn btn-outline text-[#016AAB] bg-white font-semibold hover:text-[#0EA8DC] "
                  onClick={() => handleReady()}
                >
                  READY
                </button>
              )}
              {/* {selectedComp == "none" && <div>test</div>} */}
              {/* {categoriesList.map((el, i) => (
                <div key={`li_${el.DiamondLoc}${i}`} className=" hidden text-sm p-2 leading-6">
                  <span className="font-bold text-[#0EA8DC] text-md"> {el.Type}</span>
                  {" - " + el.description}
                </div>
              ))} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}