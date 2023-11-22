import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tidy, groupBy, summarize, mean, TMath, count } from "@tidyjs/tidy";
import { ALLCOLOR, FILTER1COLOR, FILTER2COLOR } from "../Utils.jsx/Functions";
import TechStats from "./TechStats";
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

export default function Technology({ TFID }) {
  const [rawData, setRawData] = useState();
  const [initialData, setInitialData] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataSet2, setDataSet2] = useState();
  const [personas2, setPersonas2] = useState();
  const [roles2, setRoles2] = useState();
  const [regions2, setRegions2] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [demoData, setDemoData] = useState();
  const [localTFID, setLocalTFID] = useState();

  const [filters2, setFilters2] = useState({
    persona: false,
    role: false,
    region: false,
  });

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
  const [frequencies, setFrequencies] = useState();
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

  //   console.log(TFID);
  //   const ALLCOLOR = "#0E6AAD";
  //   const FILTER1COLOR = "#FFCB18";
  //   const FILTER2COLOR = "#0EA8DC";

  //   console.log({ requestOptions });
  //   console.log(process.emitWarning.NODE_ENV);
  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData(techID) {
    const responses = await fetch(
      mimir_url + "tf-responses/" + techID,
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
    let tempTechID = TFID ? TFID : routeParams.tfid;
    console.log({ tempTechID });
    getData(tempTechID).then((data) => {
      //   console.log({ data });

      let joinedDataArr = data.fullResponses.map((datum) => {
        const question = data.fullForm.filter((el) => {
          return el.formRef == datum.formRef;
        });

        return {
          ...datum,
          category: question[0].category.trim(),
          title: question[0].title
            .trim()
            .replace("Please rate your user experience.", "User Experience")
            .replace(
              "Please rate your satisfaction with the tool's reporting capabilities.",
              "Reporting"
            )
            .replace(
              "How would you rate the data's accuracy in this platform?",
              "Data Accuracy"
            ),
          persona: datum.persona
            .replace(
              ": (Executive, Business Development, Marketing or Communication)",
              ""
            )
            .trim(),
        };
      }, []);

      let tempFrequencies = joinedDataArr.filter((el) =>
        el.formRef.includes("frequency")
      );

      const ratings = joinedDataArr.filter(
        (el) => !el.formRef.includes("frequency")
      );

      //   console.log({ tempFrequencies, ratings });
      //   console.log(data.personas);

      setPersonas(data.personas);
      setRegions(data.regions);
      setRoles(data.roles);
      setPersonas2(data.personas);
      setRegions2(data.regions);
      setRoles2(data.roles);
      setCategories(data.categories.map((el) => el.trim()));
      let tempDataSet = getAverages(ratings);

      setFrequencies(tempFrequencies);
      //   console.log({ tempDataSet });
      setDataSet(tempDataSet);
      setRawData(ratings);
      setInitialData(tempDataSet);
      setDemoData(data.demoData);
    });
  }, []);

  return (
    <>
      <div className="">
        {dataSet &&
          rawData &&
          frequencies != undefined &&
          personas != undefined &&
          demoData &&
          categories &&
          categories.map((el, index) => {
            let thisData = rawData.filter((datum) => datum.category == el);
            let thisFrequencies = frequencies.filter(
              (datum) => datum.category == el
            );

            if (thisData.length)
              return (
                <TechStats
                  key={el + index}
                  data={thisData}
                  frequencies={thisFrequencies}
                  tech={el}
                  ALLCOLOR={ALLCOLOR}
                  FILTER1COLOR={FILTER1COLOR}
                  FILTER2COLOR={FILTER2COLOR}
                  rawPersonas={personas}
                  rawRegions={regions}
                  rawRoles={roles}
                  localDemoData={demoData}
                />
              );
            else return <></>;
          })}
      </div>
    </>
  );
}
