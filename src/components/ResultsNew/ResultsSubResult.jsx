import Divider from "../Utils.jsx/Divider";
import categoryList from "../Utils.jsx/CategoryList";
import { useState } from "react";
import SubBarGraph from "../Results/subBarGraph";
import Box from "../Utils.jsx/Box";

export const DIMENSION_TEXT = {
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
      <div
        id={result.dimension + "_bar"}
        aria-hidden="true"
        className=" overflow-clip absolute -mt-[2500%] h-[200px] w-[400px]  flex flex-col place-self-center"
      >
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
      <div className="flex flex-col gap-8">
        <Divider text={result.dimension}> </Divider>
        <Box>
          <h3 className="md:hidden text-2xl py-4">{result.dimension}</h3>
          <div className="leading-7">{result.intro}</div>
        </Box>

        <div className="sub-bar mr-10 w-full h-[250px] md:h-[200px] md:w-[400px] mt-20 flex flex-col place-self-center">
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

        <Box>
          <h3 className="font-bold text-xl w-full mb-2">Recommendations:</h3>
          {result.result.Recommendations.map((rec, i) => {
            return (
              <div className="w-full mb-3  leading-7" key={`rec_${i}`}>
                <span className="font-bold">{rec.split(":")[0]}:</span>
                {rec.split(":")[1]}
              </div>
            );
          })}
          <h3 className="font-bold text-xl pt-6 w-full mb-3">Benefits:</h3>
          {result.result.Benefits.map((rec, i) => {
            return (
              <div className="w-full mb-2 leading-7" key={`ben_${i}`}>
                <span className="font-bold w-full">{rec.split(":")[0]}:</span>
                {rec.split(":")[1]}
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
}

export default ResultsSubResult;
