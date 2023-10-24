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
} from "recharts";

export default function BarGraph({ typeForm }) {
  //   console.log({ typeForm });

  const COLORS = ["#999999", "#0EA8DC", "#FFCB18", "#FF8042"];

  const TooltipContent = (props) => {
    if (!props.active || !props.payload) {
      return;
    }

    // const data = props.payload[0].payload;
    const data = props.payload[0].payload;
    return (
      <div className=" bg-white bg-opacity-80 border-2 text-xs md:text-lg rounded md:p-4 w-[45ch] md:w-[65ch]">
        <ul>
          <li className="font-bold mb-1">
            {data.category}
            {":  "}
            <span className="text-xl text-blue-400">{data.AllAvgScore}</span>
          </li>

          <li>{data.title}</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="w-[120%] h-[400px] -ml-[15%] md:ml-0 md:w-[100%] ">
      <div className="ml-20 md:ml-3">Average Scores</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          width={500}
          height={300}
          data={typeForm}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
          <Tooltip width={400} content={<TooltipContent />} />
          {/* <Legend /> */}
          <Bar
            dataKey="AllAvgScore"
            fill="#0EA8DC"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            onClick={(e) => {
              //   console.log({ e });
            }}
          >
            {" "}
            {typeForm.map((entry, index) => {
              const color =
                entry.AllAvgScore < 2
                  ? COLORS[0]
                  : entry.AllAvgScore < 2.9
                  ? COLORS[1]
                  : COLORS[2];
              return <Cell key={`${entry.category}_${index}`} fill={color} />;
            })}
          </Bar>
          {/* <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
