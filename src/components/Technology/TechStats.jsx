import React, { useState, useEffect } from "react";
import Controls from "../Maturity/Controls";
import {
  Line,
  Bar,
  BarChart,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  LabelList,
  Label,
} from "recharts";
import TechFrequencyPie from "./FrequencyPie";
import { tidy, groupBy, summarize, mean, count } from "@tidyjs/tidy";
import {
  getPercentOf,
  getAverages,
  filterByItemAndQuestion,
} from "../Utils.jsx/Functions";
import TableRow from "./TableRow";

export default function TechStats({
  data,
  frequencies,
  ALLCOLOR,
  FILTER1COLOR,
  FILTER2COLOR,
  rawPersonas,
  rawRegions,
  rawRoles,
  localDemoData,
  tech,
}) {
  const [rawData, setRawData] = useState();
  const [initialData, setInitialData] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataSet2, setDataSet2] = useState();
  const [personas2, setPersonas2] = useState();
  const [roles2, setRoles2] = useState();
  const [regions2, setRegions2] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [demoData, setDemoData] = useState();
  const [filteredFrequencies, setFilteredFrequencies] = useState();

  const [filters2, setFilters2] = useState({
    persona: false,
    role: false,
    region: false,
  });
  const [currentTab, setCurrentTab] = useState();
  const [persona, setPersona] = useState();
  const [role, setRole] = useState();
  const [region, setRegion] = useState();
  const [filterArray, setFilterArray] = useState();
  //   const routeParams = useParams();
  const [personas, setPersonas] = useState();
  const [roles, setRoles] = useState();
  const [regions, setRegions] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [currentModal, setCurrentModal] = useState();
  const [questions, setQuestions] = useState();
  const [filterData, setFilterData] = useState();
  const [filters, setFilters] = useState({
    persona: false,
    role: false,
    region: false,
    count: false,
    persona2: false,
    role2: false,
    region2: false,
    count2: false,
  });

  const colorArr = ["#0E6AAD", "#0EA8DC", "#09497B", "#666666"];

  useEffect(() => {
    setRawData(data);
    let tempDataSet = getAverages(data);
    tempDataSet.map((el) => {
      el.value = Math.floor(el.value * 10) / 10;
      setDataSet(tempDataSet);
    });

    // console.log({ tempDataSet });

    setDemoData(localDemoData);
    setInitialData(tempDataSet);

    let tempPersonas = getLocalDemos(rawPersonas, "persona", data);
    setPersonas(tempPersonas);
    // console.log({ tempPersonas });
    setPersonas2(tempPersonas);
    let tempRoles = getLocalDemos(rawRoles, "role", data);
    setRoles(tempRoles);
    setRoles2(tempRoles);
    let tempRegions = getLocalDemos(rawRegions, "region", data);
    setRegions(tempRegions);
    setRegions2(tempRegions);
    let tempCount = localDemoData.length;
    // console.log({ tempCount });
    let tempFilter = { ...filters };
    tempFilter.count = tempCount;
    tempFilter.count2 = tempCount;
    const tempQuestions = getQuestions(data);
    setQuestions(tempQuestions);
    // console.log({ questions });
    setCurrentTab(tempQuestions[0]);
    // console.log({ filtered });
    setFilters(tempFilter);
  }, []);

  function getQuestions(dataArr) {
    let questions = tidy(dataArr, count("title"));
    return questions.map((el) => el.title);
  }

  function getLocalDemos(rawItems, itemName, dataArr) {
    let tempPersonas = rawItems.filter((item) => {
      let temp =
        dataArr.filter((datum) => {
          return datum[itemName] == item;
        }).length > 0;
      return temp;
    });
    return tempPersonas;
  }

  function getFilteredItems(itemList, itemName, arr) {
    let tempItems = [];
    let tempItem;
    itemList.map((listItem) => {
      tempItem = filterByItem(itemName, listItem, arr);
      tempItems = [...tempItems, ...tempItem];
    });
    // console.log({ tempItems });
    return tempItems;
  }

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

  function createDataSet(categories) {
    let personaData = getItemValues(personas, "persona", categories, rawData);

    let roleData = getItemValues(roles, "role", categories, rawData);

    let regionData = getItemValues(regions, "region", categories, rawData);

    let combined = [...personaData, ...roleData, ...regionData];

    return combined;
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
          return datum.formRef == cat.formRef && datum[itemName] == el;
        });
        // console.log({ elData });
        // let averages = elData.filter((datum2) => (datum2[itemName] = el));
        let averages = tidy(
          elData,
          groupBy(
            ["formRef", "title"],
            [
              summarize({
                value: mean("score"),
              }),
            ]
          )
        );
        tempItem = {
          ...tempItem,
          formRef: averages[0].formRef,
          title: averages[0].title,
        };
        // console.log(averages);
        tempItem.average = elData.length
          ? Math.floor(averages[0].value * 10) / 10
          : null;
        tempItem.high = elData.length ? getPercentOf("gte", elData) : null;
        tempItem.low = elData.length ? getPercentOf("lte", elData) : null;

        return tempItem;
      });
      return tempItem;
      //   console.log({ tempItem });
    });
    return tempArr;
  }

  function handleFilter(filterName, arr, setArr, operator = "toggle") {
    // console.log("I got clicked");
    let tempData = [...arr];
    if (operator == "right") {
      handleAddFilter(filterName, tempData[0]);
      let item = tempData.shift();
      tempData.push(item);
      //   setter(item);
    }
    if (operator == "left") {
      let item = tempData.pop();
      tempData.unshift(item);
      handleAddFilter(filterName, tempData[tempData.length - 1]);
      //   setter(item);
    }

    // console.log({ tempData });
    setArr(tempData);
  }

  function handleAddFilter(filter, value) {
    let tempFilters = { ...filters };
    tempFilters[filter] = value;
    setFilters(tempFilters);
    // console.log({ tempFilters, regions });
    // console.log({ filter });
    runFilters(tempFilters);
  }

  function getFilterCounts(filterSet) {
    const demoData2 = demoData.map((el) => {
      el.persona = el.persona.replace(
        ": (Executive, Business Development, Marketing or Communication)",
        ""
      );
      return el;
    });
    // console.log({ demoData2 });
    let filteredData = [...demoData2];
    let filteredData2 = [...demoData2];
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
    let tempFilters = { ...filterSet };
    let count1 = filteredData.length;
    let count2 = filteredData2.length;
    // console.log({ filteredData, filteredData2, tempFilters });

    if (filterSet.persona || filterSet.role || filterSet.region) {
      tempFilters.count = count1;
    }
    // console.log({ filteredData2 });
    if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
      tempFilters.count2 = count2;
    }
    setFilters(tempFilters);
  }

  function runFrequencyFilters(filterSet) {
    // console.log({ filterSet, frequencies });

    let filteredData = [...frequencies];
    let filteredData2 = [...frequencies];
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

    let tempFreq = { frequency1: false, frequency2: false };
    if (filterSet.persona || filterSet.role || filterSet.region) {
      tempFreq.frequency1 = tidy(filteredData, count("answer"));
    }
    if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
      tempFreq.frequency2 = tidy(filteredData2, count("answer"));
    }

    // console.log({ tempFreq });
    setFilteredFrequencies(tempFreq);
  }

  async function runFilters(filterSet) {
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
    let tempFilteredSets = {
      filterOne: filteredData,
      filterTwo: filteredData2,
    };
    setFilterData(tempFilteredSets);
    // console.log({ tempFilteredSets });

    filteredData = getAverages(filteredData);
    filteredData2 = getAverages(filteredData2);

    getFilterCounts(filterSet);
    runFrequencyFilters(filterSet);

    let tempData = [...initialData];
    if (filterSet.persona || filterSet.role || filterSet.region) {
      tempData = addFilteredData("value2", filteredData, tempData);
    }
    if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
      tempData = addFilteredData("value3", filteredData2, tempData);
    }
    tempData.map((el) => {
      if (el.value2) {
        el.value2 = Math.floor(el.value2 * 10) / 10;
      }
      if (el.value3) {
        el.value3 = Math.floor(el.value3 * 10) / 10;
      }
      return el;
    });
    // console.log({ tempData });
    setDataSet(tempData);
    // setFilters(tempFilters);
  }

  function addFilteredData(keyName, dataToAdd, initialDataSet) {
    let dataArr = [...initialDataSet];
    // console.log({ dataToAdd });
    return dataArr.map((el) => {
      let thisValue = dataToAdd.filter((datum) => {
        // console.log({ datum, el });
        return datum.formRef == el.formRef;
      });

      return {
        ...el,
        [keyName]: thisValue[0] != undefined ? thisValue[0].value : null,
      };
    });
  }

  function handleClearFilters(filter = "") {
    let tempFilters = { ...filters };
    tempFilters["persona" + filter] = false;
    tempFilters["region" + filter] = false;
    tempFilters["role" + filter] = false;
    tempFilters["count" + filter] = false;
    setFilters(tempFilters);
    // console.log({ filters });
    runFilters(tempFilters);
  }

  function handleClearOneFilter(filterName) {
    let tempFilters = { ...filters };
    tempFilters[filterName] = false;
    setFilters(tempFilters);
    runFilters(tempFilters);
  }

  function handleStats() {
    let questions = tidy(rawData, count("formRef"));
    let statistics = createDataSet(questions);

    // console.log({ questions, statistics });
  }

  function roundAverages(arr) {
    let newArr = arr.map((el) => {
      //   console.log({ el });
      if (el.value2) {
        el.value2 = Math.floor(el.value2 * 10) / 10;
      }
      if (el.value3) {
        el.value3 = Math.floor(el.value3 * 10) / 10;
      }
      return el;
    });
    // console.log({ newArr });
    return newArr;
  }

  //   console.log({ data, frequencies });
  return (
    <div className="">
      <Controls
        personas2={personas2}
        setPersonas={setPersonas}
        setRegions2={setRegions2}
        setRoles2={setRoles2}
        personas={personas}
        setPersonas2={setPersonas2}
        handleFilter={handleFilter}
        roles={roles}
        roles2={roles2}
        setRoles={setRoles}
        regions={regions}
        regions2={regions2}
        setRegions={setRegions}
        handleClearFilters={handleClearFilters}
        filters={filters}
        dataSet={dataSet}
      />
      {data && (
        <div className="h-full w-full mt-20 ">
          <div className="flex justify-between">
            <h3
              className="text-2xl font-semibold ml-14"
              style={{ color: ALLCOLOR }}
            >
              {tech}
            </h3>
            {/* <button
              className="bg-blue-400 text-white p-2 rounded"
              type="button"
              onClick={handleStats}
            >
              Show Statistics
            </button> */}
          </div>
          <div className="flex items-center">
            <div className="m-14 h-80 w-1/3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  width={500}
                  height={400}
                  data={dataSet}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <YAxis
                    axisLine={false}
                    type="number"
                    domain={[0, 5]}
                    tickInterval={1}
                    tickCount={6}
                    tick={{ fontSize: 10 }}
                  />
                  <XAxis
                    //   dataKey="title"
                    //   label="none"
                    type="category"
                    tick={false}
                    scale="band"
                  ></XAxis>
                  {/* <Tooltip /> */}
                  {/* <Legend /> */}
                  {/* <LabelList /> */}
                  <Bar
                    // isAnimationActive={false}
                    // data={initialData}
                    // fill={"#0E6AAD"}
                    label={"title"}
                    //   legend
                    //   name={"title"}
                    dataKey={"value"}
                    fill={ALLCOLOR}
                    onClick={(e) => {
                      //   console.log({ e });
                      setCurrentModal(e.payload);
                      // console.log({ e });
                      document.getElementById("question-modal").showModal();
                    }}
                  >
                    {" "}
                    <LabelList
                      // angle="90"
                      dataKey="title"
                      fill={"#0E6AAD"}
                      font="Noto Sans"
                      style={{ fontSize: "11pt" }}
                      // style={screen.width > 550 ? labelStyle : mobileStyle}
                      width={80}
                      // content={<RenderLabel />}
                      position="bottom"
                    />
                  </Bar>
                  <Line
                    strokeWidth={3}
                    legendType="none"
                    name={"Filter 1"}
                    type="monotone"
                    dataKey="value2"
                    stroke={FILTER1COLOR}
                  />
                  <Line
                    strokeWidth={3}
                    legendType="none"
                    //   key="line2"
                    name={"Filter 2"}
                    type="monotone"
                    dataKey="value3"
                    stroke={FILTER2COLOR}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="">
              {frequencies && (
                <TechFrequencyPie
                  dataSet={tidy(frequencies, count("answer"))}
                  colorArr={colorArr}
                  tech={tech}
                  title="All Respondents"
                  titleColor={ALLCOLOR}
                />
              )}
            </div>
            <div className="">
              {filteredFrequencies && filteredFrequencies.frequency1 && (
                <TechFrequencyPie
                  dataSet={filteredFrequencies.frequency1}
                  colorArr={colorArr}
                  tech={tech}
                  title={
                    (filters.persona
                      ? filters.persona + " Respondents "
                      : "Respondents ") +
                    (filters.role ? "who are " + filters.role : "") +
                    (filters.region ? " from " + filters.region : "")
                  }
                  titleColor={FILTER1COLOR}
                />
              )}
            </div>
            <div className="">
              {filteredFrequencies && filteredFrequencies.frequency2 && (
                <TechFrequencyPie
                  dataSet={filteredFrequencies.frequency2}
                  colorArr={colorArr}
                  tech={tech}
                  title={
                    (filters.persona2
                      ? filters.persona2 + " Respondents "
                      : "Respondents ") +
                    (filters.role2 ? "who are " + filters.role2 : "") +
                    (filters.region2 ? " from " + filters.region2 : "")
                  }
                  titleColor={FILTER2COLOR}
                />
              )}
            </div>
          </div>
          <div className="w-[100vw]">
            <div className="tabs">
              {questions &&
                questions.map((question) => {
                  return (
                    <div
                      key={question}
                      className={
                        "tab tab-lifted " +
                        (currentTab == question && "tab-active")
                      }
                      onClick={() => setCurrentTab(question)}
                    >
                      {question}
                    </div>
                  );
                })}
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Audience</th>
                  <th>Average Score</th>
                  <th>% 2 and Below</th>
                  <th>% 4 and Above</th>
                  <th>Response No.</th>
                </tr>
              </thead>
              <tbody>
                {rawData && currentTab && (
                  <tr>
                    <td>
                      {" "}
                      <div
                        className="w-3 h-3 "
                        style={{ backgroundColor: ALLCOLOR }}
                      ></div>
                    </td>
                    <td>All Respondents</td>
                    <td>
                      {
                        getAverages(
                          rawData.filter((datum) => {
                            //   console.log({ currentTab, datum });
                            return datum.title == currentTab;
                          })
                        )[0].value
                      }
                    </td>
                    <td>
                      {getPercentOf(
                        "lte",
                        rawData.filter((datum) => {
                          //   console.log({ currentTab, datum });
                          return datum.title == currentTab;
                        })
                      ) + "%"}
                    </td>
                    <td>
                      {getPercentOf(
                        "gte",
                        rawData.filter((datum) => {
                          //   console.log({ currentTab, datum });
                          return datum.title == currentTab;
                        })
                      ) + "%"}
                    </td>
                    <td>
                      {
                        rawData.filter((datum) => {
                          //   console.log({ currentTab, datum });
                          return datum.title == currentTab;
                        }).length
                      }
                    </td>
                  </tr>
                )}

                {filterData && filterData.filterOne.length && (
                  <TableRow
                    title={
                      (filters.persona
                        ? filters.persona + " Respondents "
                        : "Respondents ") +
                      (filters.role ? "who are " + filters.role : "") +
                      (filters.region ? " from " + filters.region : "")
                    }
                    dataArr={filterData.filterOne}
                    currentTab={currentTab}
                    color={FILTER1COLOR}
                  />
                )}
                {filterData && filterData.filterTwo.length && (
                  <TableRow
                    title={
                      (filters.persona2
                        ? filters.persona + " Respondents "
                        : "Respondents ") +
                      (filters.role2 ? "who are " + filters.role2 : "") +
                      (filters.region2 ? " from " + filters.region2 : "")
                    }
                    dataArr={filterData.filterTwo}
                    currentTab={currentTab}
                    color={FILTER2COLOR}
                  />
                )}
                {personas &&
                  rawData &&
                  currentTab &&
                  personas.map((item) => {
                    let currentList = filterByItemAndQuestion(
                      "persona",
                      item,
                      rawData,
                      currentTab
                    );

                    return (
                      <TableRow
                        key={"tr_" + item}
                        title={item}
                        dataArr={currentList}
                        currentTab={currentTab}
                        // color={FILTER2COLOR}
                      />
                    );
                  })}
                {roles &&
                  rawData &&
                  currentTab &&
                  roles.map((item) => {
                    let currentList = filterByItemAndQuestion(
                      "role",
                      item,
                      rawData,
                      currentTab
                    );

                    return (
                      <TableRow
                        key={"tr_" + item}
                        title={item}
                        dataArr={currentList}
                        currentTab={currentTab}
                        // color={FILTER2COLOR}
                      />
                    );
                  })}
                {regions &&
                  rawData &&
                  currentTab &&
                  regions.map((item) => {
                    let currentList = filterByItemAndQuestion(
                      "region",
                      item,
                      rawData,
                      currentTab
                    );

                    return (
                      <TableRow
                        key={"tr_" + item}
                        title={item}
                        dataArr={currentList}
                        currentTab={currentTab}
                        // color={FILTER2COLOR}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="divider"></div>
    </div>
  );
}
