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
        className="overflow-clip absolute -mt-[2500%] h-[200px] w-[400px]  flex flex-col place-self-center"
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
          <div className="text-justify">
            {`The bellow recommendations and Benefits are tailored for to enhance your ${result.dimension}. These strategies are designed to help your
            organization optimize ${DIMENSION_TEXT[result.dimension].display}, improve skills management, and support strategic business objectives.`}
          </div>
        </Box>

        <div className=" w-[350px] h-[250px] md:h-[200px] md:w-[400px] mt-20 flex flex-col place-self-center">
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

        <Box className="bg-slate-200 flex flex-col md:mx-20 md:my-8 p-10 gap-2 border border-[#999999] shadow">
          <h3 className="font-bold text-xl w-full">Recommendations:</h3>
          {result.result.Recommendations.map((rec, i) => {
            return (
              <div className="w-full" key={`rec_${i}`}>
                <span className="font-bold">{rec.split(":")[0]}:</span>
                {rec.split(":")[1]}
              </div>
            );
          })}
          <h3 className="font-bold text-xl pt-6 w-full">Benefits:</h3>
          {result.result.Benefits.map((rec, i) => {
            return (
              <div className="w-full" key={`ben_${i}`}>
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
