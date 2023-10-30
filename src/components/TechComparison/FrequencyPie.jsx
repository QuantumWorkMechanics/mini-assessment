import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

export default function FrequencyPie({ data, colorArr }) {
  const [dataSet, setDataSet] = useState(
    data.choices.map((el) => {
      let tempDatum = { choice: el, score: data[el].all ? data[el].all : 0 };
      return tempDatum;
    })
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <PieChart key={`pie_${data.category}`} width={250} height={250}>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Pie
          data={dataSet}
          dataKey="score"
          nameKey="choice"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label
        >
          {" "}
          {dataSet.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorArr[index % colorArr.length]}
            />
          ))}
        </Pie>
        {/* <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          /> */}
      </PieChart>
    </div>
  );
}
