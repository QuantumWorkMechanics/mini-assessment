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

function Questionnaire() {
  const location = useLocation();

  const [currentSliderValue, setCurrentSliderVal] = useState(0);
  const [desiredSliderValue, setDesiredSliderVal] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNum, setQuestionNum] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  // const [isOpen, setOpen] = useState(true);
  const [seeResult, setSeeResult] = useState(false);
  const [spotLight, setSpotLight] = useState(1);
  const [tfHidden, settfHidden] = useState({});

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

    // categoryList.map((selectedCategory) => {
    //   if (location.state[selectedCategory]) {
    //     tempList = tempList.concat(
    //       questionBank.filter((question) => {
    //         const type = categoriesList.filter((cat) => cat.DiamondLoc == selectedCategory)[0].Dimension;
    //         return questionBank.filter((q) => q.Dimension == type);
    //       })
    //     );
    //   }
    // });
    tempList = tempList.sort((a, b) => {
      return a.Number - b.Number;
    });
    console.log(tempList);

    setQuestionList(tempList);
    setQuestionNum(tempList[0]);
    // setTimeout(() => setOpen(false), 2500);
    // console.log(location.state);
  }, []);

  function handleSlider(sliderValue, sliderType) {
    console.log({ sliderValue, sliderType });
    // setCurrentSliderVal(Number(sliderValue));
    let temp = questionNum;
    temp[sliderType] = parseInt(sliderValue);
    if (sliderType == "Desired") {
      setDesiredSliderVal(parseInt(sliderValue));
    } else {
      setCurrentSliderVal(parseInt(sliderValue));
    }
    updateQuestionState(temp);
    // setQuestionNum(temp);
    // setQuestionList((prev) => {
    //   prev[questionIndex] = temp;
    //   let tempHidden = {};
    //   prev.map((el) => {
    //     if (el.fieldType == "Slider Field") {
    //       tempHidden[`q${el.Number}`] = `Current: ${el.Current}, Desired: ${el.Desired}`;
    //     } else {
    //       tempHidden[`q${el.Number}`] = el.selections.toString();
    //     }
    //   });
    //   settfHidden(tempHidden);
    //   console.log({ prev, tempHidden });
    //   return prev;
    // });
    // console.log(tfHidden);
    // console.log({ x });
    if (
      (sliderType == "Desired" && currentSliderValue > 0 && sliderValue >= currentSliderValue) |
      (sliderType == "Current" && sliderValue > 0 && sliderValue <= desiredSliderValue)
    ) {
      //  console.log("handling current");
      setTimeout(() => {
        handleNext();
      }, 900);
    }
  }
  function handleCurrent(sliderValue) {
    setDesiredSliderVal(Number(sliderValue));
    // console.log({ y });
    if (sliderValue > 0 && currentSliderValue < sliderValue && currentSliderValue > 0) {
      console.log("handling current");
      setTimeout(() => {
        handleNext();
      }, 900);
    }
  }

  function handleDesired(sliderValue) {
    setDesiredSliderVal(Number(sliderValue));
    // console.log({ y });
    if (sliderValue > 0 && currentSliderValue < sliderValue && currentSliderValue > 0) {
      console.log("handling current");
      setTimeout(() => {
        handleNext();
      }, 900);
    }
  }

  function handleSingleSelect(item) {
    let temp = { ...questionNum };
    temp.selections = item;
    updateQuestionState(temp);
    // setQuestionNum(temp);
    // setQuestionList((prev) => {
    //   prev[questionIndex] = temp;
    //   console.log(temp);
    //   let tempHidden = {};
    //   prev.map((el) => {
    //     if (el.fieldType == "Slider Field") {
    //       tempHidden[`q${el.Number}`] = `Current: ${el.Current}, Desired: ${el.Desired}`;
    //     } else {
    //       tempHidden[`q${el.Number}`] = el.selections.toString();
    //     }
    //   });
    //   console.log({ prev, tempHidden });
    //   settfHidden(tempHidden);
    //   return prev;
    // });
  }

  function handleMultiSelect(item) {
    let temp = { ...questionNum };
    let i = temp.selections.indexOf(item);
    console.log({ i });
    // if (i > -1) {
    //   temp.selections.splice(i, 1);
    //   console.log({ temp });
    // } else {
    //   temp.selections.push(item);
    //   console.log({ temp });
    // }
    // if (temp.selections.includes(item)) {
    //   temp.selections.splice(temp.selections.indexOf(item), 1);
    // } else {
    if (i < 0) {
      temp.selections.push(item);
    } else if (i > -1) {
      temp.selections = temp.selections.filter((x) => x != item);
    }
    updateQuestionState(temp);
    // console.log(temp.selections);
    // }
    // setQuestionNum(temp);
    // setQuestionList((prev) => {
    //   prev[questionIndex] = temp;
    //   console.log(temp);
    //   let tempHidden = {};
    //   prev.map((el) => {
    //     if (el.fieldType == "Slider Field") {
    //       tempHidden[`q${el.Number}`] = `Current: ${el.Current}, Desired: ${el.Desired}`;
    //     } else {
    //       tempHidden[`q${el.Number}`] = el.selections.toString();
    //     }
    //   });
    //   console.log({ prev, tempHidden });
    //   settfHidden(tempHidden);
    //   return prev;
    // });
    // console.log(temp);
  }

  function updateQuestionState(newState) {
    setQuestionNum(newState);
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
    if (questionIndex + 1 == questionList.length) {
      setProgress(1);
      let tempList = questionList;

      // tempList[questionIndex].Current = currentSliderValue;
      // tempList[questionIndex].Desired = desiredSliderValue;
      console.log(tempList);
      // setQuestionList(tempList);
      setIsExploding(true);
      // setTimeout(document.getElementById("my_modal_1").showModal(), 1000);
      return;
    }

    // if (questionList[questionIndex].Type != questionList[questionIndex + 1].Type) {
    //   setSectionComplete(true);
    // }
    // TODO clean up, this can all be one function that replaces qList[index] with questionNum... need to also update slider updating function
    let tempList = questionList;
    // questionList[questionIndex] = questionNum;
    // tempList[questionIndex].Current = currentSliderValue;
    // tempList[questionIndex].Desired = desiredSliderValue;

    // tempList;
    setProgress((questionIndex + 1) / questionList.length);
    // setQuestionList(tempList);
    setCurrentSliderVal(tempList[questionIndex + 1].Current);
    setDesiredSliderVal(tempList[questionIndex + 1].Desired);
    setQuestionNum(questionList[questionIndex + 1]);
    // console.log(questionList[questionIndex + 1]);
    setQuestionIndex((prev) => prev + 1);

    // console.log(questionNum);
  }

  function handleBack() {
    let tempList = questionList;
    // let currentScore = questionBank[questions[questionIndex - 1]];
    // console.log({ currentScore });
    setCurrentSliderVal(tempList[questionIndex - 1].Current);
    setDesiredSliderVal(tempList[questionIndex - 1].Desired);
    setQuestionNum(questionList[questionIndex - 1]);
    setQuestionIndex((prev) => prev - 1);
    // console.log(questionList[questionIndex - 1]);
    // console.log(questionList);
  }

  return (
    <>
      {!seeResult && (
        <div className="-mt-2.5 fixed">
          <progress className="progress progress-secondary w-screen" value={progress * 100} max="100"></progress>
        </div>
      )}
      {!seeResult && (
        <div className="h-screen text-primary flex ">
          {sectionComplete && <SectionComplete setSectionComplete={setSectionComplete} setSeeResult={setSeeResult} />}
          {isExploding && (
            <div className="flex flex-col justify-center items-center w-screen">
              <AllSectionsComplete setIsExploding={setIsExploding} setSeeResult={setSeeResult} tfHidden={tfHidden} />
            </div>
          )}
          {!isExploding && !sectionComplete && !seeResult && questionNum.fieldType == "Slider Field" && (
            <div>
              <Header questionNum={questionNum} count={questionList.length} questionIndex={questionIndex} />
              {questionNum.fieldType == "Slider Field" && (
                <SliderSelect
                  spotLight={spotLight}
                  setSpotLight={setSpotLight}
                  currentSliderValue={currentSliderValue}
                  desiredSliderValue={desiredSliderValue}
                  handleSlider={handleSlider}
                  questionNum={questionNum}
                  questionIndex={questionIndex}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  handleCurrent={handleCurrent}
                  handleDesired={handleDesired}
                />
              )}
            </div>
          )}
          {!isExploding && !sectionComplete && !seeResult && questionNum.fieldType == "Multi-Select" && (
            <div className="w-1/2">
              <Header questionNum={questionNum} count={questionList.length} questionIndex={questionIndex} />
              <MultiSelect handleNext={handleNext} handleMultiSelect={handleMultiSelect} questionNum={questionNum} />
            </div>
          )}
          {!isExploding && !sectionComplete && !seeResult && questionNum.fieldType == "Single Select" && (
            <div className="w-1/2">
              <Header questionNum={questionNum} count={questionList.length} />
              <SingleSelect handleNext={handleNext} handleSingleSelect={handleSingleSelect} questionNum={questionNum} />
            </div>
          )}
          {!isExploding && !sectionComplete && !seeResult && questionNum.fieldType == "Multi-Select" && (
            <div className="min-w-1/2 mt-2">
              <img src={img7} className="h-screen object-cover fixed" alt="" />
            </div>
          )}
        </div>
      )}
      {seeResult && (
        // <PopupButton
        //   hidden={tfHidden}
        //   //   onSubmit={() => handleReady()}
        //   id="JU5OyH4T"
        //   style={{ fontSize: 20 }}
        //   className="my-button btn btn-outline text-sm md:text-[#09497B]"
        // >
        //   READY
        // </PopupButton>
        <div className=" w-screen h-screen flex flex-col text-center pt-20">Coming Soon</div>
        // <div className="">
        //   <Results questionList={questionList} categories={location.state} setSeeResult={setSeeResult} />
        // </div>
      )}
    </>
  );
}

export default Questionnaire;
