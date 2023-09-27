import { useState } from "react";
import Ranges from "../Ranges";
import "../index.css";
import logo from "../assets/GreyLogo.png";
import AnimatedRadialSunburstChart from "./Radials";
import Sliders from "./Sliders";
import Button from "@mui/material/Button";
import RechartBar from "./RechartTest";
import questionBank from "../modules/question-bank";

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

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [desiredSlide, setDesiredSlide] = useState(0);
  const [questions, setQuestions] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNum, setQuestionNum] = useState(
    questionBank[questions[questionIndex]]
  );

  function handleCurrent(x) {
    setCurrentSlide(Number(x));
    // console.log({ x });
  }

  function handleDesired(y) {
    setDesiredSlide(Number(y));
    // console.log({ y });
  }

  function handleNext() {
    setCurrentSlide(0);
    setDesiredSlide(0);
    setQuestionNum(questionBank[questions[questionIndex + 1]]);
    setQuestionIndex((prev) => prev + 1);

    // console.log(questionNum);
  }

  return (
    <>
      <div className="h-screen text-primary flex flex-col">
        <div className="h-[60px] md:h-[100px] w-screen bg-[#878787]">
          <img src={logo} alt="" className="h-[40px] md:h-[70px] mt-3 ml-5" />
        </div>
        <header>
          <h1 className="pt-2 pl-2 md:p-6 md:pl-40 text-xl md:text-3xl font-bold">
            My Assessment
          </h1>
          <div className="divider w-40 ml-6 md:ml-40"></div>
          <h2 className="text-lg md:text-xl font-light pl-8 md:pl-0 md:ml-40 md:pl-2 -mt-5 md:mt-0 bg-slate-100 md:bg-white">
            {questionNum.Type}
          </h2>
        </header>
        <div className="md:ml-40 md:bg-[#bde1f7] w-fit p-4">
          <div className="mt-2  -mb-1 ml-4 font-bold text-slate-600 text-sm md:text-md">
            Question {questionNum.Number} of {questionNum.Of}
          </div>
          <h3 className=" font-bold text-lg md:text-2xl">
            {questionNum.Dimension}
          </h3>
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
        <div className="mt-5 md:flex">
          <div className="md:-mr-10 z-20">
            <Sliders
              handleCurrent={handleCurrent}
              currentSlide={currentSlide}
              handleDesired={handleDesired}
              desiredSlide={desiredSlide}
            ></Sliders>
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
            <div>{questionNum.Response_5}</div>
            <div>{questionNum.Response_4}</div>
            <div>{questionNum.Response_3}</div>
            <div>{questionNum.Response_2}</div>
            <div>{questionNum.Response_1}</div>
            <div></div>
          </div>
          <div className="md:-mt-24 -mt-24 md:flex md:justify-center relative -z-10">
            <RechartBar
              currentSlide={currentSlide}
              desiredSlide={desiredSlide}
            ></RechartBar>
          </div>
        </div>
        <div className="w-screen flex justify-center">
          <div className="p-2">
            <Button variant="outlined" size="large">
              BACK
            </Button>
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
      </div>
    </>
  );
}

export default App;
