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
  //   document.querySelector("body").style.backgroundColor = "#09497B";
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
              <div className=" w-[80%] md:w-[60%] md:place-self-center">
                <h1 className="text-[25pt] pb-4 md:text-[40pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
                  Design your new world of work
                </h1>
              </div>
              <div className="w-[80%] md:w-[60%] place-self-center">
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
        <div className="bg-[#074D7D] w-screen min-h-screen animate-fade-up animate-duration-[600ms] animate-delay-[800ms] animate-ease-linear">
          <div className=" md:float-right md:w-[65%] flex flex-col-reverse ">
            <div className="z-30 w-[80%] mx-[10%] flex  md:block flex-col  items-center justify-around">
              {/* <div className="text-3xl font-light ml-10% text-[#09497B] p-4">Learn more about the diamond model of maturity.</div> */}
              <div className="bg-slate-200 p-4 hidden">
                <ul className="">
                  {categoriesList.map((el, i) => (
                    <div key={`li_${el.DiamondLoc}${i}`} className="text-sm p-2 leading-6">
                      <span className="font-bold text-[#0EA8DC] text-md"> {el.Type}</span>
                      {" - " + el.description}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:p-6 ml-3  md:mr-2 z-50 md:mt-20 md:-mr-2">
              <DiamondNew setReady={setReady} handleReady={handleReady} selections={selections} setSelections={setSelections}></DiamondNew>
            </div>
          </div>
          <div className="w-full p-20">
            <h1 className="text-[25pt] pb-8  md:text-[40pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
              Design your new world of work
            </h1>

            <h2 className="text-xl pb-2 text-white font-extralight text-[16pt] leading-10">
              Click on the diamond components to select the worktech competencies you woud like to assess.
            </h2>
            {!ready && (
              <button
                className="text-2xl font-lighter w-[100px] btn btn-disabled  text-[#016AAB] bg-white font-semibold hover:text-[#0EA8DC] "
                onClick={() => handleReady()}
              >
                READY
              </button>
            )}
            {ready && (
              <button
                className="text-2xl font-lighter w-[100px] btn btn-outline text-[#016AAB] bg-white font-semibold hover:text-[#0EA8DC] "
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
      )}
    </>
  );
}
