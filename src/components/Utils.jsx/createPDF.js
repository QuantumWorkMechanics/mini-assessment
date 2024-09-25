import { PDFDocument, drawImage, TextAlignment, drawText } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { findAvg } from "./Functions";
import html2canvas from "html2canvas";
import { resultsList } from "../../modules/question-bank";
import overview from "../../assets/Overall-v1.pdf";
import overviewLg from "../../assets/Overall-v2-2.pdf";
import component from "../../assets/Components-v2.pdf";
import next from "../../assets/Next-v2.pdf";
//import noto from "../../assets/NotoSans-VariableFont_wdth,wght.ttf";
import noto from "../../assets/NotoSans-Regular.ttf";
import notoBold from "../../assets/NotoSans-Bold.ttf";
import { DIMENSION_TEXT } from "../ResultsNew/ResultsSubResult";

const STATIC_TEXT = {
  title: "WORKFORCE AGILITY DIAGNOSTIC",
  opener:
    "Thank you for completing the diagnostic. Your responses provide valuable insights that will help us tailor solutions to advance your HR technology capabilities and align them with your strategic goals. Below, you'll find the maturity results for your HR tech ecosystem and a detailed analysis for the selected tech stack area(s). ",
  overallDivHeader: "Business and HR Strategy Maturity",
  overallDivContent:
    "Industry research indicates that integrating AI into organizational strategy can significantly boost operational efficiency by up to 30%. By investing in AI tools tailored to business needs, companies can enhance decision-making accuracy by 25%. Building AI competencies within the team not only increases innovation by 20% but also provides a competitive edge. These findings illustrate the substantial benefits of AI integration for skills enhancement and operational efficiency.",
};

