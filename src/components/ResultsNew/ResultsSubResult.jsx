import Divider from "../Utils.jsx/Divider";
import categoryList from "../Utils.jsx/CategoryList";
import { useState } from "react";
import SubBarGraph from "../Results/subBarGraph";

const DIMENSION_TEXT = {
  "Extended Workforce": {
    title: "Extended Workforce",
    display: "Extended Workforce",
  },
  "Learning & Development System": {
    title: "Learning & Development",
    display: "learning and development",
  },
  "Human Resources Information System & Enterprise Platforms": {
    title: "Human Resources Information System & Enterprise Platforms",
    display: "HRIS",
  },
  "Talent Acquisition System": {
    title: "Talent Acquisition",
    display: "talent acquisition",
  },
  "Talent Management System": {
    title: "Talent Management",
    display: "talent management",
  },
  "Workforce Planning System": {
    title: "Workforce Planning",
    display: "Workforce Strategy, Insights and Planning",
  },
  "Performance Management System": {
    title: "Performance Management",
    display: "performance management",
  },
};

function ResultsSubResult({ result }) {
  console.log(result);

  return (
    <>
      <div className="flex flex-col gap-8">
        <Divider text={result.dimension}> </Divider>
        <div className="px-40">
          The bellow recommendations and Benefits are tailored for to enhance your {result.dimension}. These strategies are designed to help your
          organization optimize {DIMENSION_TEXT[result.dimension].display}, improve skills management, and support strategic business objectives.
        </div>
        <div id={result.dimension + "_bar"} className="w-[250px] h-[250px] md:h-[200px] md:w-[400px] mt-20 flex flex-col place-self-center">
          <SubBarGraph
            dataSet={[
              {
                currentName: "Current",
                currAvg: result.current,
                currLabel: result.currentLevel,
                desiredName: "Desired",
                desAvg: result.desired,
                desLabel: result.desiredLevel,
              },
            ]}
            result={result}
          />
        </div>
        <h3 className="px-40 font-bold">Recommendations:</h3>
        <div className="flex flex-col px-40">
          {result.result.Recommendations.map((rec, i) => {
            return (
              <div key={`rec_${i}`}>
                <span className="font-bold">{rec.split(":")[0]}:</span>
                {rec.split(":")[1]}
              </div>
            );
          })}
          <h3 className="font-bold py-8">Benefits:</h3>
          {result.result.Benefits.map((rec, i) => {
            return (
              <div key={`ben_${i}`}>
                <span className="font-bold">{rec.split(":")[0]}:</span>
                {rec.split(":")[1]}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ResultsSubResult;
