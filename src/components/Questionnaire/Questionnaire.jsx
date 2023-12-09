import { useState, useEffect } from "react";
import "../../index.css";
import { questionBank, resultsList } from "../../modules/question-bank";
import { useLocation } from "react-router-dom";
import NavBar from "../Navigation/NavBar";

import SectionComplete from "./SectionCompleted";
import AllSectionsComplete from "./AllSectionsComplete";
import Header from "./Header";
import AssessmentBody from "./AssessmentBody";
import Results from "../Results/Results";
import categoryList from "../Utils.jsx/CategoryList";

function Questionnaire() {
  const location = useLocation();

  const [currentSliderValue, SetCurrentSliderValuerValue] = useState(0);
  const [desiredSliderValue, SetDesiredSliderValuerValuerValue] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNum, setQuestionNum] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [seeResult, setSeeResult] = useState(false);
  const [spotLight, setSpotLight] = useState(1);

  useEffect(() => {
    window.matchMedia("(min-width: 768px)").matches
      ? window.scrollTo({ top: 112, behavior: "smooth" })
      : window.scrollTo({ top: 72, behavior: "smooth" });
    let tempList = [];

    // filterCategories

    categoryList.map((selectedCategory) => {
      if (location.state[selectedCategory]) {
        tempList = tempList.concat(
          questionBank.filter(
            (component) => component.DiamondLoc == selectedCategory
          )
        );
      }
    });

    setQuestionList(tempList);
    setQuestionNum(tempList[0]);
    setTimeout(() => setOpen(false), 2500);
    // console.log(location.state);
  }, []);

  function handleCurrent(sliderValue) {
    SetCurrentSliderValuerValue(Number(sliderValue));
    // console.log({ x });
  }

  function handleDesired(sliderValue) {
    SetDesiredSliderValuerValuerValue(Number(sliderValue));
    // console.log({ y });
  }

  function handleNext() {
    if (questionIndex + 1 == questionList.length) {
      setProgress(1);
      let tempList = questionList;
      tempList[questionIndex].Current = currentSliderValue;
      tempList[questionIndex].Desired = desiredSliderValue;
      setQuestionList(tempList);
      setIsExploding(true);
      // setTimeout(document.getElementById("my_modal_1").showModal(), 1000);
      return;
    }
    if (
      questionList[questionIndex].Type != questionList[questionIndex + 1].Type
    ) {
      // console.log("New Category");
      // setIsFireworks(true);
      setSectionComplete(true);
      // setTimeout(() => setIsFireworks(false), 3000);
      // return;
    }
    let tempList = questionList;
    tempList[questionIndex].Current = currentSliderValue;
    tempList[questionIndex].Desired = desiredSliderValue;
    setProgress((questionIndex + 1) / questionList.length);
    setQuestionList(tempList);
    SetCurrentSliderValuerValue(tempList[questionIndex + 1].Current);
    SetDesiredSliderValuerValuerValue(tempList[questionIndex + 1].Desired);
    setQuestionNum(questionList[questionIndex + 1]);
    console.log(questionList[questionIndex + 1]);
    setQuestionIndex((prev) => prev + 1);

    // console.log(questionNum);
  }

  function handleBack() {
    let tempList = questionList;
    // let currentScore = questionBank[questions[questionIndex - 1]];
    // console.log({ currentScore });
    SetCurrentSliderValuerValue(tempList[questionIndex - 1].Current);
    SetDesiredSliderValuerValuerValue(tempList[questionIndex - 1].Desired);
    setQuestionNum(questionList[questionIndex - 1]);
    setQuestionIndex((prev) => prev - 1);
    console.log(questionList[questionIndex - 1]);
    console.log(questionList);
  }

  return (
    <>
      {!seeResult && <NavBar></NavBar>}
      {!seeResult && (
        <div className="-mt-2.5">
          <progress
            className="progress progress-secondary w-screen"
            value={progress * 100}
            max="100"
          ></progress>
        </div>
      )}

      {/* <SpotlightTour
        open={isOpen}
        onClose={() => setOpen(false)}
        Spotlight={Spotlight}
      > */}
      <div className="h-screen text-primary flex flex-col">
        {sectionComplete && (
          <SectionComplete
            setSectionComplete={setSectionComplete}
            setSeeResult={setSeeResult}
          />
        )}
        {isExploding && (
          <AllSectionsComplete
            setIsExploding={setIsExploding}
            setSeeResult={setSeeResult}
          />
        )}
        {!isExploding && !sectionComplete && !seeResult && (
          <>
            <Header
              questionNum={questionNum}
              count={
                questionList.filter((el) => el.Type == questionNum.Type).length
              }
            />
            <AssessmentBody
              spotLight={spotLight}
              setSpotLight={setSpotLight}
              currentSliderValue={currentSliderValue}
              desiredSliderValue={desiredSliderValue}
              questionNum={questionNum}
              questionIndex={questionIndex}
              handleBack={handleBack}
              handleNext={handleNext}
              handleCurrent={handleCurrent}
              handleDesired={handleDesired}
            />
          </>
        )}
        {seeResult && (
          <Results
            questionList={questionList}
            categories={location.state}
            setSeeResult={setSeeResult}
          />
        )}
      </div>
      {/* </SpotlightTour> */}
    </>
  );
}

export default Questionnaire;
