import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarGraph from "../Assessment/Assessment-result-components/BarGraph";
import FrequencyPie from "./FrequencyPie";
import NavBar from "../Navigation/NavBar";
import VerticalBarGraph from "./VerticalBar";
import LoadSpinner from "../Utils.jsx/LoadSpinner";
import TechDash from "./TechDash";
// import {
//   createQuestionGroups,
//   createLogic,
//   createFullLogicSet,
//   createTypeform,
// } from "../Utils.jsx/questionGroup";
// import { compList, formPersonaList } from "../Utils.jsx/questionList";

// const compList = [
//   { component: "Salesforce", componentShort: "salesforce" },
//   { component: "Hubspot", componentShort: "hubspot" },
//   { component: "Amp", componentShort: "amp" },
// ];

// createTypeform("test form", compList, formPersonaList);
// let fullLogic = createFullLogicSet(compList);
// let questionGroups = createQuestionGroups(compList);
// let logic = createLogic(compList);

// console.log({ questionGroups });

export default function FullDiagnosticResults() {
  const routeParams = useParams();
  const [data, setData] = useState();
  const [parentPersona, setParentPersona] = useState();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   console.log({ requestOptions });
  //   console.log(process.emitWarning.NODE_ENV);
  //   const mimir_url = "https://mimir-production.up.railway.app/";
  const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-techcompare/" + routeParams.tfid,
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

    // console.log({ dataSet });
    return dataSet;
  }

  useEffect(() => {
    getData().then((data) => {
      //   console.log({ data });
      setData(data);
    });
  }, []);

  const colorArr = ["#0E6AAD", "#0EA8DC", "#09497B", "#666666"];

  function handleParent(persona) {
    if (persona == undefined) {
      setParentPersona(null);
    } else setParentPersona(persona);
  }

  return (
    <>
      <div className="bg-[url('/public/dataReview.png')] bg-fixed bg-cover bg-no-repeat">
        <div className="-mt-3">
          <NavBar></NavBar>
          {!data && (
            <div className="w-20 flex flex-col gap-6 justify-center items-center h-screen w-screen">
              <div className="w-20 -mt-20">
                <LoadSpinner />
              </div>
              <div className="px-4 text-md lg:text-2xl text-white animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear">
                Hang tight... our quantum mechanics are fetching your results...
              </div>
            </div>
          )}
          {data &&
            data.categories.map((el, index) => {
              let tempPersonas = data.personas.map((el) => {
                return { persona: el };
              });
              //   console.log({ tempPersonas });
              const tempForm = data.fullForm.filter((question) => {
                return question.category == el;
              });
              //   console.log({ tempForm });
              return (
                <>
                  <TechDash
                    key={`${el}_dashKey`}
                    data={data}
                    colorArr={colorArr}
                    parentPersona={parentPersona}
                    tempPersonas={tempPersonas}
                    tempForm={tempForm}
                    handleParent={handleParent}
                    el={el}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
