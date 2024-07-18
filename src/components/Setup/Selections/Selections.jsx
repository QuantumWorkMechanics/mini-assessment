import React, { useState } from "react";
import Diamond from "./Diamond";
import NavBar from "../../Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { questionBank, categoriesList } from "../../../modules/question-bank";
import { PopupButton } from "@typeform/embed-react";

export default function Selections({ setData }) {
  const navigate = useNavigate();
  const [showDiamond, setShowDiamond] = useState(false);
  // const [animateOut, setAnimateOut] = useState(false);
  const [selections, setSelections] = useState({
    topLeft: false,
    topRight: false,
    rightCircle: false,
    leftCircle: false,
    bottomCircle: false,
    middleCircle: false,
  });

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
          <div className="animate-fade-up animate-duration-[600ms] animate-delay-[600ms] animate-ease-linear">
            <div className="bg-[#09497B] w-screen h-[90vh] md:h-[60vh] md:grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-white  mt-[40px] pl-[10%] md:pl-0 py-2 ">
              <div className=" w-[80%] md:w-[60%] md:place-self-center">
                <h1 className="text-[25pt] pb-4 md:text-[40pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
                  Design your new world of work
                </h1>
              </div>
              <div className="w-[80%] md:w-[60%] place-self-center">
                <div className="text-xl pb-2 ">Begin by selecting which worktech competencies you woud like to asses.</div>
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
        <div className="animate-fade-up animate-duration-[600ms] animate-delay-[800ms] animate-ease-linear">
          <div className="md:grid md:grid-cols-2 md:grid-rows-1 flex flex-col-reverse ">
            <div className="w-[80%] mx-[10%] flex flex-col  items-center justify-around">
              <div className="text-3xl font-light ml-10% text-[#09497B] p-4">Learn more about the diamond model of maturity.</div>
              <div className="bg-slate-200 p-4">
                <ul>
                  <li className="text-sm p-2 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md"> {questionBank.find((el) => el.DiamondLoc == "topLeft").Type}</span>
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "topLeft").description}
                  </li>
                  <li className="text-sm p-2 mt-3 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md"> {questionBank.find((el) => el.DiamondLoc == "topRight").Type}</span>{" "}
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "topRight").description}
                  </li>
                  <li className="text-sm p-2 mt-3 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md">{questionBank.find((el) => el.DiamondLoc == "rightCircle").Type}</span>{" "}
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "rightCircle").description}
                  </li>
                  <li className="text-sm p-2 mt-3 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md">{questionBank.find((el) => el.DiamondLoc == "leftCircle").Type}</span>{" "}
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "leftCircle").description}
                  </li>
                  <li className="text-sm p-2 mt-3 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md">{questionBank.find((el) => el.DiamondLoc == "middleCircle").Type}</span>{" "}
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "middleCircle").description}
                  </li>
                  <li className="text-sm p-2 mt-3 leading-6">
                    <span className="font-bold text-[#0EA8DC] text-md">{questionBank.find((el) => el.DiamondLoc == "bottomCircle").Type}</span>{" "}
                    {" - " + categoriesList.find((el) => el.DiamondLoc == "bottomCircle").description}
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6 ml-3 md:-ml-4 md:mr-10">
              <Diamond handleReady={handleReady} selections={selections} setSelections={setSelections}></Diamond>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
