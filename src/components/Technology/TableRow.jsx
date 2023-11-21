import React, { useState, useEffect } from "react";
import { getPercentOf, getAverages } from "../Utils.jsx/Functions";

export default function TableRow({
  title,
  dataArr,
  currentTab,
  color = "#FFF",
}) {
  return (
    <tr>
      <td>
        {" "}
        <div className="w-3 h-3 " style={{ backgroundColor: color }}></div>
      </td>
      <td>{title}</td>
      <td>
        {
          getAverages(
            dataArr.filter((datum) => {
              //   console.log({ currentTab, datum });
              return datum.title == currentTab;
            })
          )[0].value
        }
      </td>
      <td>
        {getPercentOf(
          "lte",
          dataArr.filter((datum) => {
            //   console.log({ currentTab, datum });
            return datum.title == currentTab;
          })
        ) + "%"}
      </td>
      <td>
        {getPercentOf(
          "gte",
          dataArr.filter((datum) => {
            //   console.log({ currentTab, datum });
            return datum.title == currentTab;
          })
        ) + "%"}
      </td>
      <td>
        {
          dataArr.filter((datum) => {
            //   console.log({ currentTab, datum });
            return datum.title == currentTab;
          }).length
        }
      </td>
    </tr>
  );
}
