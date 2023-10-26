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
import Cloud from "./Cloud";
import NavBar from "../Navigation/NavBar";

// const words = wordFreq();

// type SpiralType = "archimedean" | "rectangular";

export default function WordCloud() {
  const routeParams = useParams();
  const [dataLoaded, setDataLoaded] = useState();
  const [words, setWords] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataIndex, setDataIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //   const [fontScale, setFontScale] = useState();
  //   const [fontSizeSetter, setFontSizeSetter] = useState();
  //   const [fixedValueGenerator, setFixedValueGenerator] = useState();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   console.log({ requestOptions });
  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-wordcloud/" + routeParams.tfid,
      requestOptions
    )
      .then((response) => {
        // console.log({ response });
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();

    console.log({ dataSet });
    return dataSet;
  }

  function filterCommonWords(str, commonWords) {
    // const commonWords = [
    //   "the",
    //   "that",
    //   "all",
    //   "for",
    //   "very" /* add more words here */,
    // ];
    const words = str.split(" ");
    const filteredWords = words.filter((word) => !commonWords.includes(word));
    return filteredWords.join(" ");
  }

  const commonWords = [
    "the",
    "and",
    "a",
    "an",
    "in",
    "of",
    "to",
    "that",
    "this",
    "it",
    "with",
    "for",
    "on",
    "at",
    "you",
    "can",
    "is",
    "it",
    "no",
    "they",
    "their",
    "they're",
    "are",
    "be",
    "They",
    "your",
    "Your",
    "you're",
    "You're",
  ];

  useEffect(() => {
    getData().then((data) => {
      // console.log({data})

      const tempWords = filterCommonWords(
        data.combinedResponses[0].text,
        commonWords
      );
      setCurrentQuestion(data.combinedResponses[0].question);
      setDataSet(data);
      //   console.log(words);
      setWords(tempWords);
      setDataLoaded(true);
    });
  }, []);

  function handleSlideIndex(num, num2) {
    if (num2 >= 0) {
      const tempWords = filterCommonWords(
        dataSet.combinedResponses[num2].text,
        commonWords
      );
      setCurrentQuestion(dataSet.combinedResponses[num2].question);
      setWords(tempWords);
      setDataIndex(num2);
      return;
    }
    if (dataIndex + num == dataSet.combinedResponses.length) return;
    if (dataIndex + num < 0) return;
    const tempWords = filterCommonWords(
      dataSet.combinedResponses[dataIndex + num].text,
      commonWords
    );
    setCurrentQuestion(dataSet.combinedResponses[dataIndex + num].question);
    setWords(tempWords);
    setDataIndex(dataIndex + num);
  }

  return (
    <>
      {" "}
      <NavBar></NavBar>
      <div
        onClick={() => handleSlideIndex(1)}
        className="cursor-pointer z-30 w-10 h-20 text-neutral-100 text-[34pt] right-3 px-2 pt-2 bottom-8 md:bottom-[40%]  absolute bg-[#878787]"
      >
        {">"}
      </div>
      <div
        onClick={() => handleSlideIndex(-1)}
        className="cursor-pointer z-30 w-10 h-20 text-neutral-100 text-[34pt] left-3 px-2 pt-2 bottom-8 md:bottom-[40%]  absolute bg-[#878787]"
      >
        {"<"}
      </div>
      <div className="flex flex-col items-center mt-4 md:my-14 text-lg md:text-3xl  text-[#09497B] animate-fade animate-once animate-duration-[800ms] animate-ease-linear">
        {dataSet && (
          <div className="underline decoration-[#FDB517] p-3">
            {currentQuestion}
          </div>
        )}
        {words && (
          <>
            <div className="hidden md:flex h-full w-full wordcloud place-self-center flex justify-center my-14 ">
              <Cloud width={800} height={500} textString={words} />
            </div>
            <div className=" md:hidden h-full w-full wordcloud place-self-center flex justify-center my-4 ">
              <Cloud width={300} height={400} textString={words} />
            </div>
          </>
        )}

        <div className="flex">
          {" "}
          {dataIndex >= 0 &&
            dataSet &&
            dataSet.combinedResponses.map((el, index) => {
              return (
                <div
                  onClick={() => handleSlideIndex(0, index)}
                  key={`slide_${index}`}
                  className={
                    " w-5 h-5 m-2 rounded-full bg-[#999999]" +
                    ((index != dataIndex && " bg-opacity-25") || "")
                  }
                ></div>
              );
            })}
        </div>
      </div>
    </>
  );
}
