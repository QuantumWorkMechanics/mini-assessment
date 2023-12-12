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
import Overall from "./Overall";
import { tidy, summarize, mean, groupBy } from "@tidyjs/tidy";
import { returnAvg } from "../Utils.jsx/Functions";
import { lorem } from "../Utils.jsx/Functions";
import SubBarGraph from "./subBarGraph";

export default function SubComponent({ data }) {
  let current = returnAvg(data, "Current");
  let desired = returnAvg(data, "Desired");
  let dataSet = [{ current, desired }];
  // console.log(data[0].Type.toLowerCase());

  function getDataSet(data) {
    let tempData = tidy(
      data,
      groupBy("Dimension", [
        summarize({ Current: mean("Current"), Desired: mean("Desired") }),
      ])
    );
    // console.log({ tempData });
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
          fontSize={16}
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
      <div className="divider mt-20"></div>
      <h2 className="ml-4 md:ml-40 mt-14 text-3xl font-light underline decoration-[#FDB517]">
        {data[0].Type}
      </h2>
      <div className="md:flex items-center justify-center xl:justify-around">
        {data && (
          <div>
            <div className=" mt-5">
              <Overall
                title="Current"
                total={returnAvg(data, "Current")}
                content={lorem}
                resultLookup={data[0].Type.toLowerCase()}
              />
            </div>
            <div className=" md:mt-40">
              <Overall
                title="Desired"
                total={returnAvg(data, "Desired")}
                content={lorem}
                resultLookup={data[0].Type.toLowerCase()}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <div
            id={data[0].Type + "_bar"}
            className="w-[400px] h-[250px] md:h-[300px] md:w-[500px] mt-20 flex flex-col place-self-center"
          >
            <SubBarGraph dataSet={dataSet} />
          </div>
          {/* <div
            id={data[0].Type + "_bar"}
            className="absolute w-[500px] h-[300px] -mt-[2400px]"
          >
            <SubBarGraph dataSet={dataSet} />
          </div> */}

          <div
            id={data[0].Type + "_radar"}
            className="block w-[400px] md:w-[600px] h-[180px] md:h-[300px] md:mt-72 md:ml-10"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="45%"
                cy="50%"
                outerRadius="90%"
                data={getDataSet(data)}
              >
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="Dimension"
                  // tick={customLabel}
                ></PolarAngleAxis>
                <PolarRadiusAxis angle={30} domain={[0, 5]}>
                  {/* <Label
                    style={{ width: 35 }}
                    // width={35}
                    // content={customLabel}
                    textanchor="start"
                    // vertifcalanchor="start"
                  /> */}
                </PolarRadiusAxis>
                <Radar
                  name="Current"
                  dataKey="Current"
                  stroke="#09497B"
                  strokeWidth={3}
                  fill="#09497B"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Desired"
                  strokeWidth={3}
                  dataKey="Desired"
                  stroke="#FDB517"
                  fill="#FDB517"
                  fillOpacity={0.2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
