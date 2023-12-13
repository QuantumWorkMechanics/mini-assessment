import React, { useState, useEffect } from "react";
import RadarMaturity from "./RadarMaturity";
import { ALLCOLOR, FILTER1COLOR, FILTER2COLOR } from "../Utils.jsx/Functions";

export default function PillarOverview({
  dataSet,

  categoryBreakout,
}) {
  console.log({ categoryBreakout });
  return (
    <div className="h-[400px] flex justify-around">
      <div className="h-[350px] w-1/3 flex flex-col items-center ">
        {dataSet && (
          <>
            <div>All Respondents</div>
            <RadarMaturity
              color={ALLCOLOR}
              color2={FILTER1COLOR}
              color3={FILTER2COLOR}
              dataSet={dataSet}
              keyVal="value"
              keyVal2="value2"
              keyVal3="value3"
            />
          </>
        )}
      </div>
      <table className="table table-xs w-1/3 h-[300px] m-10">
        <thead>
          <tr>
            <th>Pillar</th>
            <th>All Respondents</th>
            {categoryBreakout && categoryBreakout[0].value2 != undefined && (
              <th>Filter Set 1</th>
            )}
            {categoryBreakout && categoryBreakout[0].value3 != undefined && (
              <th>Filter Set 2</th>
            )}
          </tr>
        </thead>
        <tbody>
          {categoryBreakout &&
            categoryBreakout.map((el, index) => {
              return (
                <tr key={"catRow" + el.category + index}>
                  <th>{el.category}</th>
                  <td>{el.value}</td>
                  {categoryBreakout &&
                    categoryBreakout[0].value2 != undefined && (
                      <td>{el.value2}</td>
                    )}
                  {categoryBreakout &&
                    categoryBreakout[0].value3 != undefined && (
                      <td>{el.value3}</td>
                    )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
