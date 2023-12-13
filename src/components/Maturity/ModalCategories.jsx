import React, { useState, useEffect } from "react";
import {
  getCategoryBreakout,
  ALLCOLOR,
  FILTER1COLOR,
  FILTER2COLOR,
} from "../Utils.jsx/Functions";

import { tidy, groupBy, summarize, mean, distinct } from "@tidyjs/tidy";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";
import PillarOverview from "./PillarOverview";
// import { divide } from "lodash";
// import { getLinearProgressUtilityClass } from "@mui/material";

export default function ModalCategories({
  color,
  dataSet,
  keyVal,
  keyVal2,
  keyVal3,
  color2,
  color3,
  type,
  filters,
  rawData,
  personas,
  roles,
  regions,
  categories,
  categoryBreakout,
}) {
  const [localData, setLocalData] = useState();
  const [localFilters, setLocalFilters] = useState(filters);
  const [currentTab, setCurrentTab] = useState();
  const [filterOne, setFilterOne] = useState();
  const [filterTwo, setFilterTwo] = useState();
  const [tabIndex, setTabIndex] = useState();
  const [highLowVals, setHighLowVals] = useState();
  const [count, setCount] = useState(0);
  //   console.log(keyVal in dataSet);

  function getResponseNo(itemName, itemVal, arr) {
    // console.log({ itemName, itemVal, arr });
    let tempArr = arr.filter((el) => {
      return el[itemName] == itemVal;
    });
    if (tempArr.length == 0) return tempArr.length;
    tempArr = tidy(
      tempArr,
      groupBy(["response_id"], [summarize({ value: mean("score") })])
    );
    // console.log({ tempArr });
    return tempArr.length;
  }

  function getItemValues(items, itemName, categories, dataArr) {
    // console.log({ items, itemName, categories, dataArr });
    // if (!items.isArray) return;
    let tempArr = items.map((el, index) => {
      let responseNo = getResponseNo(itemName, el, dataArr);
      let tempItem = { audience: el, responseNo };
      categories.map((cat) => {
        let elData = dataArr.filter((datum) => {
          //   console.log({ cat, itemName, el });
          return datum.category == cat && datum[itemName] == el;
        });
        // console.log({ elData });
        // let averages = elData.filter((datum2) => (datum2[itemName] = el));
        let averages = tidy(
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
        tempItem[cat + "_average"] = elData.length
          ? averages[0].value.toFixed(1)
          : null;
        tempItem[cat + "_high"] = elData.length
          ? getPercentOf("gte", elData, cat)
          : null;
        tempItem[cat + "_low"] = elData.length
          ? getPercentOf("lte", elData, cat)
          : null;

        return tempItem;
      });
      return tempItem;
      //   console.log({ tempItem });
    });
    return tempArr;
  }

  function createDataSet() {
    let personaData = getItemValues(personas, "persona", categories, rawData);

    let roleData = getItemValues(roles, "role", categories, rawData);

    let regionData = getItemValues(regions, "region", categories, rawData);

    let combined = [...personaData, ...roleData, ...regionData];

    return combined;
  }

  useEffect(() => {
    let tempData = getCategoryBreakout(dataSet);

    setLocalData(tempData);
    setCurrentTab(tempData[0].category);
    setTabIndex(0);
    const highLowDataSet = createDataSet();

    setHighLowVals(highLowDataSet);
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

  console.log({ rawData });

  function runLocalFilters(filterSet, filterName) {
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

    return Math.floor(percent * 10) / 10;
  }

  return (
    <>
      <PillarOverview
        dataSet={dataSet}
        ALLCOLOR={ALLCOLOR}
        FILTER1COLOR={FILTER1COLOR}
        FILTER2COLOR={FILTER2COLOR}
        categoryBreakout={categoryBreakout}
      />
      {type == "category" && localData && currentTab && count + 1 > 0 && (
        <>
          <div className="w-screen">
            <div className="tabs min-w-full">
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
                    <th>{tidy(rawData, distinct("response_id")).length}</th>
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
          {currentTab != "all" && localData && tabIndex + 1 > 0 && (
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

                    <td>{tidy(rawData, distinct(["response_id"])).length}</td>
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
                  {currentTab != "all" &&
                    highLowVals != undefined &&
                    highLowVals.map((el, index) => {
                      //   console.log({ el });
                      return (
                        <tr key={el.audience + index}>
                          <td></td>
                          <td>{el.audience}</td>
                          <td>{el[currentTab + "_average"]}</td>
                          <td>{el[currentTab + "_high"] + "%"}</td>
                          <td>{el[currentTab + "_low"] + "%"}</td>
                          <td>{el.responseNo}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
}
