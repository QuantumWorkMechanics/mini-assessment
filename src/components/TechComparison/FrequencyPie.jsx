import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function FrequencyPie({
  data,
  colorArr,
  selectedPersona,
  dataSet,
}) {
  //   console.log({ dataSet });
  //   const [dataSet, setDataSet] = useState(
  //     data.choices.map((el) => {
  //       let tempDatum = { choice: el, score: data[el].all ? data[el].all : 0 };
  //       return tempDatum;
  //     })
  //   );

  //   useEffect(() => {
  //     console.log({ selectedPersona, dataSet });
  //   }, [selectedPersona]);

  //   useState(() => {
  //     console.log("pie");
  //     let tempData;
  //     if (!selectedPersona) {
  //       tempData = data.choices.map((el) => {
  //         let tempDatum = { choice: el, score: data[el].all ? data[el].all : 0 };
  //         return tempDatum;
  //       });
  //     } else
  //       tempData = data.choices.map((el) => {
  //         let tempDatum = {
  //           choice: el,
  //           score: data[el][selectedPersona] ? data[el][selectedPersona] : 0,
  //         };
  //         return tempDatum;
  //       });
  //     console.log({ tempData });
  //     setDataSet(tempData);
  //   }, [selectedPersona]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const labelStyle = {
    fontWeight: "600",
    fontSize: "9pt",
  };

  return (
    <div>
      <div className="w-[315px] h-[250px]">
        <ResponsiveContainer>
          <PieChart width="100%" height={200}>
            <Pie
              innerRadius={40}
              data={dataSet}
              dataKey="score"
              nameKey="choice"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#FFF"
              labelLine={false}
              label={(entry) => (entry.score ? entry.choice : null)}
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
        </ResponsiveContainer>
      </div>
      <div className="lg:ml-0 ml-20 lg:text-center text-[#0E6AAD] font-semibold">
        Frequency of Use
      </div>
    </div>
  );
}
