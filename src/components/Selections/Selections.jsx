import React, { useState } from "react";
import diamondFooter from "../../assets/Diamond-2.jpg";
import Diamond from "../Diamond";

export default function Selections() {
  const [showDiamond, setShowDiamond] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  function handleStart() {
    setAnimateOut(true);
    setShowDiamond(true);
  }

  return (
    <>
      {showDiamond == false && (
        <>
          <div className="animate-fade-up animate-duration-[600ms] animate-delay-[600ms] animate-ease-linear">
            <div className="bg-[#09497B] w-screen h-[90vh] md:h-[40vh] md:grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-white  mt-[100px] pl-[10%] md:pl-0 py-2 ">
              <div className="w-[80%] md:place-self-center">
                <h1 className="text-[25pt] pb-4 md:text-[40pt] text-white font-extralight animate-flip-up animate-delay-[1200ms]">
                  Design your new world of work
                </h1>
              </div>
              <div className="w-[80%] place-self-center">
                <div className="text-xl pb-2 ">
                  Begin by selecting which worktech competencies you woud like
                  to asses.
                </div>
                <div className="text-white font-light ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ipsum dolorem saepe accusantium consequatur quidem
                  consequuntur vitae officia, possimus sit aspernatur debitis
                  dolor aperiam! Facere, ipsa maxime. Quod vitae dignissimos
                  accusamus!
                </div>
              </div>
            </div>
            <div className="w-screen md:mt-4 -mt-14 flex justify-center">
              <button
                className="text-2xl md:text-3xl text-white md:text-[#09497B] hover:text-white hover:bg-[#09497B] hover:outline-[#FDB517] outline outline-4  p-2"
                onClick={handleStart}
              >
                BEGIN
              </button>
            </div>
          </div>
          <div className="w-[100%] hidden md:block  flex between items-start h-[200px] overflow-hidden absolute bottom-0">
            <img
              src={diamondFooter}
              alt="Diamond image footer"
              className="w-full object-none absolute md:top-0 top-32 md:mt-0 "
            />
          </div>
        </>
      )}
      {showDiamond && (
        <div className="animate-fade-up animate-duration-[600ms] animate-delay-[800ms] animate-ease-linear">
          <div className="md:grid md:grid-cols-2 md:grid-rows-1">
            <div>
              Click the competencies on the diamond to add thm to your
              assessments.
            </div>
            <div className="p-6">
              <Diamond></Diamond>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
