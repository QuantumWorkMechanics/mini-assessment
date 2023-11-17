import React, { useState, useEffect } from "react";

export default function CategoryTable({
  localData,
  demoData,
  color,
  color2,
  color3,
  filters,
}) {
  <div>
    <table className="table table-pin-rows">
      <thead>
        <tr>
          <th></th>
          <th>Respondents</th>
          <th>{localData[0].category}</th>
          <th>{localData[1].category}</th>
          <th>{localData[2].category}</th>
          <th>{localData[3].category}</th>
          <th>{localData[4].category}</th>
          <th>No. Respondents</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="w-3 h-2" style={{ backgroundColor: color }}></div>
          </td>
          <td>All Respondents</td>
          <th>{localData[0].value}</th>
          <th>{localData[1].value}</th>
          <th>{localData[2].value}</th>
          <th>{localData[3].value}</th>
          <th>{localData[4].value}</th>
          <th>{demoData.length}</th>
        </tr>
        {localData[0].value2 != undefined && (
          <tr>
            <td>
              <div
                className="w-3 h-2"
                style={{ backgroundColor: color2 }}
              ></div>
            </td>
            <td>
              {" "}
              {(filters.persona
                ? filters.persona + " Respondents "
                : "Respondents ") +
                (filters.role ? "who are " + filters.role : "") +
                (filters.region ? " from " + filters.region : "")}
            </td>
            <td>{localData[0].value2}</td>
            <td>{localData[1].value2}</td>
            <td>{localData[2].value2}</td>
            <td>{localData[3].value2}</td>
            <td>{localData[4].value2}</td>
            <td>{filters.count}</td>
          </tr>
        )}
        {localData[0].value3 != undefined && (
          <tr>
            <td>
              <div
                className="w-3 h-2"
                style={{ backgroundColor: color3 }}
              ></div>
            </td>
            <td>
              {" "}
              {(filters.persona2
                ? filters.persona2 + " Respondents "
                : "Respondents ") +
                (filters.role2 ? "who are " + filters.role2 : "") +
                (filters.region2 ? " from " + filters.region2 : "")}
            </td>
            <td>{localData[0].value2}</td>
            <td>{localData[1].value2}</td>
            <td>{localData[2].value2}</td>
            <td>{localData[3].value2}</td>
            <td>{localData[4].value2}</td>
            <td>{filters.count2}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
}
