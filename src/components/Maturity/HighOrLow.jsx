import React, { useState, useEffect } from "react";
import HighLow from "./HighLow";
import { filterByItemAndQuestion, getAverages } from "../Utils.jsx/Functions";

export default function HighOrLow({
  type,
  ALLCOLOR,
  FILTER1COLOR,
  FILTER2COLOR,
  dataSet,
  filters,
  personas,
  regions,
  roles,
  rawData,
}) {
  return (
    <>
      {" "}
      <h3
        className="text-2xl font-semibold ml-14 mt-10"
        style={{ color: ALLCOLOR }}
      >
        {type + " Scoring Questions"}
      </h3>
      {dataSet && (
        <HighLow
          type={type}
          num={3}
          dataSet={dataSet}
          keyValue="value"
          color={ALLCOLOR}
          title="All Respondents"
          // setCurrentQuestion={setCurrentQuestion}
        />
      )}
      <div className="divider"></div>
      {dataSet && dataSet[0].value2 && (
        <HighLow
          type={type}
          num={3}
          dataSet={dataSet}
          keyValue="value2"
          color={FILTER1COLOR}
          title={
            (filters.persona
              ? filters.persona + " Respondents "
              : "Respondents ") +
            (filters.role ? "who are " + filters.role : "") +
            (filters.region ? " from " + filters.region : "")
          }
        />
      )}
      {dataSet && dataSet[0].value3 && (
        <>
          <HighLow
            type={type}
            num={3}
            dataSet={dataSet}
            keyValue="value3"
            color={FILTER2COLOR}
            title={
              (filters.persona2
                ? filters.persona2 + " Respondents "
                : "Respondents ") +
              (filters.role2 ? "who are " + filters.role2 : "") +
              (filters.region2 ? " from " + filters.region2 : "")
            }
          />
          <div className="divider"></div>
        </>
      )}
      {personas &&
        rawData &&
        personas.map((item) => {
          let tempData = filterByItemAndQuestion("persona", item, rawData);
          tempData = getAverages(tempData);

          if (tempData.length) {
            return (
              <div key={"highLow" + item + "aud"}>
                <>
                  <HighLow
                    type={type}
                    num={3}
                    dataSet={tempData}
                    keyValue="value"
                    color={FILTER2COLOR}
                    title={item}
                  />
                  <div className="divider"></div>
                </>
              </div>
            );
          }
        })}
      {roles &&
        rawData &&
        roles.map((item) => {
          let tempData = filterByItemAndQuestion("role", item, rawData);
          tempData = getAverages(tempData);

          if (tempData.length) {
            return (
              <div key={"highLow" + item + "aud"}>
                <>
                  <HighLow
                    type={type}
                    num={3}
                    dataSet={tempData}
                    keyValue="value"
                    color={FILTER2COLOR}
                    title={item}
                  />
                  <div className="divider"></div>
                </>
              </div>
            );
          }
        })}
      {regions &&
        rawData &&
        regions.map((item) => {
          let tempData = filterByItemAndQuestion("region", item, rawData);
          tempData = getAverages(tempData);

          if (tempData.length) {
            return (
              <div key={"highLow" + item + "aud"}>
                <>
                  <HighLow
                    type={type}
                    num={3}
                    dataSet={tempData}
                    keyValue="value"
                    color={FILTER2COLOR}
                    title={item}
                  />
                  <div className="divider"></div>
                </>
              </div>
            );
          }
        })}
    </>
  );
}
