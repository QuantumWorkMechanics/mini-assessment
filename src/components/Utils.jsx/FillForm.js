import { PDFDocument, drawImage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { findAvg } from "./Functions";
import html2canvas from "html2canvas";
import { resultsList } from "../../modules/question-bank";
import { tidy, summarize, mean } from "@tidyjs/tidy";
// import fs from "fs";

export default async function fillForm(
  categories,
  questionList,
  currentTotal,
  desiredTotal,
  setIsLoading
) {
  // Object.keys(categories).map((key) => {
  //   console.log(categories[key]);
  //   if (categories[key]) {
  //     console.log(key);
  //   }
  // });
  // document.getElementById("diamond-png").style.display = "block";
  const imgInput = document.getElementById("diamond-png");
  const imgDiamond = await html2canvas(imgInput, {
    // onclone: function (clonedDoc) {
    //   console.log("element: " + clonedDoc.getElementById("diamond-png"));
    //   clonedDoc.getElementById("diamond-png").style.display = "block";
    // },
    scale: 3,
  });
  // setTimeout(
  //   () => (document.getElementById("diamond-png").style.display = "none"),
  //   50
  // );
  const pngURL = imgDiamond.toDataURL();

  const formURL = "../../public/Overview.pdf";
  const formPDF = await fetch(formURL).then((res) => res.arrayBuffer());
  const componentURL = "../../../public/Component.pdf";
  const componentPDF = await fetch(componentURL).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(formPDF);

  const fontUrl = "../../../public/NotoSans-VariableFont_wdth,wght.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const pngImg = await pdfDoc.embedPng(pngURL);

  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();

  const allCurrent = form.getTextField("current");
  allCurrent.setText(currentTotal.toString());

  const allDesired = form.getTextField("desired");
  allDesired.setText(desiredTotal.toString());

  const currentTitle = form.getTextField("current_title");
  function setLevel(total) {
    if (total < 2) return "Starting";
    if (total >= 2 && currentTotal < 3) return "Developing";
    if (total >= 2 && currentTotal < 3) return "Intermediate";
    if (total > 4) return "Advanced";
  }
  let tempTitle = setLevel(currentTotal);
  currentTitle.setText(tempTitle);

  const textField1 = form.getTextField("text_field1");
  textField1.setText(resultsList[0][tempTitle.toLowerCase()]);
  textField1.setFontSize(8);
  textField1.updateAppearances(customFont);

  const desiredTitle = form.getTextField("desired_title");
  tempTitle = setLevel(desiredTotal);
  desiredTitle.setText(tempTitle);

  const textField2 = form.getTextField("text_field2");
  textField2.setText(resultsList[0][tempTitle.toLowerCase()]);
  textField2.setFontSize(8);
  textField2.updateAppearances(customFont);

  form.flatten();
  const imgWidth = 285;

  const imgHeight = 126.3;
  // console.log({ imgWidth, imgHeight });

  const pages = pdfDoc.getPages();
  const existingPage = pages[0];
  // const imgY = existingPage.getHeight() - imgHeight;
  existingPage.drawImage(pngImg, {
    x: existingPage.getWidth() - imgWidth - 50,
    y: existingPage.getHeight() - imgHeight - 180,
    width: imgWidth,
    height: imgHeight,
  });

  async function createComponentPage(diamondLoc) {
    if (categories[diamondLoc]) {
      const compDoc = await PDFDocument.load(componentPDF);
      const compList = questionList.filter((el) => el.DiamondLoc == diamondLoc);
      const compName = compList[0].Type;

      const current = findAvg(diamondLoc, "current", questionList).toString();
      const desired = findAvg(diamondLoc, "desired", questionList).toString();

      compDoc.registerFontkit(fontkit);
      const thisFont = await compDoc.embedFont(fontBytes);
      const thisForm = compDoc.getForm();
      // const componentField1 = thisForm.getTextField("component_field1");
      // componentField1.setText("Here is some text for " + compName);
      // componentField1.setFontSize(11);
      // componentField1.updateAppearances(thisFont);

      const componentTitle = thisForm.getTextField("component_title");
      componentTitle.setText(compName);
      componentTitle.setFontSize(18);
      componentTitle.updateAppearances(thisFont);

      const currentScore = thisForm.getTextField("current");
      currentScore.setText(current);
      currentScore.setFontSize(18);
      currentScore.updateAppearances(thisFont);

      const currentTitle = thisForm.getTextField("current_title");
      let tempTitle = setLevel(current);
      currentTitle.setText(tempTitle);

      let tempResultsList = resultsList.filter((el) => {
        return el.type == compName.toLowerCase();
      });
      const textField1 = thisForm.getTextField("text_field1");
      // console.log({ tempResultsList });
      textField1.setText(tempResultsList[0][tempTitle.toLowerCase()]);
      textField1.setFontSize(8);
      textField1.updateAppearances(thisFont);

      const desiredScore = thisForm.getTextField("desired");
      desiredScore.setText(desired);
      desiredScore.setFontSize(18);
      desiredScore.updateAppearances(thisFont);

      const desiredTitle = thisForm.getTextField("desired_title");
      tempTitle = setLevel(desired);
      desiredTitle.setText(tempTitle);

      const textField2 = thisForm.getTextField("text_field2");
      // console.log({ tempResultsList });
      textField2.setText(tempResultsList[0][tempTitle.toLowerCase()]);
      textField2.setFontSize(8);
      textField2.updateAppearances(thisFont);

      thisForm.flatten();

      const compEl = document.getElementById(compName + "_bar");
      const compEl2 = document.getElementById(compName + "_radar");
      const imgBar = await html2canvas(compEl, {
        scale: 3,
      });
      const imgBar2 = await html2canvas(compEl2, { scale: 3 });
      // console.log({ imgBar });
      const barURL = imgBar.toDataURL();
      const barURL2 = imgBar2.toDataURL();
      const pngImg = await compDoc.embedPng(barURL);
      const pngImg2 = await compDoc.embedPng(barURL2);
      const imgWidth = 250;
      const imgHeight = 150;

      const pages = compDoc.getPages();
      const existingPage = pages[0];
      // const imgY = existingPage.getHeight() - imgHeight;
      existingPage.drawImage(pngImg, {
        x: existingPage.getWidth() / 2 + 30,
        y: existingPage.getHeight() - imgHeight - 220,
        width: 250,
        height: 150,
      });

      existingPage.drawImage(pngImg2, {
        x: existingPage.getWidth() / 2 + 30,
        y: 220,
        width: 300,
        height: 150,
      });
      const tempDoc = await pdfDoc.copyPages(compDoc, [0]);
      pdfDoc.addPage(tempDoc[0]);
    }
  }

  await createComponentPage("topRight");
  await createComponentPage("rightCircle");
  await createComponentPage("bottomCircle");
  await createComponentPage("leftCircle");
  await createComponentPage("topLeft");
  await createComponentPage("middleCircle");

  const pdfResults = await pdfDoc.save();
  const blob = new Blob([pdfResults], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url);
  setIsLoading(false);
}
