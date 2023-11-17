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
  const [localFilters, setLocalFilters] = useState(filters);
  const [currentTab, setCurrentTab] = useState("all");
  const [filterOne, setFilterOne] = useState();
  const [filterTwo, setFilterTwo] = useState();
  const [tabIndex, setTabIndex] = useState();
  //   const [highVals, lowVals] = useState();
  const [count, setCount] = useState(0);
  //   console.log(keyVal in dataSet);

  function getItemValues(items, itemName, categories, dataArr) {
    console.log({ items, itemName, categories, dataArr });
    // if (!items.isArray) return;
    let tempArr = items.map((el, index) => {
      let tempItem = { [itemName]: el };
      categories.map((cat) => {
        let elData = dataArr.filter((datum) => datum.category == cat);
        // let numResponse = items.filter(
        //   (datum2) => datum2[itemName] == el
        // ).length;
        let averages = elData.filter((el) => (el[itemName] = cat));
        averages = tidy(
          elData,
          groupBy(
            ["category"],
            [
              summarize({
                value: mean("score"),
              }),
            ]
          )
        );
        // console.log(averages);
        tempItem[cat + "_average"] = Math.floor(averages[0].value * 10) / 10;
        tempItem[cat + "_high"] = getPercentOf("gte", elData, cat);
        tempItem[cat + "_low"] = getPercentOf("lte", elData, cat);

        return tempItem;
      });
      return tempItem;
      console.log({ tempItem });
    });
    return tempArr;
  }

  function createDataSet(personas, roles, regions, categories, rawData) {}

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
    if (personas != undefined) {
      let personasTest = getItemValues(
        personas,
        "persona",
        categories,
        rawData
      );
      console.log({ personasTest });
    }
    setLocalData(tempData);
  }, [dataSet]);

  useEffect(() => {
    // console.log({ filters });
    if (filters != undefined) {
      let tempFilterOne = runLocalFilters(filters, "filter1");
      let tempFilterTwo = runLocalFilters(filters, "filter2");
      //   console.log({ tempFilterOne });
      setFilterOne(tempFilterOne);
      setFilterTwo(tempFilterTwo);
      setLocalFilters(filters);
    }
  }, [filters]);

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
  //   }, [currentTab]);
  function runLocalFilters(filterSet, filterName) {
    // console.log({ rawData });
    console.log({ filterSet });
    let filteredData = [...rawData];
    let filteredData2 = [...rawData];
    if (filterSet.persona)
      filteredData = filteredData.filter(
        (el) => el.persona == filterSet.persona
      );
    if (filterSet.role)
      filteredData = filteredData.filter((el) => el.role == filterSet.role);
    if (filterSet.region)
      filteredData = filteredData.filter((el) => el.region == filterSet.region);

    if (filterSet.persona2)
      filteredData2 = filteredData2.filter(
        (el) => el.persona == filterSet.persona2
      );
    if (filterSet.role2)
      filteredData2 = filteredData2.filter((el) => el.role == filterSet.role2);
    if (filterSet.region2)
      filteredData2 = filteredData2.filter(
        (el) => el.region == filterSet.region2
      );
    if (filterName == "filter1") return filteredData;
    return filteredData2;
  }

  function getPercentOf(operator, arr, tab = currentTab) {
    let tempArr = [...arr];

    let tempData = tempArr.filter((el) => {
      return el.category == tab;
    });
    tempData = tidy(
      tempData,
      groupBy(
        ["response_id"],
        [
          summarize({
            value: mean("score"),
          }),
        ]
      )
    );
    let percent;
    operator == "gte"
      ? (percent =
          (tempData.filter((el) => el.value >= 4).length / tempData.length) *
          100)
      : (percent =
          (tempData.filter((el) => el.value <= 2).length / tempData.length) *
          100);

    // console.log({ percent });
    // console.log({ tempData });
    return Math.floor(percent * 10) / 10;
  }

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
      {type == "category" && localData && currentTab && count + 1 > 0 && (
        <>
          <div className="w-screen">
            <div className="tabs min-w-full">
              <a
                className={
                  "tab tab-lifted " + (currentTab == "all" && "tab-active")
                }
                onClick={() => setCurrentTab("all")}
              >
                All Pillars
              </a>
              {localData.map((datum, index) => {
                return (
                  <a
                    key={index + datum.category}
                    className={
                      "tab tab-lifted " +
                      (currentTab == datum.category && "tab-active")
                    }
                    onClick={() => {
                      setCurrentTab(datum.category);
                      setTabIndex(index);
                    }}
                  >
                    {datum.category}
                  </a>
                );
              })}
              {/* <span className="grow border-b border-base-300"></span> */}
            </div>
          </div>
          {currentTab == "all" && (
            <div className="">
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th></th>
                    <th>Respondents</th>
                    <th>{localData[0].category}</th>
                    <th>{localData[1].category}</th>
                    <th>{localData[2].category}</th>
                    <th>{localData[3].category}</th>
                    <th>{localData[4].category}</th>
                    <th>No. Respondents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="w-3 h-2"
                        style={{ backgroundColor: color }}
                      ></div>
                    </td>
                    <td>All Respondents</td>
                    <th>{localData[0].value}</th>
                    <th>{localData[1].value}</th>
                    <th>{localData[2].value}</th>
                    <th>{localData[3].value}</th>
                    <th>{localData[4].value}</th>
                    <th>{demoData.length}</th>
                  </tr>
                  {localData[0].value2 != undefined && (
                    <tr>
                      <td>
                        <div
                          className="w-3 h-2"
                          style={{ backgroundColor: color2 }}
                        ></div>
                      </td>
                      <td>
                        {" "}
                        {(filters.persona
                          ? filters.persona + " Respondents "
                          : "Respondents ") +
                          (filters.role ? "who are " + filters.role : "") +
                          (filters.region ? " from " + filters.region : "")}
                      </td>
                      <td>{localData[0].value2}</td>
                      <td>{localData[1].value2}</td>
                      <td>{localData[2].value2}</td>
                      <td>{localData[3].value2}</td>
                      <td>{localData[4].value2}</td>
                      <td>{filters.count}</td>
                    </tr>
                  )}
                  {localData[0].value3 != undefined && (
                    <tr>
                      <td>
                        <div
                          className="w-3 h-2"
                          style={{ backgroundColor: color3 }}
                        ></div>
                      </td>
                      <td>
                        {" "}
                        {(filters.persona2
                          ? filters.persona2 + " Respondents "
                          : "Respondents ") +
                          (filters.role2 ? "who are " + filters.role2 : "") +
                          (filters.region2 ? " from " + filters.region2 : "")}
                      </td>
                      <td>{localData[0].value2}</td>
                      <td>{localData[1].value2}</td>
                      <td>{localData[2].value2}</td>
                      <td>{localData[3].value2}</td>
                      <td>{localData[4].value2}</td>
                      <td>{filters.count2}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {localData && tabIndex + 1 > 0 && (
            <div>
              {" "}
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th></th>
                    <th>Respondents</th>
                    <th>Average Score</th>
                    <th>% 4 and Above</th>
                    <th>% 2 and Below</th>
                    <th>No. Respondents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="w-3 h-2"
                        style={{ backgroundColor: color }}
                      ></div>
                    </td>
                    <td>All Respondents</td>
                    <td>{localData[tabIndex].value}</td>
                    <td key={"gteAll" + currentTab}>
                      {getPercentOf("gte", rawData, currentTab) + "%"}
                    </td>
                    <td key={"lteAll" + currentTab}>
                      {getPercentOf("lte", rawData, currentTab) + "%"}
                    </td>

                    <th>{demoData.length}</th>
                  </tr>
                  {localData[tabIndex].value2 != undefined &&
                    filterOne != undefined && (
                      <tr>
                        <td>
                          <div
                            className="w-3 h-2"
                            style={{ backgroundColor: color2 }}
                          ></div>
                        </td>
                        <td>
                          {" "}
                          {(filters.persona
                            ? filters.persona + " Respondents "
                            : "Respondents ") +
                            (filters.role ? "who are " + filters.role : "") +
                            (filters.region ? " from " + filters.region : "")}
                        </td>
                        <td>{localData[tabIndex].value2}</td>
                        <td>{getPercentOf("gte", filterOne) + "%"}</td>
                        <td>{getPercentOf("lte", filterOne) + "%"}</td>
                        <td>{filters.count}</td>
                      </tr>
                    )}
                  {localData[tabIndex].value3 != undefined &&
                    filterTwo != undefined && (
                      <tr>
                        <td>
                          <div
                            className="w-3 h-2"
                            style={{ backgroundColor: color3 }}
                          ></div>
                        </td>
                        <td>
                          {" "}
                          {(filters.persona2
                            ? filters.persona2 + " Respondents "
                            : "Respondents ") +
                            (filters.role2 ? "who are " + filters.role2 : "") +
                            (filters.region2 ? " from " + filters.region2 : "")}
                        </td>
                        <td>{localData[tabIndex].value3}</td>
                        <td>{getPercentOf("gte", filterTwo) + "%"}</td>
                        <td>{getPercentOf("lte", filterTwo) + "%"}</td>
                        <td>{filters.count2}</td>
                      </tr>
                    )}
                  {/*    {personas != undefined &&
                    personas.map((el, index) => {
                      let elData = rawData.filter(
                        (datum) => datum.persona == el
                      );
                      // console.log({ averages });
                      let numResponse = demoData.filter(
                        (datum2) => datum2.persona == el
                      ).length;

                      if (elData == undefined) return;

                      return (
                        <tr key={el + index}>
                          <td></td>
                          <td>{el}</td>
                          <td></td>
                          <td>{getPercentOf("gte", elData) + "%"}</td>
                          <td>{getPercentOf("lte", elData) + "%"}</td>
                          <td>{numResponse}</td>
                        </tr>
                      );
                    })}
                  {regions != undefined &&
                    regions.map((el, index) => {
                      // console.log({ el, rawData });
                      let elData = rawData.filter(
                        (datum) => datum.region == el
                      );
                      let numResponse = regions.filter(
                        (datum2) => datum2.region == el
                      ).length;
                      let averages = elData.filter(
                        (el) => (el.category = currentTab)
                      );
                      averages = tidy(
                        averages,
                        groupBy(
                          ["category"],
                          [
                            summarize({
                              value: mean("score"),
                            }),
                          ]
                        )
                      );
                      // console.log({ averages });

                      if (elData == undefined) return;

                      return (
                        <tr key={el + index}>
                          <td></td>
                          <td>{el}</td>
                          <td>{Math.floor(averages[0].value * 10) / 10}</td>
                          <td>{getPercentOf("gte", elData) + "%"}</td>
                          <td>{getPercentOf("lte", elData) + "%"}</td>
                          <td>{numResponse}</td>
                        </tr>
                      );
                    })} */}
                  {/* {roles != undefined &&
                      currentTab &&
                      roles.map((el, index) => {
                        console.log({ el, rawData });
                        let elData = rawData.filter(
                          (datum) => datum.role == el
                        );
                        let numResponse = roles.filter(
                          (datum2) => datum2.role == el
                        ).length;
                        let averages = elData.filter(
                          (el) => (el.category = currentTab)
                        );
                        averages = tidy(
                          averages,
                          groupBy(
                            ["category"],
                            [
                              summarize({
                                value: mean("score"),
                              }),
                            ]
                          )
                        );

                        if (elData == undefined) return;

                        return (
                          <tr key={el + index}>
                            <td></td>
                            <td>{el}</td>
                            <td>{Math.floor(averages[0].value * 10) / 10}</td>
                            <td>{getPercentOf("gte", elData) + "%"}</td>
                            <td>{getPercentOf("lte", elData) + "%"}</td>
                            <td>{numResponse}</td>
                          </tr>
                        );
                      })} */}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
}
