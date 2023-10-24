import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import RadarGraph from "../Assessment-result-components/Radar";
import BarGraph from "../Assessment-result-components/BarGraph";
// import ThreeBarChart from "../Assessment-result-components/ThreeBar";
import ResponsiveThreeBar from "../Assessment-result-components/ResponsiveThreeBar";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
  Legend,
} from "recharts";
import RadialGraph from "../Assessment-result-components/RadialGraph";
import VarianceGraph from "../Assessment-result-components/Variance";

const colorArr = ["#0EA8DC", "#FFCB18", "#666666"];

export default function Dashboard({
  personas,
  categories,
  typeForm,
  dataLoaded,
  personaResponseCounts,
  rawForm,
}) {
  //   console.log({ typeForm });
  //   console.log({ personas });
  const style = {
    top: 0,
    left: 350,
    lineHeight: "24px",
  };

  //   const RenderLegend = (props) => {
  //     if (!props) return;
  //     // console.log(props.payload[0].payload);
  //     return (
  //       <div>
  //         {props.personas.map((el, index) => {
  //           let style = { background: colorArr[index] };
  //           return (
  //             <div
  //               className="flex w-20 items-center h-5"
  //               key={`persona_legend_${el.persona}${index}`}
  //             >
  //               <div className="w-3 h-3 " style={style}></div>
  //               <div className="text-xs">{" - " + el.persona}</div>
  //             </div>
  //           );
  //         })}
  //         <div className="flex h-5 items-center">
  //           <div className="w-3 h-3 bg-slate-700"></div>
  //           <div className="text-xs"> - All</div>
  //         </div>
  //       </div>
  //     );
  //   };

  return (
    <>
      <div className="md:p-8 w-screen flex flex-col justify-center md:grid  grid-cols-12  gap-2">
        <div className="bg-[#09497B] text-neutral-300 text-sm col-span-12  p-3 rounded-t-lg">
          {/* <h3 className="underline text-[#09497B]">Personas</h3> */}
          <div className="flex justify-between text-neutral-100">
            <h2 className="text-2xl font-light">{rawForm.title}</h2>
            <div className="text-xs text-neutral-300">
              <div className="flex justify-between">
                <div>Created: </div>
                <div>{rawForm.created_at.slice(0, 10)}</div>
              </div>
              <div>Last Updated: {rawForm.last_updated_at.slice(0, 10)}</div>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div>Respondents:</div>
            {personaResponseCounts &&
              personaResponseCounts.map((persona) => {
                return (
                  <>
                    <div
                      className="first-letter:text-[#84cdf5] first-letter:text-lg first-letter:font-semibold text-neutral-200 hover:text-[#FDB517] px-5"
                      key={persona.persona}
                    >
                      {`${persona.response_no} ${persona.persona}`}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="h-[320px] md:h-full md:min-h-[320px]  col-span-4 overflow-visible">
          <div className="w-[100%] h-[100%] bg-white">
            <h3 className="absolute ml-3  text-slate-600">Overview</h3>
            {personas && (
              <RadarGraph personas={personas} mainCategories={categories} />
            )}
          </div>
        </div>
        <div className="col-span-4  bg-white row-span-8   ">
          <RadialGraph
            title="High Scoring"
            dataArr={typeForm.slice(-3)}
            personas={personas}
            colorArr={colorArr}
          />
        </div>
        <div className="col-span-4  bg-white row-span-8   ">
          <RadialGraph
            title="Low Scoring"
            dataArr={typeForm.slice(0, 3)}
            personas={personas}
            colorArr={colorArr}
          />
        </div>
        <div className="col-span-4 row-span-1 bg-white  md:h-full">
          <VarianceGraph
            fullForm={typeForm}
            personas={personas}
            colorArr={colorArr}
          />
        </div>
        <div className="w-full md:ml-0 col-span-8 row-span-1 min-h-[300px] bg-white row-start-3 col-start-5">
          {typeForm && typeForm[0] && (
            <BarGraph
              typeForm={typeForm}
              categories={categories}
              personas={personas}
            />
          )}
        </div>
        <div className="col-span-12 h-8 bg-[#09497B] rounded-b-lg text-[7pt] text-neutral-200 flex justify-end items-end">
          ©2023 QuanumMechanics
        </div>
      </div>
    </>
  );
}
