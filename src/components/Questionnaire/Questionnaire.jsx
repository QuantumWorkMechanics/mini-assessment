import { useState, useEffect } from "react";
import "../../index.css";
//import { questionBank, resultsList } from "../../modules/question-bank";
import { questionBank, categoriesList } from "../../modules/question-bank-v3-scrubbed";
import { useLocation } from "react-router-dom";
import NavBar from "../Navigation/NavBar";

import SectionComplete from "./SectionCompleted";
import AllSectionsComplete from "./AllSectionsComplete";
import Header from "./Header";
import SliderSelect from "./SliderSelect";
import Results from "../Results/Results";
import categoryList from "../Utils.jsx/CategoryList";
import MultiSelect from "./MultiSelect";
import img7 from "../../assets/image7.jpeg";
import { PopupButton } from "@typeform/embed-react";
import SingleSelect from "./SingleSelect";
import ResultsNew from "../ResultsNew/ResultsNew";
import logo from "../../assets/GreyLogo.png";
import cLogo from "../../assets/colorLogo.png";
import img1 from "../../assets/image10.jpeg";
import img2 from "../../assets/image14.jpg";
import img3 from "../../assets/image16.jpg";
import img4 from "../../assets/image17.jpg";
import img5 from "../../assets/image18.jpg";
import img6 from "../../assets/image5.jpeg";
import img8 from "../../assets/image8.jpeg";
import img9 from "../../assets/image6.jpeg";
import ResultsFlat from "../ResultsNew/ResultsFlat";
import useTimeout from "../Utils.jsx/useTimeout";

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function Questionnaire() {
  const location = useLocation();

  const [currentSliderValue, setCurrentSliderVal] = useState(0);
  const [desiredSliderValue, setDesiredSliderVal] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  // const [isOpen, setOpen] = useState(true);
  const [seeResult, setSeeResult] = useState(false);
  const [spotLight, setSpotLight] = useState(1);
  const [tfHidden, settfHidden] = useState({});
  const [imageIndex, setImgageIndex] = useState(0);
  const [isAutoAdvance, setIsAutoAdvance] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    //Scroll if using navbar for better visibility
    // window.matchMedia("(min-width: 768px)").matches
    //   ? window.scrollTo({ top: 112, behavior: "smooth" })
    //   : window.scrollTo({ top: 72, behavior: "smooth" });
    let tempList = questionBank.filter((el) => {
      let test = categoriesList.map((x) => x.Type);
      // console.log(test);
      return !test.includes(el.Dimension);
    });

    let includedCategories = [
      "",
      "HR Ecosystem Maturity",
      "Skills Maturity",
      "Implementation and Change Management",
      "HR Strategy and Planning",
      "Artificial Intelligence",
      "Digital Experience",
      "HR Data",
      "Organization Size",
    ];
    for (const key in location.state) {
      if (location.state[key]) {
        includedCategories = [...includedCategories, categoriesList.filter((cat) => cat.DiamondLoc == key)[0]];
      }
    }
    console.log(includedCategories);
    // filterCategories
    includedCategories.map((cat) => {
      let temp = questionBank.filter((q) => q.Dimension == cat.Type);
      tempList = [...tempList, ...temp];
    });
    // console.log(tempList);

    tempList = tempList.sort((a, b) => {
      return a.Number - b.Number;
    });
    console.log(tempList);

    setQuestionList(tempList);
    setCurrentQuestion(tempList[0]);
  }, []);

  function handleSlider(sliderValue, sliderType) {
    let temp = currentQuestion;
    temp[sliderType] = parseInt(sliderValue);

    if (sliderType == "Desired") {
      setDesiredSliderVal(parseInt(sliderValue));
    } else {
      setCurrentSliderVal(parseInt(sliderValue));
    }

    updateQuestionState(temp);

    if (isAutoAdvance && checkForAutoAdvance(sliderType, sliderValue)) {
      //  console.log("handling current");
      setTimeout(() => {
        handleNext();
      }, 900);
    }
  }

  function checkForAutoAdvance(sliderType, sliderValue) {
    return (
      (sliderType == "Desired" && currentSliderValue > 0 && sliderValue >= currentSliderValue) |
      (sliderType == "Current" && sliderValue > 0 && sliderValue <= desiredSliderValue)
    );
  }

  function handleSingleSelect(item) {
    let temp = { ...currentQuestion };
    temp.selections = item;
    updateQuestionState(temp);
  }

  //  function showError(){

  //  }

  function handleMultiSelect(item) {
    let temp = { ...currentQuestion };
    let i = temp.selections.indexOf(item);
    // console.log({ i });

    if (i < 0) {
      temp.selections.push(item);
    } else if (i > -1) {
      temp.selections = temp.selections.filter((x) => x != item);
    }

    updateQuestionState(temp);
  }

  function updateQuestionState(newState) {
    setCurrentQuestion(newState);
    setQuestionList((prev) => {
      prev[questionIndex] = newState;
      let tempHidden = {};
      prev.map((el) => {
        if (el.fieldType == "Slider Field") {
          tempHidden[`q${el.Number}`] = `Current: ${el.Current}, Desired: ${el.Desired}`;
        } else {
          tempHidden[`q${el.Number}`] = el.selections.toString();
        }
      });
      console.log({ prev, tempHidden });
      settfHidden(tempHidden);
      return prev;
    });
  }

  function handleNext() {
    let tempIndex = questionIndex;
    if (
      tempIndex + 1 < questionList.length &&
      (questionList[tempIndex].fieldType == "Multi-Select" || questionList[tempIndex].fieldType == "Single Select")
    ) {
      setImgageIndex((x) => x + 1);
    }
    if (questionIndex + 1 == questionList.length) {
      setProgress(1);
      // let tempList = questionList;

      setIsExploding(true);
      // setTimeout(document.getElementById("my_modal_1").showModal(), 1000);
      return;
    }
    let tempList = questionList;

    setProgress((questionIndex + 1) / questionList.length);
    setCurrentSliderVal(tempList[questionIndex + 1].Current);
    setDesiredSliderVal(tempList[questionIndex + 1].Desired);
    setCurrentQuestion(questionList[questionIndex + 1]);
    setQuestionIndex((prev) => prev + 1);
  }

  function handleBack() {
    let tempList = questionList;

    setCurrentSliderVal(tempList[questionIndex - 1].Current);
    setDesiredSliderVal(tempList[questionIndex - 1].Desired);
    setCurrentQuestion(questionList[questionIndex - 1]);
    if (questionList[questionIndex - 1].fieldType == "Multi-Select" || questionList[questionIndex - 1].fieldType == "Single Select") {
      setImgageIndex((x) => x - 1);
    }
    setQuestionIndex((prev) => prev - 1);
  }

  function handleOther(val) {
    let temp = { ...currentQuestion };
    temp.other = val;
    updateQuestionState(temp);
  }

  return (
    <>
      {!seeResult && (
        <>
          <div className="-mt-2.5 fixed">
            <progress className="progress progress-secondary w-screen" value={progress * 100} max="100"></progress>
          </div>

          <div className="h-screen text-primary flex ">
            {sectionComplete && <SectionComplete setSectionComplete={setSectionComplete} setSeeResult={setSeeResult} />}
            {!isExploding && !sectionComplete && (
              <>
                <div>
                  {currentQuestion.fieldType == "Slider Field" && (
                    <>
                      <Header currentQuestion={currentQuestion} count={questionList.length} questionIndex={questionIndex} />
                      <SliderSelect
                        spotLight={spotLight}
                        setSpotLight={setSpotLight}
                        currentSliderValue={currentSliderValue}
                        desiredSliderValue={desiredSliderValue}
                        handleSlider={handleSlider}
                        currentQuestion={currentQuestion}
                        questionIndex={questionIndex}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        isAutoAdvance={isAutoAdvance}
                        setIsAutoAdvance={setIsAutoAdvance}
                      />
                    </>
                  )}
                </div>

                {currentQuestion.fieldType == "Multi-Select" && (
                  <MultiSelect
                    handleOther={handleOther}
                    handleNext={handleNext}
                    handleMultiSelect={handleMultiSelect}
                    currentQuestion={currentQuestion}
                    count={questionList.length}
                    questionIndex={questionIndex}
                    img={IMAGES[imageIndex]}
                    isAutoAdvance={isAutoAdvance}
                    setIsAutoAdvance={setIsAutoAdvance}
                  />
                )}

                {currentQuestion.fieldType == "Single Select" && (
                  <SingleSelect
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSingleSelect={handleSingleSelect}
                    currentQuestion={currentQuestion}
                    count={questionList.length}
                    questionIndex={questionIndex}
                    img={IMAGES[imageIndex]}
                    isAutoAdvance={isAutoAdvance}
                    setIsAutoAdvance={setIsAutoAdvance}
                  />
                )}
              </>
            )}
            {isExploding && (
              <div className="flex flex-col justify-center items-center w-screen">
                <AllSectionsComplete setIsExploding={setIsExploding} setSeeResult={setSeeResult} tfHidden={tfHidden} />
              </div>
            )}
          </div>
        </>
      )}
      {seeResult && questionList && (
        // <div className=" w-screen h-screen flex flex-col text-center pt-20">Coming Soon</div>
        <div className="overflow-scroll">
          <ResultsFlat diagnostic={questionList} selections={location.state} />
        </div>
      )}
    </>
  );
}

export default Questionnaire;
