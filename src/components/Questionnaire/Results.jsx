import React, { useState, useEffect } from "react";

import RechartBar from "./RechartTest";
import ResultComponent from "./ResultComponent";
import Header from "./Header";

export default function Results({ questionList, categories }) {
  const [results, setResults] = useState({});

  function findAvg(location, type) {
    let loc = questionList.filter((el) => el.DiamondLoc == location);
    console.log({ loc });
    let total = loc.reduce(function (accumulator, answer) {
      return (
        accumulator + (type == "current" ? answer.Current : answer.Desired)
      );
    }, 0);
    console.log({ total });
    return total / loc[0].Of;
  }

  // useEffect(() => {
  //     let tempResults =
  // }, []);

  return (
    <div className="bg-webs">
      {" "}
      <header>
        <h1 className="pt-2 pl-2 pl-14 md:p-6 md:pl-40 text-xl md:text-3xl font-bold flex ">
          My Results
        </h1>{" "}
        <div className="divider w-1/3 md:w-1/4 pl-16 md:pl-44"></div>
      </header>
      {categories.topLeft && (
        <ResultComponent component={"topLeft"} questionList={questionList} />
      )}
      {categories.topRight && (
        <ResultComponent component={"topRight"} questionList={questionList} />
      )}
      {categories.rightCircle && (
        <ResultComponent
          component={"rightCircle"}
          questionList={questionList}
        />
      )}
      {categories.leftCircle && (
        <ResultComponent component={"leftCircle"} questionList={questionList} />
      )}
      {categories.middleCircle && (
        <ResultComponent
          component={"middleCircle"}
          questionList={questionList}
        />
      )}
      {categories.bottomCircle && (
        <ResultComponent
          component={"bottomCircle"}
          questionList={questionList}
        />
      )}
    </div>
  );
}
