import React, { useEffect, useState } from "react";
import fillForm from "../Utils.jsx/FillForm";
import { Button } from "@mui/material";

export default function LaunchForm({
  setShowForm,
  handleDownloadPDF,
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
    // console.log({ continueAssessment });
    if (continueAssessment == true) {
      // console.log("ran Effect");
      setShowButton(true);
    } else {
      // console.log("no Effect");
      setShowButton(false);
    }
  }, [continueAssessment]);

  return (
    <>
      <div className="bg-neutral-50 p-2  flex justify-center items-center border rounded border-#0e416c gap-4">
        {/* <div className="w-[400px]">
          <label htmlFor="email" className="text-xs">
            Would you like to receive a detailed PDF of your results?
          </label>
          <input
            id="email"
            type="text"
            placeholder="Work Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div> */}
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
            fillForm(
              categories,
              questionList,
              currentTotal,
              desiredTotal,
              setIsLoading,
              setProgress
            );
          }}
          className="bg-[#0E6AAD] text-white  text-xl p-4 flex items-center font-semibold rounded h-10 shadow-lg"
        >
          GET PDF
        </button>
      </div>
    </>
  );
}
