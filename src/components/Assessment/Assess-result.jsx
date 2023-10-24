import React, { useState, useEffect } from "react";
import {
  RadarChart,
  Legend,
  PolarAngleAxis,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { orderBy } from "lodash";
import { useParams } from "react-router-dom";
import logo from "../../assets/GreyLogo.png";
import NavBar from "../Navigation/NavBar";
import Fade from "react-reveal/Fade";
import ThreeBarChart from "./Assessment-result-components/ThreeBar";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import ConfettiExplosion from "react-confetti-explosion";
import RadarGraph from "./Assessment-result-components/Radar";
import Dashboard from "./Dashboard/Dashboard";

export default function FullDiagnosticResults() {
  const [rawForm, setRawForm] = useState();
  const [typeForm, setTypeForm] = useState();
  const [categories, setCategories] = useState();
  const routeParams = useParams();
  const [scrollNum, setScrollNum] = useState(0);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  const [personas, setPersonas] = useState();
  const [showDashboard, setShowDashBoard] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fullForm, setFullForm] = useState();
  const [counts, setCounts] = useState();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   console.log({ requestOptions });
  //   const mimir_url = "https://mimir-production.up.railway.app/";
  const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-responses/" + routeParams.tfid,
      requestOptions
    )
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();

    console.log({ dataSet });
    return dataSet;
  }

  useEffect(() => {
    getData().then((data) => {
      let tempForm = orderBy(data.fullForm, [{ AllAvgScore: Number }], "desc");
      //   orderBy(tempForm, "AllAvgScore", "asc");
      tempForm.sort((a, b) => (a.AllAvgScore > b.AllAvgScore ? 1 : -1));
      console.log({ tempForm });
      let tempCategories = [];
      data.scoredCategories.map((category) => {
        let tempQuestions = tempForm.filter((question) => {
          //   console.log(question.category);
          //   console.log(category.category);
          return question.category == category.category;
        });
        // console.log({ tempQuestions });
        let tempCategory = {
          category: category.category,
          score: category.score,
          questions: tempQuestions,
        };
        tempCategories = [...tempCategories, tempCategory];
      });
      let tempSlides = ["top"];
      tempCategories.map((category, index) => {
        tempSlides = [
          ...tempSlides,
          `${category.category}_${index}`,
          `${category.category}_${index}_2`,
        ];
        // console.log({ tempSlides });
      });
      console.log({ tempForm });
      setSlides(tempSlides);
      //   console.log({ tempCategories });
      setTypeForm(tempForm);
      setCurrentSlide("top");
      setCategories(tempCategories);
      setRawForm(data.typeForm);
      setFullForm(data.fullForm);
      console.log(data.personaResponseCounts);
      setPersonas(data.scoredPersonas);
      setCounts(data.personaResponseCounts);
      setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    setCurrentSlide(slides[scrollNum]);
  }, [scrollNum]);

  //   window.addEventListener("scroll", (eventTarget) => {
  //     if (Math.floor(window.scrollY / 700) != scrollNum)
  //       setScrollNum(Math.floor(window.scrollY / 700));
  //     console.log({ scrollNum });
  //   });

  return (
    <>
      {currentSlide && showDashboard == false && currentSlide == "top" && (
        <div className="z-20 absolute h-[5%] ml-[2.5%] rounded-t-lg bg-white bottom-0 w-[95%]"></div>
      )}
      {!showDashboard && (
        <div className=" z-30 rounded md:w-8 h-14 bg-[#878787] bg-opacity-30 absolute right-6 bottom-24 text-white text-3xl flex justify-center items-center animate-bounce animate-twice animate-duration-500 animate-ease-linear animate-normal">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="120"
              version="1"
              viewBox="0 0 900 900"
            >
              <g fill="white">
                <path
                  d="M4385 7851c-36-9-67-26-120-66-22-16-386-377-810-801-582-582-777-784-800-825-28-51-29-60-29-169 0-108 1-118 29-168 37-67 100-130 167-167 50-28 60-29 168-29 109 0 118 1 169 29 40 22 215 191 687 663 348 347 638 632 644 632s298-286 647-636c387-386 652-644 677-657 146-77 312-55 433 56 128 118 157 293 74 455-15 29-273 294-794 815-747 747-812 810-886 851-38 21-200 32-256 17zM2890 3356c-64-18-106-42-157-89-128-118-157-293-75-453 22-42 1526-1558 1607-1619 87-66 101-70 225-70s137 4 225 70c51 38 1529 1516 1570 1570 55 71 70 119 70 220 0 69-5 103-20 136-41 93-115 170-204 211-36 16-68 21-141 22-106 1-153-13-223-67-21-16-314-306-652-643-337-338-618-614-625-614-6 0-298 286-647 636-387 386-652 644-677 657-84 44-189 57-276 33z"
                  transform="matrix(.1 0 0 -.1 0 900)"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      )}

      <ReactScrollWheelHandler
        upHandler={(e) => {
          setScrollNum((prev) =>
            !showDashboard && prev > 0 ? prev - 1 : prev
          );
          //   console.log({ scrollNum });
        }}
        downHandler={(e) => {
          setScrollNum((prev) =>
            !showDashboard && prev < slides.length ? prev + 1 : prev
          );
          //   console.log({ scrollNum });
          //   console.log(slides[scrollNum]);
        }}
      >
        <div className="w-screen h-auto bg-neutral-200">
          <div className="sticky top-0 -mt-3 z-50">
            <NavBar />
          </div>
          {showDashboard && dataLoaded && typeForm && typeForm[0] && counts && (
            <Dashboard
              personas={personas}
              categories={categories}
              typeForm={typeForm}
              dataLoaded={dataLoaded}
              personaResponseCounts={counts}
              rawForm={rawForm}
            />
          )}
          {categories && typeForm && rawForm && (
            <div className="flex justify-center items-center mt-10 sticky bottom-0">
              {currentSlide && !showDashboard && currentSlide == "top" && (
                <>
                  <div className="py-5 bg-white rounded-lg w-[95%] h-[70vh] px-8 animate-fade-up animate-once animate-duration-300 animate-ease-linear shadow-2xl">
                    <h1 className="text-lg md:text-lg text-[#09497B] ml-4 ">
                      {rawForm.title}
                    </h1>
                    <div className="divider">
                      <span>Overview</span>
                    </div>
                    <div className="w-[100%] h-[400px] px-14 sticky top-0 flex">
                      <div className="w-[50%]">
                        <ResponsiveContainer>
                          <RadarChart
                            outerRadius={90}
                            width={730}
                            height={250}
                            data={categories}
                          >
                            <PolarGrid />
                            <PolarAngleAxis
                              dataKey="category"
                              tick={{ fontSize: 12 }}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 5]} />
                            <Radar
                              name="All Respondents"
                              dataKey="score"
                              stroke="#09497B"
                              fill="#0E6AAD"
                              fillOpacity={0.6}
                            />
                            <Legend />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      {personas && (
                        <div className="w-[50%]">
                          <RadarGraph personas={personas} />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="hyphens-auto text-justify">
                {categories &&
                  categories[0] &&
                  categories.map((category, index) => {
                    let bottomQuestions = category.questions.slice(0, 3);
                    let topQuestions = category.questions.slice(-3);
                    let tempSlides = [
                      ...slides,
                      `${category.category}_${index}`,
                      `${category.category}_${index}_2`,
                    ];
                    // setSlides(tempSlides);
                    // console.log({ topQuestions, bottomQuestions });

                    //   console.log({ topQuestions, bottomQuestions });
                    return (
                      <div
                        className="w=screen"
                        key={`${category.category}_${index}`}
                      >
                        {index * 2 > scrollNum &&
                          currentSlide == `${category.category}_${index}_2` && (
                            <>
                              <div className="divider w-1/3 ml-14"></div>
                              <div className=" md:text-3xl ml-14 my-4">
                                {category.category}
                              </div>
                            </>
                          )}
                        {/* <div className="divider w-1/3 ml-14"></div> */}
                        {currentSlide == `${category.category}_${index}` && (
                          <div className="w-[95vw] py-5 h-[80vh] sticky top-0 bottom-0 bg-white rounded-lg shadow-2xl animate-fade-up animate-once animate-duration-300 animate-ease-linear">
                            <div className=" md:text-3xl ml-14 my-4">
                              {category.category}
                            </div>
                            <ThreeBarChart
                              dataArr={topQuestions}
                              dataKey={"AllAvgScore"}
                              label="title"
                              title="Top Scoring"
                              // fill="#FDB517
                            />
                          </div>
                        )}

                        {/* <div className="divider w-32 ml-[400px] "></div> */}
                        {currentSlide == `${category.category}_${index}_2` && (
                          <div className="w-[95vw] py-5 h-[80vh] sticky top-0 bottom-0 bg-white rounded-lg shadow-2xl animate-fade-up animate-once animate-duration-300 animate-ease-linear">
                            <div className=" md:text-3xl ml-14 my-4">
                              {category.category}
                            </div>
                            <div className="">
                              <ThreeBarChart
                                dataArr={bottomQuestions}
                                dataKey={"AllAvgScore"}
                                label="title"
                                title="Low Scoring"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {currentSlide != "top" &&
            scrollNum == slides.length &&
            scrollNum > 1 && (
              <div className="flex flex-col justify-center items-center text-[#09497B]">
                <div className="m-10 text-[50pt] animate-fade-up animate-once animate-duration-800 animate-delay-500 animate-ease-linear animate-normal">
                  All done!
                </div>
                <div className="text-[30pt] animate-fade-up animate-once animate-duration-800 animate-delay-1000 animate-ease-linear animate-normal">
                  Thank you!
                </div>
                {/* <div className="absolute z-50 left-[50vw] top-[60vh] ">
                  <ConfettiExplosion
                    force={0.8}
                    duration={3000}
                    particleCount={250}
                    width={1600}
                  ></ConfettiExplosion>
                </div> */}
              </div>
            )}
        </div>
      </ReactScrollWheelHandler>
    </>
  );
}
