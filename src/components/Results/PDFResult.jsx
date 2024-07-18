import { dividerClasses } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResultsDiamond from "./ResultsDiamond";
import { font } from "../Utils.jsx/NotoSans-Black-normal";
import { useReactToPrint } from "react-to-print";

export default function PDFResult({ components, results }) {
  const printRef = useRef();

  useEffect(() => {
    const fontFile = new FontFace(
      "FontFamily Style Noto Sans",
      "url(https://fonts.gstatic.com/s/notosans/v32/o-0NIpQlx3QUlC5A4PNjXhFVZNyBx2pqPA.woff2)"
    );

    document.fonts.add(fontFile);

    fontFile.load();
    const element = document.getElementById("pdf-wrapper");

    element.style.fontFamily = "fontFamily Style Noto Sans";
  }, []);

  const handleDownloadPDF = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <button onClick={handleDownloadPDF} className="border-2">
        Download
      </button>
      <div className="absolute h-[3000px] w-screen  z-50"> </div>
      <main id="pdf-wrapper" ref={printRef} className="w-[1000px] h-[3000px]">
        <div>Hide</div>
        <div className="text-3xl mt-28">My Results</div>
        <div className="mt-[100px]">
          {" "}
          <ResultsDiamond components={components} results={results} />
        </div>
        <div>test</div>
      </main>
    </div>
  );
}
