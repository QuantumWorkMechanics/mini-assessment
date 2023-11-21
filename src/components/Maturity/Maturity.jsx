import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tidy, groupBy, summarize, mean, TMath } from "@tidyjs/tidy";
import MaturityBarGraph from "./MABar";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart,
  Label,
  LabelList,
} from "recharts";
import HighLow from "./HighLow";
import RadarMaturity from "./RadarMaturity";
import ModalBar from "./ModalBar";
import ModalCategories from "./ModalCategories";
import Controls from "./Controls";

export default function Maturity() {
  const [rawData, setRawData] = useState();
  const [initialData, setInitialData] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataSet2, setDataSet2] = useState();
  const [personas2, setPersonas2] = useState();
  const [roles2, setRoles2] = useState();
  const [regions2, setRegions2] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [demoData, setDemoData] = useState();

  //   const [filters2, setFilters2] = useState({
  //     persona: false,
  //     role: false,
  //     region: false,
  //   });

  const [persona, setPersona] = useState();
  const [role, setRole] = useState();
  const [region, setRegion] = useState();
  const [filterArray, setFilterArray] = useState();
  const routeParams = useParams();
  const [personas, setPersonas] = useState();
  const [roles, setRoles] = useState();
  const [regions, setRegions] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [currentModal, setCurrentModal] = useState();
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

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const ALLCOLOR = "#0E6AAD";
  const FILTER1COLOR = "#FFCB18";
  const FILTER2COLOR = "#0EA8DC";

  //   console.log({ requestOptions });
  //   console.log(process.emitWarning.NODE_ENV);
  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-responses/" + routeParams.tfid,
      requestOptions
    )
      .then((response) => {
        // console.log({ response });
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();
    return dataSet;
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

  function getAverages(arr) {
    return tidy(
      arr,
      groupBy(
        ["formRef", "title", "category"],
        [summarize({ value: mean("score") })]
      )
    );
  }

  useEffect(() => {
    getData().then((data) => {
      console.log({ data });

      let joinedDataArr = data.fullResponses.map((datum) => {
        const question = data.fullForm.filter((el) => {
          return el.formRef == datum.formRef;
        });

        return {
          ...datum,
          category: question[0].category.trim(),
          title: question[0].title.trim(),
          persona: datum.persona.trim(),
        };
      });
      console.log({ joinedDataArr });
      setPersonas(data.personas);
      setRegions(data.regions);
      setRoles(data.roles);
      setPersonas2(data.personas);
      setRegions2(data.regions);
      setRoles2(data.roles);
      setCategories(data.categories);
      let tempDataSet = getAverages(joinedDataArr);
      tempDataSet.map((el) => {
        el.value = Math.floor(el.value * 10) / 10;
      });
      let tempCount = data.demoData.length;
      console.log({ tempCount });
      let tempFilter = { ...filters };
      tempFilter.count = tempCount;
      tempFilter.count2 = tempCount;
      setFilters(tempFilter);
      setDataSet(tempDataSet);
      setRawData(joinedDataArr);
      setInitialData(tempDataSet);
      setDemoData(data.demoData);
    });
  }, []);

  function handleAddFilter(filter, value) {
    let tempFilters = { ...filters };
    tempFilters[filter] = value;
    setFilters(tempFilters);
    console.log({ tempFilters, regions });
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
    console.log({ demoData2 });
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
    console.log({ filteredData, filteredData2, tempFilters });

    if (filterSet.persona || filterSet.role || filterSet.region) {
      tempFilters.count = count1;
    }
    // console.log({ filteredData2 });
    if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
      tempFilters.count2 = count2;
    }
    setFilters(tempFilters);
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
    // let tempFilters = { ...filterSet };
    // let count1 = filteredData.length;
    // let count2 = filteredData2.length;
    filteredData = getAverages(filteredData);
    filteredData2 = getAverages(filteredData2);
    getFilterCounts(filterSet);
    // setDataSet(filteredData);
    let tempData = [...initialData];
    if (filterSet.persona || filterSet.role || filterSet.region) {
      tempData = addFilteredData("value2", filteredData, tempData);
      //   tempFilters.count = count1;
    }
    // console.log({ filteredData2 });
    if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
      tempData = addFilteredData("value3", filteredData2, tempData);
      //   tempFilters.count2 = count2;
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
    tempFilters["count" + filter] = demoData.length;
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

  function roundAverages(arr) {
    let newArr = arr.map((el) => {
      console.log({ el });
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

  return (
    <div>
      {dataSet && (
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
      )}

      {dataSet && (
        <div className="h-80 w-full mt-28">
          <h3
            className="text-2xl font-semibold ml-14"
            style={{ color: ALLCOLOR }}
          >
            All Response Averages
          </h3>
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
                dataKey="title"
                type="category"
                tick={false}
                scale="band"
              ></XAxis>
              <Tooltip />
              <Legend />
              <Bar
                // isAnimationActive={false}
                // data={initialData}
                // fill={"#0E6AAD"}
                name={"All Respondents"}
                dataKey={"value"}
                fill={ALLCOLOR}
                onClick={(e) => {
                  //   console.log({ e });
                  setCurrentModal(e.payload);
                  console.log({ e });
                  document.getElementById("question-modal").showModal();
                }}
              />

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
      )}
      <div className="mx-14 mt-10 flex justify-between">
        <h3 className="text-2xl font-semibold " style={{ color: ALLCOLOR }}>
          Responses By Category
        </h3>
        <button
          onClick={() => document.getElementById("category-modal").showModal()}
          className="bg-blue-400 p-2 text-white rounded"
        >
          See Category Breakout
        </button>
      </div>
      <div className="flex mt-8">
        <div className="h-[350px] w-1/3 flex flex-col items-center ">
          {initialData && (
            <>
              <div>All Respondents</div>
              <RadarMaturity
                color={ALLCOLOR}
                dataSet={initialData}
                keyVal="value"
              />
            </>
          )}
        </div>
        <div className="h-[350px] w-1/3 flex flex-col items-center ">
          {dataSet && dataSet[0].value2 != undefined && (
            <>
              <div>
                {" "}
                {(filters.persona
                  ? filters.persona + " Respondents "
                  : "Respondents ") +
                  (filters.role ? "who are " + filters.role : "") +
                  (filters.region ? " from " + filters.region : "")}
              </div>
              <RadarMaturity
                color={FILTER1COLOR}
                dataSet={dataSet}
                keyVal="value2"
              />
            </>
          )}
        </div>
        <div className="h-[350px] w-1/3 flex flex-col items-center ">
          {dataSet && dataSet[0].value3 != undefined && (
            <>
              <div>
                {" "}
                {(filters.persona2
                  ? filters.persona2 + " Respondents "
                  : "Respondents ") +
                  (filters.role2 ? "who are " + filters.role2 : "") +
                  (filters.region2 ? " from " + filters.region2 : "")}
              </div>
              <RadarMaturity
                color={FILTER2COLOR}
                dataSet={dataSet}
                keyVal="value3"
              />
            </>
          )}
        </div>
      </div>
      <h3
        className="text-2xl font-semibold ml-14 mt-10"
        style={{ color: ALLCOLOR }}
      >
        Low Scoring Questions
      </h3>
      <div className="flex">
        {initialData && (
          <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
            <div>Low Scoring: All Respondents</div>
            <HighLow
              type="low"
              num={3}
              dataSet={dataSet}
              keyValue="value"
              color={ALLCOLOR}
              setCurrentQuestion={setCurrentQuestion}
            />
          </div>
        )}
        <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
          {dataSet && dataSet[0].value2 && (
            <>
              <div>
                {"Low Scoring: " +
                  (filters.persona
                    ? filters.persona + " Respondents "
                    : "Respondents ") +
                  (filters.role ? "who are " + filters.role : "") +
                  (filters.region ? " from " + filters.region : "")}
              </div>
              <HighLow
                type="low"
                num={3}
                dataSet={dataSet}
                keyValue="value2"
                color={FILTER1COLOR}
              />
            </>
          )}
        </div>
        {dataSet && dataSet[0].value3 && (
          <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
            <div>
              {"Low Scoring: " +
                (filters.persona2
                  ? filters.persona2 + " Respondents "
                  : "Respondents ") +
                (filters.role2 ? "who are " + filters.role2 : "") +
                (filters.region2 ? " from " + filters.region2 : "")}
            </div>
            <HighLow
              type="low"
              num={3}
              dataSet={dataSet}
              keyValue="value3"
              color={FILTER2COLOR}
            />
          </div>
        )}
      </div>
      <h3
        className="text-2xl font-semibold ml-14 mt-10"
        style={{ color: ALLCOLOR }}
      >
        High Scoring Questions
      </h3>
      <div className="flex">
        {initialData && (
          <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
            <div>High Scoring: All Respondents</div>
            <HighLow
              type="high"
              num={3}
              dataSet={dataSet}
              keyValue="value"
              color={ALLCOLOR}
            />
          </div>
        )}
        <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
          {dataSet && dataSet[0].value2 && (
            <>
              <div>
                {"High Scoring: " +
                  (filters.persona
                    ? filters.persona + " Respondents "
                    : "Respondents ") +
                  (filters.role ? "who are " + filters.role : "") +
                  (filters.region ? " from " + filters.region : "")}
              </div>
              <HighLow
                type="high"
                num={3}
                dataSet={dataSet}
                keyValue="value2"
                color={FILTER1COLOR}
              />
            </>
          )}
        </div>
        {dataSet && dataSet[0].value3 && (
          <div className="mt-10 h-[300px] w-1/3 flex flex-col items-center justify-between">
            <div>
              {"High Scoring: " +
                (filters.persona2
                  ? filters.persona2 + " Respondents "
                  : "Respondents ") +
                (filters.role2 ? "who are " + filters.role2 : "") +
                (filters.region2 ? " from " + filters.region2 : "")}
            </div>
            <HighLow
              type="Low"
              num={3}
              dataSet={dataSet}
              keyValue="value3"
              color={FILTER2COLOR}
            />
          </div>
        )}
      </div>
      {/* {dataSet &&
        dataSet.map((el, index) => {
          //   console.log(el);
          return (
            <div key={index}>
              {"title: " +
                el.title +
                "   score: " +
                Math.floor(el.value * 10) / 10}
            </div>
          );
        })} */}
      <dialog id="question-modal" className="modal">
        {currentModal && (
          <div className="modal-box w-full max-w-full max-h-full h-full">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="z-50 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            {/* {dataSet && (
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
            )} */}

            <div className="bg-[#BDE3F9] w-3/5 p-10 ml-14 mt-24 mb-4">
              <div className="font-bold text-xs">Question:</div>
              <h3
                className="font-semibold text-2xl   leading-10 bg-[#BDE3F9] "
                style={{ color: ALLCOLOR }}
              >
                {currentModal.title}
              </h3>
            </div>
            {/* <p className="py-4">Click the button below to close</p> */}
            <div className="flex justify-center gap-20">
              <div className="flex flex-col items-center">
                <div className="w-[80%] mb-10">
                  <div
                    className="text-xl font-bold"
                    style={{ color: ALLCOLOR }}
                  >
                    {currentModal.category}
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Audience</th>
                        <th>Score</th>
                        <th>No. Responses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="flexitems-center ">
                          <div
                            className="w-3 h-2 "
                            style={{ backgroundColor: ALLCOLOR }}
                          ></div>
                        </td>
                        <td>All Respondents</td>

                        <td>{currentModal.value}</td>
                        <td>{demoData.length}</td>
                      </tr>
                      <tr>
                        <td className="flexitems-center ">
                          <div
                            className="w-3 h-2 "
                            style={{ backgroundColor: FILTER1COLOR }}
                          ></div>
                        </td>
                        <td>
                          {(filters.persona
                            ? filters.persona + " Respondents "
                            : "Respondents ") +
                            (filters.role ? "who are " + filters.role : "") +
                            (filters.region ? " from " + filters.region : "")}
                        </td>

                        <td>{currentModal.value2}</td>
                        <td>{filters.count}</td>
                      </tr>
                      <tr>
                        <td className="flexitems-center ">
                          <div
                            className="w-3 h-2 "
                            style={{ backgroundColor: FILTER2COLOR }}
                          ></div>
                        </td>
                        <td>
                          {(filters.persona2
                            ? filters.persona2 + " Respondents "
                            : "Respondents ") +
                            (filters.role2 ? "who are " + filters.role2 : "") +
                            (filters.region2 ? " from " + filters.region2 : "")}
                        </td>

                        <td>{currentModal.value3}</td>
                        <td>{filters.count2}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ModalBar
                  currentModal={currentModal}
                  allColor={ALLCOLOR}
                  filterOne={FILTER1COLOR}
                  filterTwo={FILTER2COLOR}
                  filters={filters}
                />
              </div>
              <div>
                <div className="mt-10">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Persona</th>
                        <th>Score</th>
                        <th>No. Respondents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personas.map((persona, index) => {
                        let personaScore = rawData.filter((el) => {
                          return (
                            el.formRef == currentModal.formRef &&
                            el.persona == persona
                          );
                        });
                        let count = personaScore.length;
                        personaScore = getAverages(personaScore);
                        // personaScore = roundAverages(personaScore);
                        // console.log({ personaScore });
                        return (
                          <tr className="hover" key={index + persona}>
                            <td>{persona}</td>
                            <td>
                              {personaScore &&
                                personaScore[0] &&
                                Math.floor(personaScore[0].value * 10) / 10}
                            </td>
                            <td>{count}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-10">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Score</th>
                        <th>No. Respondents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role, index) => {
                        let roleScore = rawData.filter((el) => {
                          return (
                            el.formRef == currentModal.formRef &&
                            el.role == role
                          );
                        });
                        let count = roleScore.length;
                        roleScore = getAverages(roleScore);
                        // personaScore = roundAverages(personaScore);
                        // console.log({ personaScore });
                        return (
                          <tr className="hover" key={index + role}>
                            <td>{role}</td>
                            <td>
                              {roleScore &&
                                roleScore[0] &&
                                Math.floor(roleScore[0].value * 10) / 10}
                            </td>
                            <td>{count}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-10">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Regions</th>
                        <th>Score</th>
                        <th>No. Respondents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regions.map((persona, index) => {
                        let personaScore = rawData.filter((el) => {
                          return (
                            el.formRef == currentModal.formRef &&
                            el.region == persona
                          );
                        });
                        let count = personaScore.length;
                        personaScore = getAverages(personaScore);
                        // personaScore = roundAverages(personaScore);
                        // console.log({ personaScore });
                        return (
                          <tr className="hover" key={index + persona}>
                            <td>{persona}</td>
                            <td>
                              {personaScore &&
                                personaScore[0] &&
                                Math.floor(personaScore[0].value * 10) / 10}
                            </td>
                            <td>{count}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-action">
              {/* <form method="dialog">
             
                <button className="btn">Close</button>
              </form> */}
            </div>
          </div>
        )}
      </dialog>
      <dialog id="category-modal" className="modal">
        <div className="modal-box w-full max-w-[100vw] max-h-full h-[100vh]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="z-50 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {dataSet && (
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
          )}
          <div className="w-full h-full ">
            {dataSet && demoData && filters && rawData && (
              <ModalCategories
                color2={FILTER1COLOR}
                color={ALLCOLOR}
                color3={FILTER2COLOR}
                dataSet={dataSet}
                keyVal="value"
                keyVal2="value2"
                keyVal3="value3"
                type="category"
                filters={filters}
                demoData={demoData}
                rawData={rawData}
                personas={personas}
                roles={roles}
                regions={regions}
                categories={categories}
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
