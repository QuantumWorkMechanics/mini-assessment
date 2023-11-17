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
import { divide } from "lodash";
import { getLinearProgressUtilityClass } from "@mui/material";

export default function RadarMaturity({
  color,
  dataSet,
  keyVal,
  keyVal2,
  keyVal3,
  color2,
  color3,
  type,
  filters,
  demoData,
  rawData,
  personas,
  roles,
  regions,
  categories,
}) {
  const [localData, setLocalData] = useState();
  //   const [localFilters, setLocalFilters] = useState(filters);
  //   const [currentTab, setCurrentTab] = useState("all");
  //   const [filterOne, setFilterOne] = useState();
  //   const [filterTwo, setFilterTwo] = useState();
  //   const [tabIndex, setTabIndex] = useState();
  //   const [highVals, lowVals] = useState();
  //   const [count, setCount] = useState(0);
  //   console.log(keyVal in dataSet);

  //   function getItemValues(items, itemName, categories, dataArr) {
  //     console.log({ items, itemName, categories, dataArr });
  //     // if (!items.isArray) return;
  //     let tempArr = items.map((el, index) => {
  //       let tempItem = { [itemName]: el };
  //       categories.map((cat) => {
  //         let elData = dataArr.filter((datum) => datum.category == cat);
  //         // let numResponse = items.filter(
  //         //   (datum2) => datum2[itemName] == el
  //         // ).length;
  //         let averages = elData.filter((el) => (el[itemName] = cat));
  //         averages = tidy(
  //           elData,
  //           groupBy(
  //             ["category"],
  //             [
  //               summarize({
  //                 value: mean("score"),
  //               }),
  //             ]
  //           )
  //         );
  //         // console.log(averages);
  //         tempItem[cat + "_average"] = Math.floor(averages[0].value * 10) / 10;
  //         tempItem[cat + "_high"] = getPercentOf("gte", elData, cat);
  //         tempItem[cat + "_low"] = getPercentOf("lte", elData, cat);

  //         return tempItem;
  //       });
  //       return tempItem;
  //       console.log({ tempItem });
  //     });
  //     return tempArr;
  //   }

  //   function createDataSet(personas, roles, regions, categories, rawData) {}

  useEffect(() => {
    let tempData = tidy(
      dataSet,
      groupBy(
        ["category"],
        [
          summarize({
            value: mean(keyVal),
            value2: mean(keyVal2),
            value3: mean(keyVal3),
          }),
        ]
      )
    );
    tempData = tempData.map((el) => {
      if (el.value != undefined) el.value = Math.floor(el.value * 10) / 10;
      if (el.value2 != undefined) el.value2 = Math.floor(el.value2 * 10) / 10;
      if (el.value3 != undefined) el.value3 = Math.floor(el.value3 * 10) / 10;
      return el;
    });
    // console.log({ keyVal, tempData });
    // if (personas != undefined) {
    //   let personasTest = getItemValues(
    //     personas,
    //     "persona",
    //     categories,
    //     rawData
    //   );
    //   console.log({ personasTest });
    // }
    setLocalData(tempData);
  }, [dataSet]);

  //   useEffect(() => {
  //     // console.log({ filters });
  //     if (filters != undefined) {
  //       let tempFilterOne = runLocalFilters(filters, "filter1");
  //       let tempFilterTwo = runLocalFilters(filters, "filter2");
  //       //   console.log({ tempFilterOne });
  //       setFilterOne(tempFilterOne);
  //       setFilterTwo(tempFilterTwo);
  //       setLocalFilters(filters);
  //     }
  //   }, [filters]);

  //   useEffect(() => {
  //     setCount((prev) => prev + 1);
  //   }, [currentTab]);

  //   useEffect(() => {
  //     if (currentTab == "all") return;
  //     let tempData = rawData.filter((el) => {
  //       return el.category == currentTab;
  //     });
  //     tempData = tidy(
  //       tempData,
  //       groupBy(
  //         ["response_id"],
  //         [
  //           summarize({
  //             value: mean("score"),
  //           }),
  //         ]
  //       )
  //     );
  //     let percent =
  //       (tempData.filter((el) => el.value >= 4).length / tempData.length) * 100;
  //     console.log({ percent });
  //     console.log({ tempData });

  return (
    <>
      <div className="min-h-[400px] min-w-[400px] h-[400px]">
        {localData && (
          <ResponsiveContainer>
            <RadarChart
              outerRadius={90}
              width="100%"
              height="100%"
              data={localData}
            >
              <PolarGrid />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fontSize: 10 }}
                width={70}
              />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                //   name="All Respondents"
                dataKey="value"
                stroke={color}
                strokeWidth={4}
                fill={color}
                fillOpacity={0.2}
              />
              <Radar
                //   name="All Respondents"
                dataKey="value2"
                stroke={color2}
                fill={color2}
                strokeWidth={4}
                fillOpacity={0.2}
              />
              <Radar
                //   name="All Respondents"
                dataKey="value3"
                stroke={color3}
                fill={color3}
                strokeWidth={4}
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
}
