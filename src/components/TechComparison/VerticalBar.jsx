import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart,
  Label,
  LabelList,
} from "recharts";

export default function VerticalBarGraph({
  typeForm,
  categories,
  personas,
  customColor,
}) {
  //   console.log({ typeForm });
  const [selectedPersona, setSelectedPersona] = useState();
  const [personaIndex, setPersonaIndex] = useState(0);
  //   let COLORS;
  //   customColor

  const COLORS = [
    "#bee0f9",
    "#1d91da",
    "#0f4d7d",
    "#0c2945",
    "#FFCB18",
    "#142F55",
  ];

  const TooltipContent = (props) => {
    if (!props.active || !props.payload) {
      return;
    }

    // const data = props.payload[0].payload;
    const data = props.payload[0].payload;
    return (
      <div className=" bg-white bg-opacity-80 border-2 text-xs md:text-lg rounded md:p-4 w-[45ch] md:w-[65ch]">
        <ul>
          <li className="font-bold mb-1">
            {data.category}
            {":  "}
            <span className="text-xl text-blue-400">{data.AllAvgScore}</span>
          </li>

          <li>{data.title}</li>
        </ul>
      </div>
    );
  };

  function handlePersona(num) {
    // console.log({ personaIndex });
    // console.log(personas.length);
    if (!selectedPersona) return;
    if (personaIndex + num == personas.length) {
      //   console.log(personaIndex);
      setSelectedPersona(personas[0].persona);
      setPersonaIndex(0);
      return;
    }
    if (personaIndex + num < 0) {
      setSelectedPersona(personas[personas.length - 1].persona);
      setPersonaIndex(personas.length - 1);
      return;
    }
    setSelectedPersona(personas[personaIndex + num].persona);
    setPersonaIndex((prev) => prev + num);
  }

  function RenderLabel(props) {
    console.log({ props });
    // return entry.title;
    if (props.value.includes("accuracy in this platform?")) console.log(true);
    return <div>"Data Accuracy"</div>;
  }

  const labelStyle = {
    fontWeight: "700",
    fontSize: ".9vw",
  };

  return (
    <div className=" h-full ml-[15%] md:ml-0 md:w-[100%] ">
      {/* <div className="ml-20 md:ml-3">Average Scores</div> */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          //   title="Average"
          barCategoryGap={4}
          //   layout="vertical"
          //   width={550}
          //   height={300}
          data={typeForm}
          margin={{
            top: 30,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />

          <YAxis
            axisLine={false}
            type="number"
            domain={[0, 5]}
            tickInterval={1}
            tickCount={6}
            tick={{ fontSize: 10 }}
          />
          <XAxis
            dataKey="title"
            type="category"
            tick={false}
            scale="band"
          ></XAxis>
          <Tooltip width={400} content={<TooltipContent />} />

          <Bar
            // label={<RenderLabel />}
            name="category"
            dataKey="AllAvgScore"
            fill={"#0E6AAD"}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            onClick={(e) => {
              //   console.log({ e });
            }}
          >
            {customColor && (
              <LabelList
                // angle="90"
                dataKey="altTitle"
                fill={"#0E6AAD"}
                font="Noto Sans"
                style={labelStyle}
                width={80}
                // content={<RenderLabel />}
                position="bottom"
              />
            )}
            {categories[1] &&
              typeForm.map((entry, index) => {
                let color;
                categories.map((category, index) => {
                  // console.log({ category, entry });
                  // console.log(typeForm.)
                  entry.category == category.category
                    ? (color = COLORS[index])
                    : undefined;
                });

                return <Cell key={`${entry.category}_${index}`} fill={color} />;
              })}
          </Bar>

          {selectedPersona && (
            <Line strokeWidth={3} dataKey={selectedPersona} stroke={"red"} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="z-30 w-[90%] flex justify-end text-xs text-white  -mt36">
        {selectedPersona && (
          <div className="h-1 w-4 bg-red-600 place-self-center mr-1"></div>
        )}
        <div className="text-[#0f4d7d] text-lg place-self-center mr-2 font-bold">
          {selectedPersona}
        </div>
        <button
          onClick={() =>
            selectedPersona
              ? setSelectedPersona()
              : setSelectedPersona(personas[personaIndex].persona)
          }
          className="z-30 text-xs text-white p-1 mr-2 rounded bg-[#0EA8DC] w-24"
        >
          {(!selectedPersona && "Show") || "Hide"} Persona
        </button>
        <button
          onClick={() => handlePersona(-1)}
          className={
            "z-30 p-3 mx-2 rounded " +
            ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
          }
        >
          {"<"}
        </button>
        <button
          onClick={() => handlePersona(1)}
          className={
            "z-30 p-3 mx-2 rounded " +
            ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
          }
        >
          {">"}
        </button>
      </div>
      <div className="flex flex-col ml-20 md:ml-14 md:pt-5 md:flex-row text-[6pt] md:text-xs justify-start md:items-center">
        {!customColor &&
          categories.map((category, index) => {
            return (
              <div
                className="flex-wrap  flex flex-row mx-3 mb-1 "
                key={category.category + "legend"}
              >
                <div
                  className="h-2 w-3 mr-2"
                  style={{ background: COLORS[index] }}
                ></div>
                <div>{category.category}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
