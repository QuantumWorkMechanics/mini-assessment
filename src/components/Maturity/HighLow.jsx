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
}) {
  const [localData, setLocalData] = useState();

  useEffect(() => {
    let tempData = dataSet.filter((el) => el[keyValue] != undefined);
    tempData.sort((a, b) => {
      if (type == "low") return a[keyValue] - b[keyValue];
      return b[keyValue] - a[keyValue];
    });
    setLocalData(tempData.slice(0, num));
    console.log({ localData });
    console.log({ tempData });
  }, [dataSet]);

  return (
    <>
      {localData && localData[0][keyValue] && (
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
            <CartesianGrid strokeDasharray="3 3" />
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
              fill={color}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
