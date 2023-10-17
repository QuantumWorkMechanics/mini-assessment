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
    // const readyFont = await document.fonts.ready;
    document.fonts.add(fontFile);

    fontFile.load();
    const element = document.getElementById("pdf-wrapper");

    element.style.fontFamily = "fontFamily Style Noto Sans";
  }, []);

  const handleDownloadPDF = useReactToPrint({
    content: () => printRef.current,
  });

  //   const handleDownloadPDF = async () => {
  // window.scrollTo(0, 0);
  // const element = document.getElementById("pdf-wrapper");
  // const element =
  // const canvas = await html2canvas(element, {
  //   width: 1000,
  //   height: 3600,
  //   logging: true,
  //   profile: true,
  //   useCORS: true,
  //   allowTaint: true,
  //   scrollY: -window.scrollY,
  //   foreignObjectRendering: true,
  // });
  // const data = canvas.toDataURL("image/png");
  // const pdf = new jsPDF();
  // const imgProperties = pdf.getImageProperties(data);
  // const pdfWidth = pdf.internal.pageSize.getWidth();
  // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  // pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  // pdf.save("print.pdf");

  //   };

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
