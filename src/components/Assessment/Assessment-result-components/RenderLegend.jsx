import { functionsIn } from "lodash";
import React, { useState, useEffect } from "react";

export default function RenderLegend(props) {
  if (!props) return;
  console.log(props.payload);
  return (
    <div>
      {props.personas.map((el, index) => {
        // console.log(props.data[0][el.persona]);
        // if (!props.data[0][el.persona]) {
        //   return <></>;
        // }
        let style = { background: props.colorArr[index] };
        return (
          <div
            className="flex w-35 items-center h-5"
            key={`persona_legend_${el.persona}${index}`}
          >
            <div className="w-3 h-3 " style={style}></div>
            <div className="text-xs">{" - " + el.persona}</div>
          </div>
        );
      })}
      <div className="flex h-5 items-center">
        <div className="w-3 h-3 bg-slate-700"></div>
        <div className="text-xs"> - All</div>
      </div>
    </div>
  );
}
