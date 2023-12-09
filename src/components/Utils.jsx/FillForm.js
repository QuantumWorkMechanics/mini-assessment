import { PDFDocument, drawImage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { findAvg } from "./Functions";
import html2canvas from "html2canvas";
import { resultsList } from "../../modules/question-bank";
import { tidy, summarize, mean } from "@tidyjs/tidy";
import overview from "../../assets/Overview.pdf";
import component from "../../assets/Component.pdf";
import noto from "../../assets/NotoSans-VariableFont_wdth,wght.ttf";

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

  // const formURL = "../../assets/Overview.pdf";
  const formPDF = await fetch(overview).then((res) => res.arrayBuffer());
  // const componentURL = "../../assets/Component.pdf";
  const componentPDF = await fetch(component).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPDF);

  // const fontUrl = "../../../public/NotoSans-VariableFont_wdth,wght.ttf";
  const fontBytes = await fetch(noto).then((res) => res.arrayBuffer());
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
    if (total >= 2 && total < 3) return "Developing";
    if (total >= 3 && total < 4) return "Intermediate";
    if (total >= 4) return "Advanced";
  }
  let tempTitle = setLevel(currentTotal);
  currentTitle.setText(tempTitle);

  const textField1 = form.getTextField("text_field1");
  textField1.setText(resultsList[0][tempTitle.toLowerCase()]);
  textField1.setFontSize(8);
  textField1.updateAppearances(customFont);

  const desiredTitle = form.getTextField("desired_title");
  let tempTitleText = setLevel(desiredTotal);
  desiredTitle.setText(tempTitleText);

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
      let tempCurrentTitle = setLevel(current);
      currentTitle.setText(tempCurrentTitle);

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
      let tempDesiredTitle = setLevel(desired);
      desiredTitle.setText(tempDesiredTitle);

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
        x: existingPage.getWidth() / 2 + 10,
        y: existingPage.getHeight() - imgHeight - 200,
        width: 250,
        height: 150,
      });

      console.log(pngImg2);
      existingPage.drawImage(pngImg2, {
        x: existingPage.getWidth() / 2 + 10,
        y: 240,
        width: 250,
        height: 125,
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
  // window.open(url);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Maturity Results.pdf");

  document.body.appendChild(link);

  link.click();

  setIsLoading(false);
}
