import { divide, slice } from "lodash";
import React, { useState, useEffect } from "react";
import { createTypeform } from "../Utils.jsx/questionGroup";
import { compList, formPersonaList } from "../Utils.jsx/questionList";
import { addItems } from "@tidyjs/tidy";
import { light } from "@mui/material/styles/createPalette";
import {
  strategy,
  service,
  data,
  process,
  technology,
} from "../TechComparison/lists";
import { frictionData } from "../Utils.jsx/FrictionData";
// import { splitOut } from "onefish-twofish";
import {
  filterData,
  expandNested,
  splitOut,
  aggregateThing,
  cloneThing,
} from "../Utils.jsx/Awry";

export default function CreateForms() {
  const [techRaw, setTechRaw] = useState();
  const [tech, setTech] = useState();
  const [form, setForm] = useState();
  const [personasRaw, setPersonasRaw] = useState();
  const [formPersonas, setFormPersonas] = useState();
  const [titleRaw, setTitleRaw] = useState();
  const [formTitle, setFormTitle] = useState();
  const [formID, setFormID] = useState();
  let compareForm;

  // function splitOut(arr, filterArr, field, newField) {
  //   let tempData = [];
  //   arr.map((datum) => {
  //     let tempDatum = { ...datum };
  //     let tempItems;
  //     if (Array.isArray(tempDatum[field]) && tempDatum[field].length) {
  //       tempItems = tempDatum[field].filter((arrItem) => {
  //         return filterArr.includes(arrItem);
  //       });
  //     }
  //     tempDatum[newField] = tempItems;
  //     tempData = [...tempData, tempDatum];
  //   });
  //   return tempData;
  // }

  let splitTest = splitOut(
    frictionData,
    ["North America", "EMEA", "APACx", "Global"],
    "Tags",
    "region"
  );

  let splitTwo = splitOut(
    splitTest,
    [
      "PM: Tech",
      "PM: Service Design",
      "PM: Data",
      "PM: Strategy",
      "PM: Process",
    ],
    "Tags",
    "pillar"
  );

  // let expanded = expandNested(splitTwo, "region");
  // let expanded2 = expandNested(expanded, "pillar");

  // console.log({ expanded2 });

  function flattenForm(data) {
    let tempData = [];
    data = data.map((datum, index) => {
      let tempDatum = [];
      let tempTags = String(datum.Tags).split("\n").toString();
      datum.Tags = tempTags.split(",");
      let tempRegions = datum.Tags.filter(
        (tag) =>
          tag == "North America" ||
          tag == "EMEA" ||
          tag == "APACx" ||
          tag == "India" ||
          tag == "Global"
      );
      let tempPillar = datum.Tags.filter(
        (tag) =>
          tag == "PM: Tech" ||
          tag == "PM: Strategy" ||
          tag == "PM: Service Design" ||
          tag == "PM: Data" ||
          tag == "PM: Process"
      );
      let tempFP = datum.Tags.filter(
        (tag) =>
          tag != "North America" &&
          tag != "EMEA" &&
          tag != "APACx" &&
          tag != "India" &&
          tag != "Global" &&
          tag != "PM: Tech" &&
          tag != "PM: Strategy" &&
          tag != "PM: Service Design" &&
          tag != "PM: Data" &&
          tag != "PM: Process"
      );
      datum.Regions = tempRegions;
      datum.Pillar = tempPillar;
      datum.FrictionPoints = tempFP;

      // if (!datum.Pillar.length) {
      //   console.log({ datum });
      // }

      if (datum.Regions.length && Array.isArray(datum.Regions)) {
        let regions = [...datum.Regions];

        let tempDatum4 = regions.map((region) => {
          let tempDatum = { ...datum };
          tempDatum.Regions = region;
          return tempDatum;
        });
        tempData = [...tempData, ...tempDatum4];
      } else {
        tempData = [...tempData, datum];
      }

      return datum;
    });

    // console.log({ tempData });
    return tempData;
  }

  let flattenedForm = flattenForm(frictionData);
  let test = "" == null;
  console.log({ test });

  let dataArr = [
    {
      region: "North America",
      type: "one",
      value: 6,
      value2: 5,
      arr: [4, 3, 6],
      textArr: ["two fish"],
    },
    {
      region: "North America",
      type: "one",
      value: 4,
      value2: 5,
      arr: [4, 3, 6],
      textArr: ["one fish"],
    },
    {
      region: "North America",
      type: "two",
      value: 4,
      value2: 50,
      arr: [4, 2, 6],
      textArr: ["one fish", "two fish", "red fish"],
    },
    {
      region: "EMEA",
      type: "one",
      value: 2,
      value2: 6,
      arr: [4],
      textArr: ["one fish"],
    },
    {
      region: "North America",
      type: "",
      value: 3,
      value2: 6,
      arr: [4, 3, 2, 6],
      textArr: ["one fish", "two fish"],
      object1: { subitem1: "redFish", subItem2: { blue: "fish", one: "fish" } },
    },
    {
      region: "North America",
      type: null,
      value: 3,
      value2: 6,
      arr: [4, 3, 2, 6],
      textArr: ["one fish", "two fish"],
    },
  ];

  let newThing = cloneThing(dataArr[4]);
  let shallow = dataArr[4];

  shallow.object1.subItem2.blue = "red fish";
  newThing.object1.subItem2.blue = "blue fish";

  console.log({ newThing });
  console.log(dataArr[4]);

  let testFilters = [
    { field: "region", operation: "===", value: "North America" },
    { field: "type", operation: "===", value: "" },
  ];

  let filteredTest = filterData(dataArr, testFilters, [{ operation: "count" }]);

  let testAgg = aggregateThing(
    dataArr,
    ["region", "type"],
    [{ operation: "count" }]
  );
  console.log({ testAgg });

  // console.log({ filteredTest });

  // console.log(`test: ${null === ""}`);

  function groupBy(arr, groupArr) {
    let vals = {};
    groupArr.map((item) => {
      if (!vals[item]) vals[item] = [];
      arr.map((el) => {
        if (
          vals[item].includes(el[item]) ||
          Array.isArray(el[item] && el[item].length === 0)
        )
          return;
        else vals[item].push(el[item]);
      });
    });
    let tempVals = [{ ...vals }];
    let resultArr = [];
    let length = Object.keys(vals).length;
    let i = 0;
    for (const prop in vals) {
      // console.log({ i });
      i++;
      tempVals = expandNested(tempVals, [prop]);
      // console.log({ tempVals });
      if (i === length) resultArr = resultArr.concat(tempVals);
    }
    // console.log({ resultArr });
    return resultArr;
  }

  let agg = [
    { field: "value", operation: "%<=4" },
    { field: "value2", operation: "sum" },
  ];

  // let aggregatedData = aggregateThing(expanded2, ["region", "pillar"]);
  // let aggregatedData2 = aggregate(expanded2, ["region", "pillar"]);
  // console.log({ aggregatedData, aggregatedData2 });

  function aggregate(arr, groupArr, aggObj = [{ operation: "count" }]) {
    if (Array.isArray(aggObj) && !aggObj.includes({ operation: "count" })) {
      aggObj.push({ operation: "count" });
    } else {
      aggObj = [aggObj, { operation: "count" }];
    }

    // console.log({ aggObj });

    let groups = groupBy(arr, groupArr);
    let filterArr = groups.map((group) => {
      let filters = [];
      for (const key in group) {
        const tempFilter = { field: key, operation: "===", value: group[key] };
        filters.push(tempFilter);
      }
      return filters;
    });
    // console.log({ filterArr, groups });

    let dataArrs = filterArr.map((filter) => {
      // console.log({ filter });

      return filterData(arr, filter);
    });

    // console.log({ dataArrs });
    dataArrs.map((data, index) => {
      if (!Array.isArray(aggObj)) return addAggregates(data, aggObj, index);
      return aggObj.map((agg) => addAggregates(data, agg, index));
    });
    // console.log({ groups });

    function addAggregates(data, aggObj, index) {
      let tempItem;
      if (aggObj.operation === "average") tempItem = average(data, aggObj);
      if (aggObj.operation.slice(0, 1) === "%") {
        tempItem = percentOf(data, aggObj);
      }
      if (aggObj.operation === "count") tempItem = { count: data.length };
      if (aggObj.operation === "sum") tempItem = sumAgg(data, aggObj);
      groups[index] = {
        ...groups[index],
        [Object.keys(tempItem)[0]]: Object.values(tempItem)[0],
      };
    }

    function average(arr, aggObj) {
      const avg =
        arr.reduce(
          (total, accumulator) => total + accumulator[aggObj.field],
          0
        ) / arr.length;
      // console.log({ avg });
      let val = {
        [aggObj.operation + "_of_" + aggObj.field]: isNaN(avg) ? "N/A" : avg,
      };
      return val;
    }

    function percentOf(arr, aggObj) {
      // console.log(aggObj.operation);
      let sliceVal = aggObj.operation.slice(2, 3) === "=" ? 3 : 2;
      let operation = aggObj.operation.slice(1, sliceVal);
      let value = aggObj.operation.slice(sliceVal);

      let filter = filterData(arr, [{ field: aggObj.field, operation, value }]);
      let percent = (filter.length / arr.length) * 100;
      let string = `%_${aggObj.field}_${operation
        .replace(">", "greater_than")
        .replace("<", "less_than")
        .replace("=", "_or_equalling")}_${value}`;
      let val = {
        [string]: percent,
      };
      return val;
    }

    function sumAgg(arr, aggObj) {
      console.log({ arr });
      const sum = arr.reduce((total, item) => total + item[aggObj.field], 0);
      const val = { ["sum_of_" + aggObj.field]: sum };
      return val;
    }
    return groups;
  }

  // let newObj = { ...dataArr[3] };

  // newObj.object1.subItem2 = flattenObject(dataArr[3].object1.subItem2);

  // let testFlat = flattenObject(dataArr[3]);

  // console.log({ testFlat });

  // console.log({ newObj });

  let filterArr = [
    { field: "region", operation: "===", value: "North America" },
    { field: "type", operation: "===", value: "one" },
    // {
    //   field: ["region", "type"],
    //   operation: "or",
    //   value: ["North America", "one"],
    // },
  ];

  // // function filterDataSet(dataArr, filterArr) {
  // //   let tempResult = [...dataArr];
  // //   filterArr.map((filter) => {
  // //     let tempDatum = tempResult.filter((item) => {
  // //       if (filter.operation == "==") return item[filter.field] == filter.value;
  // //       if (filter.operation == ">=") return item[filter.field] >= filter.value;
  // //       if (filter.operation == "<=") return item[filter.field] <= filter.value;
  // //       if (filter.operation == "===")
  // //         return item[filter.field] === filter.value;
  // //       if (filter.operation == ">") return item[filter.field] > filter.value;
  // //       if (filter.operation == "<") return item[filter.field] < filter.value;
  // //       if (filter.operation == "includes")
  // //         return item[filter.field].includes(filter.value);
  // //     });

  // //     tempResult = [...tempDatum];

  // //     // console.log({ tempResult });
  // //   });
  // //   console.log({ tempResult });
  // //   return tempResult;
  // // }

  let tempSet = filterData(dataArr, filterArr);
  console.log({ tempSet });
  // function expandNested(arr, field, newField) {
  //   let tempResult = [];
  //   arr.map((item) => {
  //     if (Array.isArray(item[field]) && item[field].length) {
  //       let items = [...item[field]];

  //       let tempDatum = items.map((datum) => {
  //         let tempItem = { ...item };
  //         if (newField) {
  //           tempItem[newField] = datum;
  //         }
  //         if (!newField) {
  //           tempItem[field] = datum;
  //         }
  //         return tempItem;
  //       });
  //       tempResult = [...tempResult, ...tempDatum];
  //     } else {
  //       if (newField) {
  //         item[newField] = item[field];
  //       }
  //       tempResult = [...tempResult, item];
  //     }
  //   });

  //   return tempResult;
  // }

  let testArr = expandNested(flattenedForm, "Pillar", "onePillar");
  let test2Arr = expandNested(testArr, "FrictionPoints", "testFP");

  // console.log({ testArr, test2Arr });
  function flattenAgain(data) {
    let tempData = [];
    data.map((datum) => {
      if (Array.isArray(datum.Pillar) && datum.Pillar.length) {
        if (!datum.Pillar.length) {
          // console.log({ datum });
        }
        let pillars = [...datum.Pillar];

        // console.log(datum.Pillar);
        let tempDatum2 = pillars.map((region) => {
          let tempDatum = { ...datum };
          tempDatum.Pillar = region;
          return tempDatum;
        });
        tempData = [...tempData, ...tempDatum2];
      } else {
        tempData = [...tempData, datum];
      }

      return tempData;
    });

    let finalData = [];
    tempData.map((datum) => {
      if (Array.isArray(datum.FrictionPoints) && datum.FrictionPoints.length) {
        let frictions = [...datum.FrictionPoints];
        // console.log(datum.FrictionPoints);
        let tempDatum3 = frictions.map((region) => {
          let tempDatum = { ...datum };
          tempDatum.FrictionPoints = region;
          return tempDatum;
        });
        finalData = [...finalData, ...tempDatum3];
      } else {
        finalData = [...finalData, datum];
      }
    });
    // console.log({ finalData });
  }

  let reallyFlat = flattenAgain(flattenedForm);

  //   console.log({ requestOptions });
  //   console.log(process.emitWarning.NODE_ENV);
  //   const mimir_url = "https://mimir-production.up.railway.app/";
  const mimir_url = "http://localhost:3000/";
  async function getData(requestOptions) {
    const responses = await fetch(
      mimir_url + "create-typeform",
      requestOptions
    );

    const jsonData = await responses.json();

    return { responses, jsonData };
  }

  function createSomeQuestions(questionList, pillar) {
    return questionList.map((el, index) => {
      let question = {
        title: el,
        ref: "question_" + pillar + index,
        properties: {
          start_at_one: true,
          steps: 5,
          labels: {
            left: "Highly Disagree",
            // center: "Neither satisfied nor dissatisfied",
            right: "Highly Agree",
          },
        },
        validations: {
          required: false,
        },
        type: "opinion_scale",
      };
      return question;
    });
  }

  function createGroup(pillar, shortName, list) {
    // console.log({ list });
    let questions = createSomeQuestions(list, shortName);
    return {
      title: pillar,
      ref: shortName,
      properties: {
        button_text: "Continue",
        show_button: true,
        fields: questions,
      },
      type: "group",
      layout: {
        attachment: {
          type: "image",
          href: "https://images.typeform.com/images/WMALzu59xbXQ",
        },
        type: "stack",
        viewport_overrides: {},
      },
    };
  }

  const stratGroup = createGroup("Strategy", "strategy", strategy);
  const serviceGroup = createGroup("Service Design", "service", service);
  const processGroup = createGroup("Process", "process", process);
  const dataGroup = createGroup("Data", "data", data);
  const techGroup = createGroup("Technology", "tech", technology);

  // console.log([stratGroup, serviceGroup, processGroup, dataGroup, techGroup]);

  async function handleSend() {
    compareForm = createTypeform(formTitle, tech, formPersonas);
    // console.log({ compareForm });
    // let compareForm = { ...form };
    // console.log({ compareForm });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compareForm),
    };
    const response = await getData(requestOptions);

    if (response.jsonData) setFormID(response.jsonData.id);
    // console.log(response);
  }

  function handleTech() {
    const tempPersonaArr = personasRaw.split(",");
    const tempTechArr = techRaw.split(",");
    // console.log(tech);
    let techList = tempTechArr.map((item) => {
      return {
        label: item,
        ref: item.replace(/[^A-Z0-9]/gi, "-").toLowerCase(),
      };
    });
    let personaList = tempPersonaArr.map((item) => {
      return {
        label: item,
        ref: item.replace(/[^A-Z0-9]/gi, "-").toLowerCase(),
      };
    });
    // console.log({ techList });
    setFormPersonas(personaList);
    setTech(techList);
  }

  function handlePersonas() {
    const tempPersonaArr = personasRaw.split(",");
    // console.log(tech);
    let personaList = tempPersonaArr.map((item) => {
      return {
        label: item,
        ref: item.replace(/[^A-Z0-9]/gi, "-").toLowerCase(),
      };
    });
    // console.log({ personaList });

    setFormPersonas(personaList);
  }

  return (
    <>
      <div className="grid">
        <div>
          <div>{"Title: " + ((formTitle != undefined && formTitle) || "")}</div>
          <div>
            <ul className="flex flex-col">
              Technologies
              {tech && tech.map((item) => <li key={item.ref}>{item.label}</li>)}
            </ul>
          </div>
          <div>
            <ul className="flex flex-col">
              Personas
              {formPersonas &&
                formPersonas.map((item) => (
                  <li key={item.ref}>{item.label}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 md:w-[40%]  p-4 border-2 rounded">
          <div className="w-full flex justify-between">
            <label htmlFor="formTitle">Title</label>
            <input
              className="input input-bordered w-[70%]"
              onChange={(e) => {
                setFormTitle(e.target.value);
              }}
              type="text"
              name="formTitle"
              id=""
            />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="technology-inputs">Technologies</label>
            <textarea
              className="border-2 textarea textarea-bordered w-[70%]"
              name="technology-inputs"
              id=""
              //   cols="30"
              //   rows="10"
              onChange={(e) => {
                setTechRaw(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="persona-inputs">Personas </label>
            <textarea
              className="textarea textarea-bordered w-[70%]"
              name="persona-inputs"
              id=""
              //   cols="30"
              //   rows="10"
              onChange={(e) => {
                setPersonasRaw(e.target.value);
              }}
            ></textarea>
          </div>
          <button className="border-2" type="button" onClick={handleTech}>
            Add Form Details
          </button>
          {tech && formPersonas && formTitle && (
            <button className="border-2" type="button" onClick={handleSend}>
              SEND
            </button>
          )}
        </div>
        {formID && (
          <>
            <div>
              typeForm available at:{" "}
              <a href={"https://6zjk3zh3tb8.typeform.com/to/" + formID}>
                {"https://6zjk3zh3tb8.typeform.com/to/" + formID}
              </a>
            </div>
            <div>
              Dashboard available at:{" "}
              <a
                href={
                  "https://www.quantumworkmechanics.com/#/tech-compare/" +
                  formID
                }
              >
                {"https://www.quantumworkmechanics.com/#/tech-compare/" +
                  formID}
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
