import React, { useEffect, useState } from "react";
import fillForm from "../Utils.jsx/FillForm";

export default function LaunchForm({
  categories,
  questionList,
  setSeeResult,
  continueAssessment,
  setContinueAssessment,
  currentTotal,
  desiredTotal,
  setIsLoading,
  setProgress,
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (continueAssessment == true) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [continueAssessment]);

  return (
    <>
      <div className="bg-neutral-50 p-2  flex justify-center items-center border rounded border-#0e416c gap-4">
        {showButton && (
          <button
            onClick={() => {
              setContinueAssessment(false);
              setSeeResult(false);
            }}
            className="border-2 border-[#0E6AAD]  text-[#0E6AAD] text-xs p-4 flex items-center font-semibold rounded h-10 shadow-lg"
          >
            <div className="flex flex-col">
              <div>CONTINUE</div>
              <div>ASSESSMENT</div>
            </div>
          </button>
        )}
        <button
          onClick={() => {
            setIsLoading(true);
            fillForm(categories, questionList, currentTotal, desiredTotal, setIsLoading, setProgress);
          }}
          className="bg-[#0E6AAD] text-white  text-xl p-4 flex items-center font-semibold rounded h-10 shadow-lg"
        >
          GET PDF
        </button>
      </div>
    </>
  );
}
