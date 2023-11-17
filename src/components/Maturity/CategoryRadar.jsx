import React, { useState, useEffect } from "react";
import { tidy, groupBy, summarize, mean } from "@tidyjs/tidy";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

export default function RadarMaturity({
  color,
  dataSet,
  keyVal,
  keyVal2,
  keyVal3,
  color2,
  color3,
}) {
  const [localData, setLocalData] = useState();

  //   console.log(keyVal in dataSet);

  useEffect(() => {
    const tempData = tidy(
      dataSet,
      groupBy(["category"], [summarize({ [keyVal]: mean(keyVal) })])
    );
    console.log({ keyVal, tempData });
    setLocalData(tempData);
  }, [dataSet]);

  return (
    <ResponsiveContainer>
      <RadarChart outerRadius={90} data={localData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} width={70} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar
          //   name="All Respondents"
          dataKey={keyVal}
          stroke={color}
          fill={color}
          fillOpacity={0.5}
        />
        {localData && keyVal2 in localData && (
          <Radar
            //   name="All Respondents"
            dataKey={keyVal2}
            stroke={color2}
            fill={color2}
            fillOpacity={0.5}
          />
        )}
        {keyVal3 && (
          <Radar
            //   name="All Respondents"
            dataKey={keyVal3}
            stroke={color3}
            fill={color3}
            fillOpacity={0.5}
          />
        )}
        {/* {personas.map((persona, index) => {
          // console.log(`key_${persona.persona}`);
          return (
            <Radar
              key={`key_${persona.persona}`}
              name={persona.persona}
              dataKey={persona.persona}
              stroke={colorArr[index]}
              fill={colorArr[index]}
              fillOpacity={0.5}
            />
          );
        })} */}

        {/* <Legend /> */}
      </RadarChart>
    </ResponsiveContainer>
  );
}