export default async function createPDF(setIsLoading, setProgress, results) {
  console.log("creatingPDF");

  const imgInput = document.getElementById("flat-result");
  const imgDiamond = await html2canvas(imgInput, {
    scale: 3,
    //backgroundColor: "rgba(9,73,123)",
    backgroundColor: null,
  });
  console.log({ results });
  const currentDial = document.getElementById("current-speedometer");
  const imgCurrentDial = await html2canvas(currentDial, {
    scale: 6,
    //backgroundColor: "#09497B",
    backgroundColor: null,
  });
  const currentDialPNG = imgCurrentDial.toDataURL();

  const desiredDial = document.getElementById("desired-speedometer");
  const imgDesiredDial = await html2canvas(desiredDial, {
    scale: 6,
    // backgroundColor: "#09497B",
    backgroundColor: null,
  });
  const desiredDialPNG = imgDesiredDial.toDataURL();

  const radarSVG = document.getElementById("HR Ecosystem Maturity_radar");

  const radarImg = await html2canvas(radarSVG, {
    scale: 6,
    backgroundColor: null,
  });
  const radarURL = radarImg.toDataURL();

  setProgress(25);

  let formPDF;
  console.log("Length: " + results.orgResults.result.toString().length);
  const pngURL = imgDiamond.toDataURL();
  if (results.orgResults.result.toString().length > 630) {
    formPDF = await fetch(overviewLg).then((res) => res.arrayBuffer());
  } else {
    formPDF = await fetch(overview).then((res) => res.arrayBuffer());
  }
  const componentPDF = await fetch(component).then((res) => res.arrayBuffer());
  const nextPDF = await fetch(next).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPDF);
  const fontBytes = await fetch(noto).then((res) => res.arrayBuffer());
  const boldFontBytes = await fetch(notoBold).then((res) => res.arrayBuffer());
  //const pngImg = await pdfDoc.embedPng(pngURL);
  const currentDialImg = await pdfDoc.embedPng(currentDialPNG);
  const desiredDialImg = await pdfDoc.embedPng(desiredDialPNG);
  const radarEmbed = await pdfDoc.embedPng(radarURL);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);
  const boldFont = await pdfDoc.embedFont(boldFontBytes);

  //const pages = pdfDoc.getPages;
  const overallForm = pdfDoc.getForm();

  //Add text to fields
  // const diagnosticTitle = overallForm.getTextField("diagnostic_title");
  // diagnosticTitle.setText(STATIC_TEXT.title);

  const overallSubheader = overallForm.getTextField("overall_subheader");
  overallSubheader.setText(STATIC_TEXT.opener);

  const overallTitle = overallForm.getTextField("overall_title");
  overallTitle.setText(results.orgResults.title.toString());

  const overallResult = overallForm.getTextField("overall_result");
  overallResult.setText(results.orgResults.result.toString());
  //overallResult.setText(
  // "Your organization should prioritize integrating advanced AI and machine learning tools into its HR technology ecosystem. Recent HR research indicates that leveraging these technologies can improve decision-making speed and accuracy by up to 35% and enable real-time data analytics for more strategic HR initiatives. Emphasizing skills management and development can lead to up to a 25% increase in employee productivity and engagement. Studies show that robust skills tracking is crucial for identifying skill gaps and implementing targeted development efforts, fostering a highly adaptable and capable workforce that can respond quickly to changing business needs."
  //); // By creating personalized learning pathways and leveraging AI for skills matching, your organization can ensure that employees are continuously developing and aligned with the organization's strategic goals."
  // );
  // overallResult.setText(
  //   "Industry research indicates that integrating AI into organizational strategy can significantly boost operational efficiency by up to 30%. By investing in AI tools tailored to business needs, companies can enhance decision-making accuracy by up to 25%. Building AI competencies within the team not only increases innovation by up to 20% but also provides a competitive edge. These findings illustrate the substantial benefits of AI integration for skills enhancement and operational efficiency."
  // );
  const overallDivHeader = overallForm.getTextField("overall_div_header");
  overallDivHeader.setText(STATIC_TEXT.overallDivHeader);

  const overallDivContent = overallForm.getTextField("overall_div_content");
  overallDivContent.setText(STATIC_TEXT.overallDivContent);

  //NEW DRAW TEXT
  // pages[0].drawText(STATIC_TEXT.title, {});

  const TEXT_SIZE = 11;
  const DIV_TEXT_SIZE = 22;
  const SUBHEADER_SIZE = 12;

  //style fields
  // diagnosticTitle.setFontSize(22);
  // diagnosticTitle.updateAppearances(boldFont);
  overallSubheader.setFontSize(TEXT_SIZE);
  overallSubheader.updateAppearances(customFont);
  overallTitle.setAlignment(TextAlignment.Center);
  overallTitle.setFontSize(DIV_TEXT_SIZE);
  overallTitle.updateAppearances(boldFont);
  overallResult.setFontSize(TEXT_SIZE);

  overallResult.updateAppearances(customFont);
  //overallDivHeader.setAlignment(TextAlignment.Center);
  overallDivHeader.setFontSize(DIV_TEXT_SIZE);
  overallDivHeader.updateAppearances(boldFont);
  overallDivContent.setFontSize(TEXT_SIZE);
  overallDivContent.updateAppearances(customFont);

  overallForm.flatten();
  // const allDesired = form.getTextField("desired");
  // allDesired.setText(desiredTotal.toString());

  // const currentTitle = form.getTextField("current_title");
  // function setLevel(total) {
  //   if (total < 2) return "Starting";
  //   if (total >= 2 && total < 3) return "Developing";
  //   if (total >= 3 && total < 4) return "Intermediate";
  //   if (total >= 4) return "Advanced";
  // }
  // let tempTitle = setLevel(currentTotal);
  // currentTitle.setText(tempTitle);

  // function fillTextField(form, textField, text, font = "none", fontSize = 0) {
  //   const field = form.getTextField(textField);
  //   field.setText(text);
  //   if (fontSize > 0) field.setFontSize(fontSize);
  //   if (font != "none") field.updateAppearances(font);
  // }

  // fillTextField(form, "text_field1", resultsList[0][tempTitle.toLowerCase()], customFont, 8);

  // fillTextField(form, "desired_title", setLevel(desiredTotal), "none");
  // fillTextField(form, "text_field2", resultsList[0][setLevel(desiredTotal).toLowerCase()], customFont, 8);

  // form.flatten();
  // const imgWidth = 200;
  // const imgHeight = 180;

  const pages = pdfDoc.getPages();
  const existingPage = pages[0];
  existingPage.drawImage(currentDialImg, {
    // x: existingPage.getWidth() - imgWidth - 50,
    // y: existingPage.getHeight() - imgHeight - 180,
    x: 60,
    y: 100,
    width: 300 * 0.66,
    height: 190 * 0.66,
  });
  existingPage.drawImage(desiredDialImg, {
    // x: existingPage.getWidth() - imgWidth - 50,
    // y: existingPage.getHeight() - imgHeight - 180,
    x: existingPage.getWidth() - 60 - 300 * 0.66,
    y: 100,
    width: 300 * 0.66,
    height: 190 * 0.66,
  });

  pages[1].drawImage(radarEmbed, {
    // x: existingPage.getWidth() - imgWidth - 50,
    // y: existingPage.getHeight() - imgHeight - 180,
    x: 25,
    y: 180,
    width: 1000 * 0.66,
    height: 300 * 0.66,
  });

  setProgress(40);

  async function createComponentPage(result) {
    // if (categories[diamondLoc]) {
    console.log({ result });
    const compDoc = await PDFDocument.load(componentPDF);
    console.log(result.dimension + "_bar");
    const barEl = document.getElementById(result.dimension + "_bar");

    // const compEl2 = document.getElementById(compName + "_radar");
    console.log({ barEl });
    const barImg = await html2canvas(barEl, {
      scale: 3,
      // height: 1,
      // width: 20,
      backgroundColor: "white",
    });
    console.log({ barImg });
    console.log("hmtl2canvas ran on bar");

    // const imgBar2 = await html2canvas(compEl2, { scale: 3 });

    compDoc.registerFontkit(fontkit);
    const thisFont = await compDoc.embedFont(fontBytes);
    const boldFont = await compDoc.embedFont(boldFontBytes);
    // const compList = questionList.filter((el) => el.DiamondLoc == diamondLoc);
    // const compName = compList[0].Type;
    // const current = findAvg(diamondLoc, "current", questionList).toString();
    // const desired = findAvg(diamondLoc, "desired", questionList).toString();
    const componentForm = compDoc.getForm();
    const compTitle = componentForm.getTextField("comp_title");
    compTitle.setText(result.dimension.toString());
    // compTitle.updateAppearances(boldFont)
    const compMain = componentForm.getTextField("comp_main");
    // compMain.setText(
    //   `The bellow recommendations and Benefits are tailored for to enhance your ${
    //     result.dimension
    //   }. These strategies are designed to help yourorganization optimize ${
    //     DIMENSION_TEXT[result.dimension].display
    //   }, improve skills management, and support strategic business objectives.`
    // );
    compMain.setText(result.intro.toString());
    compMain.setFontSize(TEXT_SIZE);
    compMain.updateAppearances(thisFont);

    function addRecsAndBenefits(type) {
      for (let i = 0; i < 3; i++) {
        console.log({ result });
        let fieldName = "comp_" + type + "_" + (i + 1);
        let textField = componentForm.getTextField(fieldName);
        //   console.log(result);
        if (result.result[type == "rec" ? "Recommendations" : "Benefits"].length > i) {
          let recOrBen = result.result[type == "rec" ? "Recommendations" : "Benefits"][i];
          textField.setText(recOrBen.toString());
          textField.setFontSize(TEXT_SIZE);
          textField.updateAppearances(thisFont);
        }
      }
    }

    addRecsAndBenefits("rec");
    addRecsAndBenefits("benefit");

    // if (componentForm.getTextField("comp_rec_1")) {
    // const compRec1 = componentForm.getTextField("comp_rec_1");
    // compRec1.setText(result.result.Recommendations[0].toString());
    // if (componentForm.getTextField("comp_rec_2")) {
    //   const compRec2 = componentForm.getTextField("comp_rec_2");
    // }
    // if (componentForm.getTextField("comp_rec_2")) {
    // compRec2.setText(result.result.Recommendations[1].toString());
    // const compRec3 = componentForm.getTextField("comp_rec_3");
    // compRec3.setText(result.result.Recommendations[2].toString());

    // const compBenefit1 = componentForm.getTextField("comp_benefit_1");
    // compBenefit1.setText(result.result.Recommendations[0].toString());
    // const compBenefit2 = componentForm.getTextField("comp_benefit_2");
    // compBenefit2.setText(result.result.Recommendations[1].toString());
    // const compBenefit3 = componentForm.getTextField("comp_benefit_3");
    // compBenefit3.setText(result.result.Recommendations[2].toString());

    // function setText(field) {
    //   field.setFontSize(TEXT_SIZE);
    // }

    // [compRec1, compRec2, compRec3, compBenefit1, compBenefit2, compBenefit3].map((x) => setText(x));

    compTitle.updateAppearances(boldFont);
    // fillTextField(thisForm, "component_title", compName);
    // fillTextField(thisForm, "current", current);
    // fillTextField(thisForm, "current_title", setLevel(current));

    // let tempResultsList = resultsList.filter((el) => {
    //   return el.type == compName.toLowerCase();
    // });

    // let currentLevel = setLevel(current);

    // fillTextField(thisForm, "text_field1", tempResultsList[0][currentLevel.toLowerCase()], thisFont);
    // fillTextField(thisForm, "desired", desired, thisFont, 18);
    // fillTextField(thisForm, "desired_title", setLevel(desired), thisFont, 18);
    // fillTextField(thisForm, "text_field2", tempResultsList[0][setLevel(desired).toLowerCase()], thisFont, 8);

    componentForm.flatten();
    console.log("flattened");
    const barURL = barImg.toDataURL("image/png");
    console.log({ barURL });
    console.log("bar to URL");
    // const barURL2 = imgBar2.toDataURL();
    const barPNG = await compDoc.embedPng(barURL);

    console.log("bar to PNG");
    // const pngImg2 = await compDoc.embedPng(barURL2);
    // const imgHeight = 150;
    const barEmbed = await compDoc.embedPng(barURL);
    console.log("embedded");
    const pages = compDoc.getPages();
    const existingPage = pages[0];

    existingPage.drawImage(barEmbed, {
      // x: existingPage.getWidth() / 2 + 10,
      // y: existingPage.getHeight() - imgHeight - 200,
      x: 140,
      y: 345,
      width: 100 * 3,
      height: 54.44 * 3,

      // width: existingPage.getWidth(),
      // height: existingPage.getHeight(),
    });

    console.log("added component image");

    //   existingPage.drawImage(pngImg2, {
    //     x: existingPage.getWidth() / 2 + 10,
    //     y: 240,
    //     width: 250,
    //     height: 125,
    //   });
    const tempDoc = await pdfDoc.copyPages(compDoc, [0]);
    pdfDoc.addPage(tempDoc[0]);
    // }
  }
  // results.dimensionResults.map((result) => {
  //   createComponentPage(result);
  // });

  const dimResArr = results.dimensionResults;

  if (dimResArr.length > 0) {
    await createComponentPage(dimResArr[0]);
  }
  setProgress(50);
  if (dimResArr.length > 1) {
    await createComponentPage(dimResArr[1]);
  }
  if (dimResArr.length > 2) {
    await createComponentPage(dimResArr[2]);
  }
  setProgress(60);
  if (dimResArr.length > 3) {
    await createComponentPage(dimResArr[3]);
  }
  if (dimResArr.length > 4) {
    await createComponentPage(dimResArr[4]);
  }
  setProgress(70);
  if (dimResArr.length > 5) {
    await createComponentPage(dimResArr[5]);
  }
  if (dimResArr.length > 6) {
    await createComponentPage(dimResArr[6]);
  }
  setProgress(90);
  if (dimResArr.length > 7) {
    await createComponentPage(dimResArr[7]);
  }
  // await createComponentPage("topRight");
  // await createComponentPage("rightCircle");
  // setProgress(50);
  // await createComponentPage("bottomCircle");
  // setProgress(60);
  // await createComponentPage("leftCircle");
  // setProgress(70);
  // await createComponentPage("topLeft");
  // setProgress(80);
  // await createComponentPage("middleCircle");
  // setProgress(90);
  const nextDoc = await PDFDocument.load(nextPDF);
  const tempDoc = await pdfDoc.copyPages(nextDoc, [0]);
  pdfDoc.addPage(tempDoc[0]);

  console.log("created PDF");

  const pdfResults = await pdfDoc.save();
  const blob = new Blob([pdfResults], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  setProgress(100);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Maturity Results.pdf");

  document.getElementById("pdf-download").appendChild(link);

  link.click();
  setProgress(0);
  setIsLoading(false);
  // setProgress(0);
  link.parentElement.removeChild(link);
}
