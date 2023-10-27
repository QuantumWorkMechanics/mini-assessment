import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cloud from "./Cloud";
import NavBar from "../Navigation/NavBar";
import LoadSpinner from "../Utils.jsx/LoadSpinner";

export default function WordCloud() {
  const routeParams = useParams();
  const [dataLoaded, setDataLoaded] = useState();
  const [words, setWords] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataIndex, setDataIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

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

  useEffect(() => {
    getData().then((data) => {
      // console.log({data})

      const tempWords = data.responseArr[0].text;

      setCurrentQuestion(data.responseArr[0].question);
      setDataSet(data);
      //   console.log(words);
      if (!dataLoaded) setWords(tempWords);
      setDataLoaded(true);
    });
  }, []);

  function handleSlideIndex(num, num2) {
    if (num2 >= 0) {
      const tempWords = dataSet.responseArr[num2].text;

      setCurrentQuestion(dataSet.responseArr[num2].question);
      setWords(tempWords);
      setDataIndex(num2);
      return;
    }
    if (dataIndex + num == dataSet.responseArr.length) return;
    if (dataIndex + num < 0) return;
    const tempWords = dataSet.responseArr[dataIndex + num].text;

    setCurrentQuestion(dataSet.responseArr[dataIndex + num].question);
    setWords(tempWords);
    setDataIndex(dataIndex + num);
  }

  return (
    <>
      <div className="-mt-3">
        <NavBar></NavBar>
      </div>
      <div
        onClick={() => handleSlideIndex(1)}
        className="cursor-pointer z-30 w-10 h-20 text-neutral-100 text-[34pt] right-3 px-2 pt-2 max-sm:bottom-8 md:top-96  absolute bg-[#878787]"
      >
        {">"}
      </div>
      <div
        onClick={() => handleSlideIndex(-1)}
        className="cursor-pointer z-30 w-10 h-20 text-neutral-100 text-[34pt] left-3 px-2 pt-2 max-sm:bottom-8 md:top-96  absolute bg-[#878787]"
      >
        {"<"}
      </div>
      <div className="flex flex-col items-center mt-4 md:my-14 text-lg md:text-[30pt]  text-[#09497B] animate-fade animate-once animate-duration-[800ms] animate-ease-linear">
        {!dataLoaded && (
          <div className="mt-[20%] h-20 w-20">
            <LoadSpinner />
          </div>
        )}
        {dataSet && (
          <>
            <div className=" decoration-[#FDB517] p-3 text-center">
              {currentQuestion}
            </div>
            <div className="divider h-2 bg-[#FDB517] rounded w-[50%] place-self-center"></div>
          </>
        )}
        {words && (
          <>
            <div className=" flex h-full w-full wordcloud place-self-center flex justify-center my-14 ">
              <Cloud
                width={window.innerWidth > 640 ? 800 : 300}
                height={window.innerWidth > 640 ? 500 : 400}
                textString={words}
              />
            </div>

            {/* <div className=" md:hidden h-full w-full wordcloud place-self-center flex justify-center my-4 ">
              <Cloud width={300} height={400} textString={words} />
            </div> */}
          </>
        )}

        <div className="flex">
          {" "}
          {dataIndex >= 0 &&
            dataSet &&
            dataSet.responseArr.map((el, index) => {
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
