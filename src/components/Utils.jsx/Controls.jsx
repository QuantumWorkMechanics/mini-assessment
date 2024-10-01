import { useState } from "react";

function Controls({ handleNext, handleBack, isAutoAdvance, setIsAutoAdvance, questionIndex, isActive, showAutoAdvance, currentQuestion }) {
  const [tipOpen, setTipOpen] = useState(false);
  // console.log(isActive);
  return (
    <>
      <div className=" flex mt-4 md:mt-0 justify-between w-full md:justify-center z-50">
        <div className="p-2 ">
          {questionIndex == 0 && (
            <div className="btn btn-outline disabled bg-slate-300 border-slate-300" size="large">
              BACK
            </div>
          )}
          {questionIndex > 0 && (
            <div
              className="btn  bg-[#09497B] text-white border-slate-300"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                handleBack();
              }}
            >
              BACK
            </div>
          )}
        </div>
        <div className="p-2">
          {isActive && (
            <div
              className="btn bg-[#FDB517] text-[#09497B] border-slate-300"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                handleNext(true);
              }}
            >
              NEXT
            </div>
          )}
          {!isActive && (
            <>
              <div
                className="hidden md:block  tooltip "
                data-tip={currentQuestion && currentQuestion.errorMessage ? currentQuestion.errorMessage : ""}
              >
                <div className="btn btn-outline disabled bg-slate-300 border-slate-300" size="large">
                  NEXT
                </div>
              </div>
              <div className="md:hidden btn btn-outline disabled bg-slate-300 border-slate-300" size="large">
                NEXT
              </div>
            </>
          )}
        </div>
      </div>
      {showAutoAdvance && (
        <div className="hidden md:flex justify-center">
          <div className="w-fit tooltip " data-tip="Will advance to next question when enough selections are made.">
            <label className="label cursor-pointer">
              <span className="label-text pr-3 ">Auto-advance</span>
              <input
                type="checkbox"
                className="toggle bg-[#09497B]"
                checked={isAutoAdvance}
                onChange={() => {
                  setIsAutoAdvance((prev) => {
                    if (!prev && isActive) {
                      handleNext();
                    }
                    return !prev;
                  });
                }}
              />
            </label>
          </div>
        </div>
      )}
      {showAutoAdvance && (
        <div className="md:hidden flex items-center gap-2 justify-center">
          <label className="label cursor-pointer">
            <span className="label-text pr-3 ">Auto-advance</span>
            <input type="checkbox" className="toggle bg-[#09497B]" checked={isAutoAdvance} onChange={() => setIsAutoAdvance((prev) => !prev)} />
          </label>
          {/* <div onClick={() => setTipOpen((x) => !x)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5f6368" viewBox="0 -960 960 960">
              <path d="M440-280h80v-240h-80v240zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93zm0-320z"></path>
            </svg>
          </div> */}
          {tipOpen && <div className="w-0 tooltip tooltip-open" data-tip="Will advance to next question when enough selections are made."></div>}
        </div>
      )}
    </>
  );
}

export default Controls;
