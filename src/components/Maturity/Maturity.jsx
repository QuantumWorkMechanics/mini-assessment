import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCategoryBreakout,
  getAverages,
  ALLCOLOR,
  FILTER1COLOR,
  FILTER2COLOR,
  runDynamicFilter,
  addCountsToFilters,
  addAndAverageFilteredData,
} from "../Utils.jsx/Functions";
import { tidy, distinct } from "@tidyjs/tidy";
import ModalCategories from "./ModalCategories";
import Controls from "./Controls";
import Overview from "./Overview";
import HighOrLow from "./HighOrLow";
import Technology from "../Technology/Technology";
import LoadSpinner from "../Utils.jsx/LoadSpinner";

export default function Maturity() {
  const [rawData, setRawData] = useState();
  const [initialData, setInitialData] = useState();
  const [dataSet, setDataSet] = useState();
  const [personas2, setPersonas2] = useState();
  const [roles2, setRoles2] = useState();
  const [regions2, setRegions2] = useState();
  const [maSubsection, setmaSubsection] = useState("overview");
  const [categoryBreakout, setCategoryBreakout] = useState();
  const routeParams = useParams();
  const [personas, setPersonas] = useState();
  const [roles, setRoles] = useState();
  const [regions, setRegions] = useState();
  const [categories, setCategories] = useState();
  const [currentSection, setCurrentSection] = useState("maturity");
  const [TFID, setTFID] = useState();
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

  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-responses/" + routeParams.tfid,
      requestOptions
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();
    return dataSet;
  }

  function handleFilter(filterName, arr, setArr, operator = "toggle") {
    let tempData = [...arr];
    if (operator == "right") {
      handleAddFilter(filterName, tempData[0]);
      let item = tempData.shift();
      tempData.push(item);
    }
    if (operator == "left") {
      let item = tempData.pop();
      tempData.unshift(item);
      handleAddFilter(filterName, tempData[tempData.length - 1]);
    }

    setArr(tempData);
  }

  useEffect(() => {
    getData().then((data) => {
      //   console.log({ data });

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

      console.log({ data });
      let techID = data.typeForm.thankyou_screens.filter((el) =>
        el.title.includes("https")
      )[0].title;

      techID = techID.split("#")[0].split("/");
      techID = techID[techID.length - 1];
      console.log({ techID });
      setTFID(techID);

      setPersonas(data.personas);
      setRegions(data.regions);
      setRoles(data.roles);
      setPersonas2(data.personas);
      setRegions2(data.regions);
      setRoles2(data.roles);
      setCategories(data.categories);
      let tempDataSet = getAverages(joinedDataArr);
      // tempDataSet.map((el) => {
      //   el.value = Math.floor(el.value * 10) / 10;
      // });

      let tempFilter = { ...filters };
      tempFilter.count = tidy(joinedDataArr, distinct("response_id")).length;
      tempFilter.count2 = tidy(joinedDataArr, distinct("response_id")).length;
      setFilters(tempFilter);
      setDataSet(tempDataSet);
      setRawData(joinedDataArr);
      setInitialData(tempDataSet);

      let tempCat = getCategoryBreakout(tempDataSet);

      setCategoryBreakout(tempCat);
    });
  }, []);

  function handleAddFilter(filter, value) {
    let tempFilters = { ...filters };
    tempFilters[filter] = value;
    setFilters(tempFilters);

    runFilters(tempFilters);
  }

  //   function getFilterCounts(filterSet) {
  //     const demoData2 = demoData.map((el) => {
  //       el.persona = el.persona.replace(
  //         ": (Executive, Business Development, Marketing or Communication)",
  //         ""
  //       );
  //       return el;
  //     });

  //     const filterList = ["persona", "role", "region"];
  //     let tempFilteredData = runDynamicFilter(filterList, filterSet, demoData2);
  //     let tempFilters = { ...filterSet };

  //     if (filterSet.persona || filterSet.role || filterSet.region) {
  //       tempFilters.count = tempFilteredData.filterOne.length;
  //     }
  //     if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
  //       tempFilters.count2 = tempFilteredData.filterTwo.length;
  //     }

  //     setFilters(tempFilters);
  //   }

  async function runFilters(filterSet) {
    let tempFilterSet = { ...filterSet };
    let filterList = ["persona", "role", "region"];
    const tempFilter = runDynamicFilter(filterList, filterSet, rawData);
    console.log({ tempFilter });
    const filteredData = getAverages(tempFilter.filterOne);
    const filteredData2 = getAverages(tempFilter.filterTwo);
    tempFilterSet = addCountsToFilters(tempFilterSet, tempFilter);

    // let tempData = [...initialData];
    // if (filterSet.persona || filterSet.role || filterSet.region) {
    //   tempData = addFilteredData("value2", filteredData, tempData);
    // }

    // if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
    //   tempData = addFilteredData("value3", filteredData2, tempData);
    // }
    // tempData.map((el) => {
    //   if (el.value2) {
    //     el.value2 = Math.floor(el.value2 * 10) / 10;
    //   }
    //   if (el.value3) {
    //     el.value3 = Math.floor(el.value3 * 10) / 10;
    //   }
    //   return el;
    // });
    let tempData = addAndAverageFilteredData(
      initialData,
      filterSet,
      filteredData,
      filteredData2
    );
    setDataSet(tempData);
    let tempCat = getCategoryBreakout(tempData);
    setCategoryBreakout(tempCat);
    setFilters(tempFilterSet);
  }

  function handleClearFilters(filter = "") {
    let tempFilters = { ...filters };
    tempFilters["persona" + filter] = false;
    tempFilters["region" + filter] = false;
    tempFilters["role" + filter] = false;
    tempFilters["count" + filter] = false;
    setFilters(tempFilters);

    runFilters(tempFilters);
  }

  return (
    <div>
      <div className="tabs tabs-lifted mt-2 ml-2">
        <div
          style={{ backgroundColor: ALLCOLOR, color: "white" }}
          onClick={() => setCurrentSection("maturity")}
          className={
            "rounded-t-lg tab  bg-color w-24 p-1 mx-1 " +
            ((currentSection == "maturity" && "tab-active opacity-100 ") ||
              " opacity-40")
          }
        >
          Maturity
        </div>
        <div
          style={{ backgroundColor: ALLCOLOR, color: "white" }}
          onClick={() => setCurrentSection("technology")}
          className={
            "rounded-t-lg tab  " +
            ((currentSection == "technology" && "tab-active") || "opacity-40 ")
          }
        >
          Technology
        </div>
      </div>
      {!dataSet && <LoadSpinner />}
      {currentSection == "technology" && <Technology TFID={TFID} />}
      {currentSection == "maturity" && (
        <>
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
          <div className="tabs min-w-full m-2">
            <div
              onClick={() => setmaSubsection("overview")}
              className={
                "tab tab-lifted " + (maSubsection == "overview" && "tab-active")
              }
            >
              Overview
            </div>
            <div
              onClick={() => setmaSubsection("pillar")}
              className={
                "tab tab-lifted " + (maSubsection == "pillar" && "tab-active")
              }
            >
              Pillar Breakout
            </div>
            <div
              onClick={() => setmaSubsection("low")}
              className={
                "tab tab-lifted " + (maSubsection == "low" && "tab-active")
              }
            >
              Low Scoring
            </div>
            <div
              onClick={() => setmaSubsection("high")}
              className={
                "tab tab-lifted " + (maSubsection == "high" && "tab-active")
              }
            >
              High Scoring
            </div>
          </div>
          {maSubsection == "overview" && dataSet && (
            <Overview
              dataSet={dataSet}
              ALLCOLOR={ALLCOLOR}
              FILTER1COLOR={FILTER1COLOR}
              FILTER2COLOR={FILTER2COLOR}
              setCurrentModal={setCurrentModal}
              categoryBreakout={categoryBreakout}
              currentModal={currentModal}
              filters={filters}
              regions={regions}
              roles={roles}
              personas={personas}
              rawData={rawData}
            />
          )}

          {maSubsection == "low" && (
            <HighOrLow
              type="Low"
              dataSet={dataSet}
              filters={filters}
              personas={personas}
              regions={regions}
              roles={roles}
              rawData={rawData}
            />
          )}
          {maSubsection == "high" && (
            <HighOrLow
              type="High"
              dataSet={dataSet}
              filters={filters}
              personas={personas}
              regions={regions}
              roles={roles}
              rawData={rawData}
            />
          )}

          {maSubsection == "pillar" && (
            <div className="w-full h-full ">
              {dataSet && filters && rawData && (
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
                  rawData={rawData}
                  personas={personas}
                  roles={roles}
                  regions={regions}
                  categories={categories}
                  categoryBreakout={categoryBreakout}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
