import { useState, useEffect } from "react";
import "../../index.css";
import AnimatedRadialSunburstChart from "./Radials";
import Sliders from "./Sliders";
import Button from "@mui/material/Button";
import RechartBar from "./RechartTest";
import questionBank from "../../modules/question-bank";
import logo from "../../assets/GreyLogo.png";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import ConfettiExplosion from "react-confetti-explosion";
import Fireworks from "@fireworks-js/react";

const initialData = [
  {
    name: "A",
    x: 0,
    fill: "#09497B",
  },
  {
    name: "B",
    x: 0,
    fill: "#FDB517",
  },
  {
    name: "C",
    x: 5,
    fill: "white",
  },
];

function Questionnaire() {
  const location = useLocation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [desiredSlide, setDesiredSlide] = useState(0);
  const [questions, setQuestions] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [questionIndex, setQuestionIndex] = useState(0);
  //   const [selections, setSelections] = useState(state);
  const [questionNum, setQuestionNum] = useState(
    []
    // questionBank[questions[questionIndex]]
  );
  const [questionList, setQuestionList] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [isFireworks, setIsFireworks] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);

  // useEffect(() => {}, [questionIndex]);

  useEffect(() => {
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
      setIsExploding(true);
      // setTimeout(document.getElementById("my_modal_1").showModal(), 1000);
      return;
    }
    if (
      questionList[questionIndex].Type != questionList[questionIndex + 1].Type
    ) {
      console.log("New Category");
      setIsFireworks(true);
      setSectionComplete(true);
      setTimeout(() => setIsFireworks(false), 3000);
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
    let currentScore = questionBank[questions[questionIndex - 1]];
    console.log({ currentScore });
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
      {/* <div
        className={
          "h-2 " +
          ((progress && "w-[" + progress * 100 + "%]") || "w-0") +
          " bg-[#FDB517]"
        }
      ></div> */}
      <div className="h-screen text-primary flex flex-col">
        {isFireworks && (
          <Fireworks
            options={{ opacity: 0.5 }}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",

              zIndex: "50",
            }}
          />
        )}
        {sectionComplete && (
          <div className="absolute z-40 w-screen h-screen bg-white  text-center ">
            <div className="text-3xl md:text-[60pt] mt-[20vh] animate-jump-in animate-duration-700 animate-delay-500">
              Good Work!
            </div>

            <div className="mt-20 text-lg md:text-xl animate-jump-in animate-duration-700 animate-delay-1000">
              You completed a section
            </div>

            <div className="animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
              <Button
                style={{ minWidth: "120px", margin: "20px" }}
                variant="outlined"
                size="large"
              >
                SEE RESULTS
              </Button>
              <Button
                style={{ minWidth: "120px", margin: "20px" }}
                variant="outlined"
                size="large"
                onClick={() => setSectionComplete(false)}
              >
                KEEP GOING
              </Button>
            </div>
          </div>
        )}
        {isExploding && (
          <>
            <div className="absolute z-50 left-[50vw] top-[60vh] ">
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={250}
                width={1600}
              ></ConfettiExplosion>
            </div>
            {/* <div className="absolute w-screen h-[150vh] bg-white z-40"></div> */}
            <div className="text-[30pt] md:text-[60pt] place-self-center mt-[20vh] animate-jump-in animate-duration-700 animate-delay-500">
              Great Job!
            </div>
            <div className="text-xl md:text-3xl mt-4 place-self-center  animate-jump-in animate-duration-700 animate-delay-1000">
              {questionIndex + 1 == questionList.length &&
                "You answered all the questions."}
            </div>
            <div className="text-md md:text-xl place-self-center mt-10 animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
              {questionIndex + 1 == questionList.length &&
                "Click below to see your results."}
            </div>
            <div className="w-[150px] place-self-center mt-24 animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
              <Button variant="outlined" size="large">
                See Results
              </Button>
            </div>
          </>
        )}
        {!isExploding && !isFireworks && (
          <>
            <header>
              <h1 className="pt-2 pl-2 md:p-6 md:pl-40 text-xl md:text-3xl font-bold">
                My Assessment
              </h1>
              <div className=" divider w-40 ml-6 md:ml-40"></div>
              <h2 className="text-lg md:text-xl font-light pl-8 md:pl-0 md:ml-40 md:pl-2 -mt-5 md:mt-0 bg-slate-100 md:bg-white">
                {questionNum.Type}
              </h2>
            </header>
            <div className="md:ml-40 md:bg-[#bde1f7] w-fit p-4">
              <div className="md:mt-2  md:-mb-1 md:ml-4 font-bold text-slate-600 text-sm md:text-md">
                Question {questionNum.Number} of {questionNum.Of}
              </div>
              <h3 className=" font-bold text-lg md:text-2xl">
                {questionNum.Dimension}
              </h3>
              {/* <div className="md:hidden divider"></div> */}
            </div>
            <div className="w-1/4 hidden md:flex text-xs md:-ml-5 md:-mb-5 mt-3 font-bold">
              <div className="ml-40 flex items-center pl-5 py-4">
                <div className="w-[10px] bg-[#09497B] h-[10px] rounded-full mr-2"></div>
                Current
              </div>
              <div className="ml-5 flex items-center">
                <div className="w-[10px] bg-[#FDB517] h-[10px] rounded-full mr-2"></div>
                Desired
              </div>
            </div>
            <div className="md:hidden p-1 relative mb-2 px-4 mb-8 mt-4">
              <div className="absolute -mt-5 text-sm">
                {currentSlide == 1 && questionNum.Response_1}
                {currentSlide == 2 && questionNum.Response_2}
                {currentSlide == 3 && questionNum.Response_3}
                {currentSlide == 4 && questionNum.Response_4}
                {currentSlide == 5 && questionNum.Response_5}
              </div>
            </div>
            <div className="mt-5 md:flex">
              <div className="md:-mr-10 z-20">
                <Sliders
                  handleCurrent={handleCurrent}
                  currentSlide={currentSlide}
                  handleDesired={handleDesired}
                  desiredSlide={desiredSlide}
                ></Sliders>
              </div>
              <div className="md:hidden p-1 relative -mt-4 px-4 text-sm">
                <div className="absolute">
                  {desiredSlide == 1 && questionNum.Response_1}
                  {desiredSlide == 2 && questionNum.Response_2}
                  {desiredSlide == 3 && questionNum.Response_3}
                  {desiredSlide == 4 && questionNum.Response_4}
                  {desiredSlide == 5 && questionNum.Response_5}
                </div>
              </div>
              <div className="hidden display h-80 md:flex flex-row flex-row-reverse md:flex-col justify-between -ml-14">
                <div>Level 5</div>
                <div>Level 4</div>
                <div>Level 3</div>
                <div>Level 2</div>
                <div>Level 1</div>
                <div></div>
              </div>
              <div className="hidden h-80 flex flex-col md:flex justify-between ml-10 text-slate-700 text-xs md:w-1/3">
                <div
                  className={
                    "p-1 " +
                    ((currentSlide == 5 && "outline outline-[#09497B] ") ||
                      "") +
                    (desiredSlide == 5 && "ring ring-inset ring-[#FDB517]")
                  }
                >
                  {questionNum.Response_5}
                </div>

                <div
                  className={
                    "p-1 " +
                    ((currentSlide == 4 && "outline outline-[#09497B] ") ||
                      "") +
                    (desiredSlide == 4 && "ring ring-inset ring-[#FDB517]")
                  }
                >
                  {questionNum.Response_4}
                </div>
                <div
                  className={
                    "p-1 " +
                    ((currentSlide == 3 && "outline outline-[#09497B] ") ||
                      "") +
                    (desiredSlide == 3 && "ring ring-inset ring-[#FDB517]")
                  }
                >
                  {questionNum.Response_3}
                </div>
                <div
                  className={
                    "p-1 " +
                    ((currentSlide == 2 && "outline outline-[#09497B] ") ||
                      "") +
                    (desiredSlide == 2 && "ring ring-inset ring-[#FDB517]")
                  }
                >
                  {questionNum.Response_2}
                </div>
                <div
                  className={
                    "p-1 " +
                    ((currentSlide == 1 && "outline outline-[#09497B] ") ||
                      "") +
                    (desiredSlide == 1 && "ring ring-inset ring-[#FDB517]")
                  }
                >
                  {questionNum.Response_1}
                </div>
                <div></div>
              </div>
              <div className="md:-mt-24 -mt-18 md:flex md:justify-center relative -z-10">
                <RechartBar
                  currentSlide={currentSlide}
                  desiredSlide={desiredSlide}
                ></RechartBar>
              </div>
            </div>
            <div className="w-screen flex -mt-80 md:mt-0 justify-between md:justify-center ">
              <div className="p-2">
                {questionIndex > 0 && (
                  <Button variant="outlined" size="large" onClick={handleBack}>
                    BACK
                  </Button>
                )}
                {questionIndex == 0 && (
                  <Button variant="outlined" size="large" disabled>
                    BACK
                  </Button>
                )}
              </div>
              <div className="p-2">
                {currentSlide != 0 && desiredSlide != 0 && (
                  <Button variant="outlined" size="large" onClick={handleNext}>
                    NEXT
                  </Button>
                )}
                {(currentSlide == 0 || desiredSlide == 0) && (
                  <Button variant="outlined" size="large" disabled>
                    NEXT
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* <div className="mt-28">
        <Diamond></Diamond>
      </div> */}
    </>
  );
}

export default Questionnaire;
