import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Label,
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Rectangle,
} from "recharts";
//import Overall from "./Overall";
import { tidy, summarize, mean, groupBy } from "@tidyjs/tidy";
import { returnAvg } from "../Utils.jsx/Functions";
//import SubBarGraph from "./subBarGraph";

export default function ResultsRadar({ data, customLabel }) {
  let current = returnAvg(data, "Current");
  let desired = returnAvg(data, "Desired");
  let dataSet = [{ current, desired }];

  function getDataSet(data) {
    let tempData = tidy(data, groupBy("Type", [summarize({ Current: mean("Current"), Desired: mean("Desired") })]));
    console.log({ tempData });
    return tempData;
  }

  // function customLabel({ payload, x, y, textAnchor, stroke, radius }) {
  //   console.log({ payload });
  //   if (payload != undefined)
  //     return (
  //       <text
  //         radius={radius}
  //         stroke={stroke}
  //         x={x}
  //         y={y}
  //         className="recharts-text recharts-polar-angle-axis-tick-value"
  //         textAnchor={textAnchor}
  //         fontSize={8}
  //         fontFamily="Noto Sans"
  //         color="#666666"
  //         width={100}
  //       >
  //         {payload.value}
  //       </text>
  //     );
  // }
  const CustomLabel = (props) => {
    const { x, y, payload } = props;
    //console.log(payload.index);
    return (
      <>
        {payload.index == 0 && (
          <text fontSize={15} x={x} y={y} fill="white" textAnchor="middle" fontWeight={700} width={50} dominantBaseline="central">
            {payload.value}
          </text>
        )}
        {payload.index > 2 && (
          <text fontSize={15} x={x} y={y} fill="white" textAnchor="end" fontWeight={700} width={75} height={100} dominantBaseline="central">
            {payload.value}
          </text>
        )}
        {payload.index < 3 && payload.index > 0 && (
          <text fontSize={15} x={x} y={y} fill="white" fontWeight={700} textAnchor="start" width={50} dominantBaseline="central">
            {payload.value}
          </text>
        )}
      </>
    );
  };

  return (
    <>
      <div className="md:flex items-center justify-center xl:justify-around">
        <div className="flex flex-col">
          <div id={data[0].Type + "_radar"} className="-mt-[1000%] md:block w-[1000px] h-[300px] md:mt-10 md:ml-10 overflow-visible">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="45%" cy="50%" outerRadius="90%" data={getDataSet(data)}>
                <PolarGrid strokeWidth={3} />
                {customLabel && (
                  <PolarAngleAxis
                    dataKey="Type"
                    width={200}
                    tick={<CustomLabel />}
                    // tick={customLabel}
                  >
                    <Label width={200}></Label>
                  </PolarAngleAxis>
                )}
                {!customLabel && (
                  <PolarAngleAxis
                    dataKey="Type"
                    width={200}

                    // tick={customLabel}
                  >
                    <Label width={100}></Label>
                  </PolarAngleAxis>
                )}
                <PolarRadiusAxis angle={30} domain={[0, 5]}></PolarRadiusAxis>
                <Radar name="Desired" strokeWidth={3} dataKey="Desired" stroke="#FDB517" fill="#FDB517" fillOpacity={0.2} />
                <Radar name="Current" dataKey="Current" stroke="#09497B" strokeWidth={3} fill="#09497B" fillOpacity={0.4} />

                <Legend formatter={(value, entry, index) => <span className="font-bold text-[9pt]">{value}</span>} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{ overflow: "visible" }}
            // id={data[0].Type + "_radar"}
            className="my-14 block md:hidden w-screen   md:w-[1000px] h-[180px] md:h-[300px] md:mt-10 md:ml-10 overflow-visible"
          >
            <ResponsiveContainer width="110%" height="120%" overflow={"visible"}>
              <RadarChart cx="45%" cy="60%" outerRadius="130%" data={getDataSet(data)} margin={{ top: 73, right: 0, left: 0 }}>
                <PolarGrid strokeWidth={2} />
                {customLabel && (
                  <PolarAngleAxis
                    dataKey="Type"
                    width={200}
                    tick={<CustomLabel />}
                    // tick={customLabel}
                  >
                    <Label width={200}></Label>
                  </PolarAngleAxis>
                )}
                {!customLabel && (
                  <PolarAngleAxis
                    dataKey="Type"
                    width={100}
                    height={200}

                    // tick={customLabel}
                  >
                    <Label width={100}></Label>
                  </PolarAngleAxis>
                )}
                <PolarRadiusAxis angle={30} domain={[0, 5]}></PolarRadiusAxis>
                <Radar name="Desired" strokeWidth={3} dataKey="Desired" stroke="#FDB517" fill="#FDB517" fillOpacity={0.2} />
                <Radar name="Current" dataKey="Current" stroke="#09497B" strokeWidth={3} fill="#09497B" fillOpacity={0.4} />

                <Legend formatter={(value, entry, index) => <span className="font-bold text-[9pt]">{value}</span>} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
