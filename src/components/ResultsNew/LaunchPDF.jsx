import React, { useEffect, useState } from "react";
import fillForm from "../Utils.jsx/FillForm";
import createPDF from "../Utils.jsx/createPdf";

export default function LaunchPDF({ setIsLoading, setProgress, results }) {
  return (
    <>
      <div id={"pdf-download"} className="bg-neutral-50 p-2  flex justify-center items-center border rounded border-#0e416c gap-4 overflow-x-contain">
        <button
          onClick={() => {
            // setIsLoading(true);
            console.log("running");
            //  document.getElementById("HR Ecosystem Maturity_radar").classList.remove("max-sm:hidden");
            createPDF(setIsLoading, setProgress, results);
          }}
          className="bg-[#0E6AAD] text-white  text-xl p-4 flex items-center font-semibold rounded h-10 shadow-lg"
        >
          GET PDF
        </button>
      </div>
    </>
  );
}
