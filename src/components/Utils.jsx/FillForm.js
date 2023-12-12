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
  setIsLoading,
  setProgress
) {
  const imgInput = document.getElementById("diamond-png");
  const imgDiamond = await html2canvas(imgInput, {
    scale: 3,
  });

  setProgress(25);

  const pngURL = imgDiamond.toDataURL();

  // const formURL = "../../assets/Overview.pdf";
  const formPDF = await fetch(overview).then((res) => res.arrayBuffer());
  // const componentURL = "../../assets/Component.pdf";

  const componentPDF = await fetch(component).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPDF);

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

  function fillTextField(form, textField, text, font = "none", fontSize = 0) {
    const field = form.getTextField(textField);
    field.setText(text);
    if (fontSize > 0) field.setFontSize(fontSize);
    if (font != "none") field.updateAppearances(font);
  }

  fillTextField(
    form,
    "text_field1",
    resultsList[0][tempTitle.toLowerCase()],
    customFont,
    8
  );

  fillTextField(form, "desired_title", setLevel(desiredTotal), "none");
  fillTextField(
    form,
    "text_field2",
    resultsList[0][setLevel(desiredTotal).toLowerCase()],
    customFont,
    8
  );

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

  setProgress(40);

  async function createComponentPage(diamondLoc) {
    if (categories[diamondLoc]) {
      const compDoc = await PDFDocument.load(componentPDF);

      compDoc.registerFontkit(fontkit);
      const thisFont = await compDoc.embedFont(fontBytes);

      const compList = questionList.filter((el) => el.DiamondLoc == diamondLoc);
      const compName = compList[0].Type;
      const current = findAvg(diamondLoc, "current", questionList).toString();
      const desired = findAvg(diamondLoc, "desired", questionList).toString();

      const thisForm = compDoc.getForm();

      fillTextField(thisForm, "component_title", compName);

      fillTextField(thisForm, "current", current);

      fillTextField(thisForm, "current_title", setLevel(current));

      let tempResultsList = resultsList.filter((el) => {
        return el.type == compName.toLowerCase();
      });

      let currentLevel = setLevel(current);

      fillTextField(
        thisForm,
        "text_field1",
        tempResultsList[0][currentLevel.toLowerCase()],
        thisFont
      );

      fillTextField(thisForm, "desired", desired, thisFont, 18);

      fillTextField(thisForm, "desired_title", setLevel(desired), thisFont, 18);

      fillTextField(
        thisForm,
        "text_field2",
        tempResultsList[0][setLevel(desired).toLowerCase()],
        thisFont,
        8
      );

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
  setProgress(50);

  await createComponentPage("bottomCircle");
  setProgress(60);
  await createComponentPage("leftCircle");
  setProgress(70);
  await createComponentPage("topLeft");
  setProgress(80);
  await createComponentPage("middleCircle");
  setProgress(90);

  const pdfResults = await pdfDoc.save();
  const blob = new Blob([pdfResults], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  setProgress(100);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Maturity Results.pdf");

  document.body.appendChild(link);

  link.click();

  setIsLoading(false);
  setProgress(0);
}
