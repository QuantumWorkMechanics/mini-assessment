import React, { useState, useEffect } from "react";
import {
  RadarChart,
  Legend,
  PolarAngleAxis,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RadarGraph(personas) {
  console.log(personas.personas);
  const [data, setData] = useState();
  const colorArr = ["#0EA8DC", "#FFCB18", "#666666"];

  useEffect(() => {
    function convertJSON(jsonData) {
      let categories = {};
      for (let i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i]);
        let persona = jsonData[i].persona;
        let categoriesList = jsonData[i].categories;
        console.log({ categoriesList });
        for (let j = 0; j < categoriesList.length; j++) {
          let category = categoriesList[j].category;
          let score = categoriesList[j].score;
          if (!categories[category]) {
            categories[category] = {};
          }
          categories[category][persona] = score;
        }
      }
      let result = Object.keys(categories).map((category) => {
        let obj = { category: category };
        Object.keys(categories[category]).forEach((persona) => {
          obj[persona] = categories[category][persona];
        });
        return obj;
      });
      return result;
    }
    let tempArr = convertJSON(personas.personas);
    // tempArr.categories.map((category) => {
    //   personas.personas.map((persona) => {});
    console.log({ tempArr });
    setData(tempArr);
  }, []);

  return (
    <>
      {data && (
        <div className="w-[100%} h-[100%]">
          <ResponsiveContainer>
            <RadarChart outerRadius={90} width={730} height={250} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              {personas.personas.map((persona, index) => {
                console.log(`key_${persona.persona}`);
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
              })}

              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
