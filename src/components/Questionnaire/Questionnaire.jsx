import { useState, useEffect } from "react";
import "../../index.css";
import questionBank from "../../modules/question-bank";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { SpotlightTour, useSpotlight } from "react-spotlight-tour";
import Spotlight from "react-spotlight-tour/spotlight";
import SectionComplete from "./SectionCompleted";
import AllSectionsComplete from "./AllSectionsComplete";
import Header from "./Header";
import AssessmentBody from "./AssessmentBody";
import Results from "./Results/Results";

function Questionnaire() {
  const location = useLocation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [desiredSlide, setDesiredSlide] = useState(0);
  // const [questions, setQuestions] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [questionIndex, setQuestionIndex] = useState(0);
  //   const [selections, setSelections] = useState(state);
  const [questionNum, setQuestionNum] = useState(
    []
    // questionBank[questions[questionIndex]]
  );
  const [questionList, setQuestionList] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);

  const [isOpen, setOpen] = useState(true);
  const [seeResult, setSeeResult] = useState(false);

  // useEffect(() => {}, [questionIndex]);

  useEffect(() => {
    window.matchMedia("(min-width: 768px)").matches
      ? window.scrollTo({ top: 112, behavior: "smooth" })
      : window.scrollTo({ top: 72, behavior: "smooth" });
    let tempList = [];
    if (location.state.topLeft) {
      tempList = tempList.concat(
        questionBank.filter((component) => component.DiamondLoc == "topLeft")
      );
    }
    if (location.state.topRight) {
      tempList = tempList.concat(
        questionBank.filter((component) => component.DiamondLoc == "topRight")
      );
    }
    if (location.state.rightCircle) {
      tempList = tempList.concat(
        questionBank.filter(
          (component) => component.DiamondLoc == "rightCircle"
        )
      );
    }
    if (location.state.leftCircle) {
      tempList = tempList.concat(
        questionBank.filter((component) => component.DiamondLoc == "leftCircle")
      );
    }
    if (location.state.bottomCircle) {
      tempList = tempList.concat(
        questionBank.filter(
          (component) => component.DiamondLoc == "bottomCircle"
        )
      );
    }
    if (location.state.middleCircle) {
      tempList = tempList.concat(
        questionBank.filter(
          (component) => component.DiamondLoc == "middleCircle"
        )
      );
    }
    // console.log({ tempList });
    setQuestionList(tempList);
    setQuestionNum(tempList[0]);
    setTimeout(() => setOpen(false), 2500);
    // console.log(location.state);
  }, []);

  function handleCurrent(x) {
    setCurrentSlide(Number(x));
    // console.log({ x });
  }

  function handleDesired(y) {
    setDesiredSlide(Number(y));
    // console.log({ y });
  }

  function handleNext() {
    if (questionIndex + 1 == questionList.length) {
      setProgress(1);
      let tempList = questionList;
      tempList[questionIndex].Current = currentSlide;
      tempList[questionIndex].Desired = desiredSlide;
      setQuestionList(tempList);
      setIsExploding(true);
      // setTimeout(document.getElementById("my_modal_1").showModal(), 1000);
      return;
    }
    if (
      questionList[questionIndex].Type != questionList[questionIndex + 1].Type
    ) {
      console.log("New Category");
      // setIsFireworks(true);
      setSectionComplete(true);
      // setTimeout(() => setIsFireworks(false), 3000);
      // return;
    }
    let tempList = questionList;
    tempList[questionIndex].Current = currentSlide;
    tempList[questionIndex].Desired = desiredSlide;
    setProgress((questionIndex + 1) / questionList.length);
    setQuestionList(tempList);
    setCurrentSlide(tempList[questionIndex + 1].Current);
    setDesiredSlide(tempList[questionIndex + 1].Desired);
    setQuestionNum(questionList[questionIndex + 1]);
    setQuestionIndex((prev) => prev + 1);

    // console.log(questionNum);
  }

  function handleBack() {
    let tempList = questionList;
    // let currentScore = questionBank[questions[questionIndex - 1]];
    // console.log({ currentScore });
    setCurrentSlide(tempList[questionIndex - 1].Current);
    setDesiredSlide(tempList[questionIndex - 1].Desired);
    setQuestionNum(questionList[questionIndex - 1]);
    setQuestionIndex((prev) => prev - 1);

    console.log(questionList);
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="-mt-2.5">
        <progress
          className="progress progress-secondary w-screen"
          value={progress * 100}
          max="100"
        ></progress>
      </div>

      <SpotlightTour
        open={isOpen}
        onClose={() => setOpen(false)}
        Spotlight={Spotlight}
      >
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
              <Header questionNum={questionNum} />
              <AssessmentBody
                currentSlide={currentSlide}
                desiredSlide={desiredSlide}
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
            <Results questionList={questionList} categories={location.state} />
          )}
        </div>
      </SpotlightTour>
    </>
  );
}

export default Questionnaire;
