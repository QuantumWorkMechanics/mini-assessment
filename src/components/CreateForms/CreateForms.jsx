import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import { createTypeform } from "../Utils.jsx/questionGroup";
import { compList, formPersonaList } from "../Utils.jsx/questionList";
import { addItems } from "@tidyjs/tidy";
import { light } from "@mui/material/styles/createPalette";

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
  //   console.log(compareForm);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(compareForm),
  //   };

  //   console.log({ requestOptions });
  //   console.log(process.emitWarning.NODE_ENV);
  //   const mimir_url = "https://mimir-production.up.railway.app/";
  const mimir_url = "http://localhost:3000/";
  async function getData(requestOptions) {
    const responses = await fetch(
      mimir_url + "create-typeform",
      requestOptions
    );
    //   .then((response) => {
    //     // response.body

    //     console.log(response.body);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log({ error });
    //   });

    const jsonData = await responses.json();
    console.log({ jsonData });
    // if (responses.ok) {
    //   responses.body = jsonData;
    // }
    return { responses, jsonData };
  }

  async function handleSend() {
    compareForm = createTypeform(formTitle, tech, formPersonas);
    console.log({ compareForm });
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
    console.log({ personaList });

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
