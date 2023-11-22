import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function TechFrequencyPie({
  colorArr,
  tech,
  title,
  titleColor,
  dataSet,
}) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const labelStyle = {
    fontWeight: "600",
    fontSize: "9pt",
  };

  return (
    <div className="h-[250px] flex flex-col justify-between">
      <div className="w-[200px]  h-[200px]">
        <ResponsiveContainer>
          <PieChart
            width="100%"
            height="100%"
            margin={{ top: 5, right: 5, bottom: 5, left: 25 }}
          >
            <Pie
              innerRadius={0}
              data={dataSet}
              dataKey="n"
              nameKey="choice"
              cx="50%"
              cy="50%"
              outerRadius={30}
              fill="#FFF"
              labelLine={false}
              label={(entry) => (entry.n ? entry.answer : null)}
              style={labelStyle}
            >
              {" "}
              {dataSet.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorArr[index % colorArr.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3" style={{ backgroundColor: titleColor }}></div>
        <div className=" lg:text-center text-[#0E6AAD] text-xs font-semibold w-40">
          {title}
        </div>
      </div>
    </div>
  );
}
