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
import { tidy, leftJoin } from "@tidyjs/tidy";

export default function RadarGraph({ personas, mainCategories, colorArr }) {
  //   console.log(personas.personas);
  const [data, setData] = useState();
  //   const colorArr = ["#0EA8DC", "#FFCB18", "#666666"];
  const COLORS = [
    "#bee0f9",
    "#1d91da",
    "#0f4d7d",
    "#0c2945",
    "#FFCB18",
    "#142F55",
  ];

  useEffect(() => {
    console.log({ mainCategories });
    function convertJSON(jsonData) {
      let categories = {};
      for (let i = 0; i < jsonData.length; i++) {
        // console.log(jsonData[i]);
        let persona = jsonData[i].persona;
        let categoriesList = jsonData[i].categories;
        // console.log({ categoriesList });
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
        // let tempAll;
        // if (mainCategories) {
        //   tempAll = mainCategories.filter((category) => {
        //     console.log({ category });
        //     return mainCategories.category == category.category;
        //   });
        //   console.log({ tempAll });
        // }

        obj.All = Object.keys(categories[category]).forEach((persona) => {
          obj[persona] = categories[category][persona];
        });
        return obj;
      });
      return result;
    }
    console.log({ personas });
    let tempArr = convertJSON(personas);
    if (mainCategories) {
      let tempCategoriesWithMain = tidy(
        tempArr,
        leftJoin(mainCategories, { by: ["category"] })
      );
      console.log({ tempCategoriesWithMain });
    }

    setData(tempArr);
  }, []);

  return (
    <>
      {data && (
        <div className="w-[100%} h-[100%]">
          <ResponsiveContainer>
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fontSize: 10 }}
                width={70}
              />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="All Respondents"
                dataKey="score"
                stroke="#BDE3F9"
                fill="#BDE3F9"
                fillOpacity={0.5}
              />
              {personas.map((persona, index) => {
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
              })}

              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
