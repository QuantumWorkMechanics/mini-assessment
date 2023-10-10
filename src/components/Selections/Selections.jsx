import React, { useState } from "react";
import diamondFooter from "../../assets/Diamond-2.jpg";
import Diamond from "../Diamond";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import questionBank from "../../modules/question-bank";

export default function Selections() {
  const navigate = useNavigate();
  const [showDiamond, setShowDiamond] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [selections, setSelections] = useState({
    topLeft: false,
    topRight: false,
    rightCircle: false,
    leftCircle: false,
    bottomCircle: false,
    middleCircle: false,
  });
  const [test, setTest] = useState(false);

  function handleStart() {
    setAnimateOut(true);
    setShowDiamond(true);
  }

  let nextTest = false;

  function handleReady() {
    // console.log("ready");

    let data = { ...selections };
    navigate("/questionnaire", { state: data });
  }

  function handleSelection(e, f) {
    console.log(e);
    console.log(f);
    let nextSelections = { ...selections };
    if (e == "topLeft") nextSelections = { ...nextSelections, topLeft: f };
    if (e == "topRight") nextSelections = { ...nextSelections, topRight: f };
    if (e == "rightCircle")
      nextSelections = { ...nextSelections, rightCircle: f };
    if (e == "leftCircle")
      nextSelections = { ...nextSelections, leftCircle: f };
    if (e == "bottomCircle")
      nextSelections = { ...nextSelections, bottomCircle: f };
    if (e == "middleCircle")
      nextSelections = { ...nextSelections, middleCircle: f };
    console.log(nextSelections);
    setSelections(nextSelections);
    nextTest = Object.values(nextSelections);
    setTest(nextTest.includes(true));
    // console.log({ test });
    // console.log(test.includes(true));
  }

  return (
    <>
      <div className="top-0">
        <NavBar></NavBar>
      </div>
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
                <div className="text-xl pb-2 ">
                  Begin by selecting which worktech competencies you woud like
                  to asses.
                </div>
                <div className="hidden md:block text-white font-light ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ipsum dolorem saepe accusantium consequatur quidem
                  consequuntur vitae officia, possimus sit aspernatur debitis
                  dolor aperiam! Facere, ipsa maxime.
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
          {/* <div className="w-[100%] hidden md:block  flex between items-start h-[200px] overflow-hidden absolute bottom-0">
            <img
              src={diamondFooter}
              alt="Diamond image footer"
              className="w-full object-none absolute md:top-0 top-32 md:mt-0 "
            />
          </div> */}
        </>
      )}
      {showDiamond && (
        <div className="animate-fade-up animate-duration-[600ms] animate-delay-[800ms] animate-ease-linear">
          <div className="md:grid md:grid-cols-2 md:grid-rows-1 flex flex-col-reverse ">
            <div className="w-[80%] mx-[10%] flex flex-col  items-center justify-around">
              <div className="text-3xl font-light ml-10% text-[#09497B] p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <div className="bg-slate-200">
                <ul>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {" "}
                      {
                        questionBank.find((el) => el.DiamondLoc == "topLeft")
                          .Type
                      }
                    </span>
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "topLeft")
                        .Description}
                  </li>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {" "}
                      {
                        questionBank.find((el) => el.DiamondLoc == "topRight")
                          .Type
                      }
                    </span>{" "}
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "topRight")
                        .Description}
                  </li>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {
                        questionBank.find(
                          (el) => el.DiamondLoc == "rightCircle"
                        ).Type
                      }
                    </span>{" "}
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "rightCircle")
                        .Description}
                  </li>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {
                        questionBank.find((el) => el.DiamondLoc == "leftCircle")
                          .Type
                      }
                    </span>{" "}
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "leftCircle")
                        .Description}
                  </li>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {
                        questionBank.find(
                          (el) => el.DiamondLoc == "middleCircle"
                        ).Type
                      }
                    </span>{" "}
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "middleCircle")
                        .Description}
                  </li>
                  <li className="text-sm p-2">
                    <span className="font-bold text-[#0EA8DC] text-md">
                      {
                        questionBank.find(
                          (el) => el.DiamondLoc == "bottomCircle"
                        ).Type
                      }
                    </span>{" "}
                    {" - " +
                      questionBank.find((el) => el.DiamondLoc == "bottomCircle")
                        .Description}
                  </li>
                </ul>
              </div>
              {/* <div>
                Quis nemo laboriosam provident ex adipisci, mollitia ipsam
                maiores amet voluptatum hic illo velit unde reprehenderit magnam
                aperiam. Eius quia in atque!
              </div> */}
            </div>
            <div className="p-6 ml-3 md:-ml-4 md:mr-10">
              <Diamond
                handleSelection={handleSelection}
                test={test}
                handleReady={handleReady}
              ></Diamond>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
