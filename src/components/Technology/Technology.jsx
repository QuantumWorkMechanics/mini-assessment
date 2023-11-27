import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tidy, groupBy, summarize, mean, TMath, count } from "@tidyjs/tidy";
import { ALLCOLOR, FILTER1COLOR, FILTER2COLOR } from "../Utils.jsx/Functions";
import TechStats from "./TechStats";
import LoadSpinner from "../Utils.jsx/LoadSpinner";

export default function Technology({ TFID }) {
  const [rawData, setRawData] = useState();
  const [dataSet, setDataSet] = useState();
  const routeParams = useParams();
  const [personas, setPersonas] = useState();
  const [roles, setRoles] = useState();
  const [regions, setRegions] = useState();
  const [categories, setCategories] = useState();

  const [frequencies, setFrequencies] = useState();

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
      });

      let tempFrequencies = joinedDataArr.filter((el) =>
        el.formRef.includes("frequency")
      );

      const ratings = joinedDataArr.filter(
        (el) => !el.formRef.includes("frequency")
      );

      let tempDataSet = getAverages(ratings);
      setDataSet(tempDataSet);
      setPersonas(data.personas);
      setRegions(data.regions);
      setRoles(data.roles);
      setCategories(data.categories.map((el) => el.trim()));
      setFrequencies(tempFrequencies);
      setRawData(ratings);
    });
  }, []);

  return (
    <>
      <div className="">
        {!dataSet && (
          <div className="">
            <LoadSpinner />
          </div>
        )}
        {dataSet &&
          rawData &&
          frequencies != undefined &&
          personas != undefined &&
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
                />
              );
            else return <></>;
          })}
      </div>
    </>
  );
}
