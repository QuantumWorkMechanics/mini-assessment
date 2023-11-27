import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart,
  Label,
  LabelList,
} from "recharts";

export default function HighLow({
  dataSet,
  type,
  keyValue,
  num,
  color,
  setCurrentQuestion,
  title,
}) {
  const [localData, setLocalData] = useState();
  const colorArr = ["#0E6AAD", "#bee0f9", "#666666"];
  useEffect(() => {
    let tempData = dataSet.filter((el) => el[keyValue] != undefined);
    tempData.sort((a, b) => {
      if (type == "Low") return a[keyValue] - b[keyValue];
      return b[keyValue] - a[keyValue];
    });

    tempData = tempData.slice(0, num);

    tempData = JSON.parse(JSON.stringify(tempData));

    tempData.map((el, index) => {
      el.fill = colorArr[index];
    });

    setLocalData(tempData);
    // console.log({ localData });
  }, [dataSet]);

  return (
    <>
      {localData && localData[0][keyValue] && (
        <>
          <div
            className="m-4 ml-24 text-lg font-semibold"
            style={{ color: "#0E6AAD" }}
          >
            {title}
          </div>
          <div className="flex min-h-fit h-[400px] w-full">
            <div className="h-full h-[300px] w-1/3 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={500}
                  height={300}
                  data={localData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <YAxis
                    axisLine={false}
                    type="number"
                    domain={[0, 5]}
                    tickInterval={1}
                    tickCount={6}
                    tick={{ fontSize: 10 }}
                  />
                  <XAxis
                    dataKey="title"
                    type="category"
                    tick={false}
                    scale="band"
                  ></XAxis>
                  <Tooltip viewBox={{ x: 0, y: 0, width: 300, height: 400 }} />
                  {/* <Legend /> */}
                  <Bar
                    //   onClick={(e) => {
                    //     setCurrentQuestion(e.payload);
                    //     document.getElementById("question-modal").showModal();
                    //   }}
                    name="Average Score"
                    dataKey={keyValue}
                    fill="fill"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-start w-1/2 gap-10">
              <Question
                localData={localData}
                keyValue={keyValue}
                colorArr={colorArr}
                index="0"
              />
              <Question
                localData={localData}
                keyValue={keyValue}
                colorArr={colorArr}
                index="1"
              />
              <Question
                localData={localData}
                keyValue={keyValue}
                colorArr={colorArr}
                index="2"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Question({ localData, keyValue, colorArr, index }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div
          className="w-3 h-3 m-3"
          style={{ backgroundColor: colorArr[index] }}
        ></div>
        <div className="text-slate-600 text-sm m-2">{"Average: "}</div>
        <div className="text-xl font-bold w-6" style={{ color: colorArr[0] }}>
          {localData[index][keyValue]}
        </div>

        <div className="ml-14 text-slate-600 text-sm m-2">{"Category: "}</div>
        <div className="text-lg font-semibold" style={{ color: colorArr[0] }}>
          {localData[index].category}
        </div>
      </div>
      <div>{localData && localData[index].title}</div>
    </div>
  );
}
