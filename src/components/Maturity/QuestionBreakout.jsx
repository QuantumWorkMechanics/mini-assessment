import React, { useState, useEffect } from "react";
import { getAverages } from "../Utils.jsx/Functions";
import { ALLCOLOR, FILTER1COLOR, FILTER2COLOR } from "../Utils.jsx/Functions";
import ModalBar from "./ModalBar";

export default function QuestionBreakout({
  currentModal,
  demoData,
  filters,
  regions,
  roles,
  personas,
  rawData,
  setCurrentModal,
  dataSet,
}) {
  return (
    <div className=" overflow-y-scroll mx-10  my-10 border-t-2">
      {currentModal && (
        <>
          <div className="w-full max-w-full max-h-full h-1/2 top-20">
            <form method="dialog">
              <button
                onClick={() => setCurrentModal(false)}
                className="z-50 btn btn-sm btn-circle btn-ghost absolute right-6 -mt-14"
              >
                ✕
              </button>
            </form>

            <div className="bg-[#BDE3F9] w-3/5 p-4 ml-14 mt-10 mb-4">
              <div className="font-bold text-xs">Question:</div>
              <h3
                className="font-semibold text-md   leading-8 bg-[#BDE3F9] "
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

                        <td>
                          {
                            dataSet.filter(
                              (el) => el.formRef == currentModal.formRef
                            )[0].value
                          }
                        </td>
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

                        <td>
                          {
                            dataSet.filter(
                              (el) => el.formRef == currentModal.formRef
                            )[0].value2
                          }
                        </td>
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

                        <td>
                          {
                            dataSet.filter(
                              (el) => el.formRef == currentModal.formRef
                            )[0].value3
                          }
                        </td>
                        <td>{filters.count2}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ModalBar
                  dataSet={dataSet.filter(
                    (el) => el.formRef == currentModal.formRef
                  )}
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
          </div>
        </>
      )}
    </div>
  );
}
