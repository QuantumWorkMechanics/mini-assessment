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

export default function ResultsRadar({ data }) {
  let current = returnAvg(data, "Current");
  let desired = returnAvg(data, "Desired");
  let dataSet = [{ current, desired }];

  function getDataSet(data) {
    let tempData = tidy(data, groupBy("Type", [summarize({ Current: mean("Current"), Desired: mean("Desired") })]));
    return tempData;
  }

  function customLabel({ payload, x, y, textAnchor, stroke, radius }) {
    console.log({ payload });
    if (payload != undefined)
      return (
        <text
          radius={radius}
          stroke={stroke}
          x={x}
          y={y}
          className="recharts-text recharts-polar-angle-axis-tick-value"
          textAnchor={textAnchor}
          fontSize={8}
          fontFamily="Noto Sans"
          color="#666666"
          width={50}
        >
          {payload.value}
        </text>
      );
  }

  return (
    <>
      <div className="md:flex items-center justify-center xl:justify-around">
        <div className="flex flex-col">
          <div id={data[0].Type + "_radar"} className="block w-[400px] md:w-[600px] h-[180px] md:h-[300px] md:mt-10 md:ml-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="45%" cy="50%" outerRadius="90%" data={getDataSet(data)}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="Type"
                  // tick={customLabel}
                ></PolarAngleAxis>
                <PolarRadiusAxis angle={30} domain={[0, 5]}></PolarRadiusAxis>
                <Radar name="Current" dataKey="Current" stroke="#09497B" strokeWidth={3} fill="#09497B" fillOpacity={0.2} />
                <Radar name="Desired" strokeWidth={3} dataKey="Desired" stroke="#FDB517" fill="#FDB517" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
