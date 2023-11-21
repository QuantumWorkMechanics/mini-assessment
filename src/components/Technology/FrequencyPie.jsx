import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function TechFrequencyPie({
  colorArr,
  tech,
  title,
  titleColor,
  dataSet,
}) {
  // console.log({ dataSet, tech });
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
      <div className="flex items-center gap-2">
        <div className="w-3 h-3" style={{ backgroundColor: titleColor }}></div>
        <div className=" lg:text-center text-[#0E6AAD] font-semibold">
          {title}
        </div>
      </div>
    </div>
  );
}
