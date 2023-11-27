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
// import ControlButtons from "./ControlButtons";

export default function MaturityBarGraph({
  typeForm,
  categories,
  personas,
  customColor,
  handleParent,
  setPersonaIndex,
  setSelectedPersona,
  selectedPersona,
  personaIndex,
  dataSet,
}) {
  // console.log({ typeForm });
  //   const [selectedPersona, setSelectedPersona] = useState();
  //   const [personaIndex, setPersonaIndex] = useState(0);
  const [data, setData] = useState(dataSet);
  const [dataIndex, setDataIndex] = useState(typeForm);
  //   let COLORS;
  //   customColor
  //   useEffect(() => {
  //     if (screen.width < 550) {
  //       setData(typeForm.slice(0, 4));
  //       setDataIndex(0);
  //     }
  //   }, []);

  // console.log({ dataSet });

  // useEffect(() => {
  //   handleParent(selectedPersona);
  // }, [selectedPersona]);

  // const COLORS = [
  //   "#bee0f9",
  //   "#1d91da",
  //   "#0f4d7d",
  //   "#0c2945",
  //   "#FFCB18",
  //   "#142F55",
  // ];

  const TooltipContent = (props) => {
    if (!props.active || !props.payload) {
      return;
    }

    // const data = props.payload[0].payload;
    //   const data = props.payload[0].payload;
    //   return (
    //     <div className=" bg-white bg-opacity-80 border-2 text-xs md:text-lg rounded md:p-4 w-[45ch] md:w-[65ch]">
    //       <ul>
    //         <li className="font-bold mb-1">
    //           {data.category}
    //           {":  "}
    //           <span className="text-xl text-blue-400">{data.AllAvgScore}</span>
    //         </li>

    //         <li>{data.title}</li>
    //       </ul>
    //     </div>
    //   );
    // };

    // function handlePersona(num) {
    //   // console.log({ personaIndex });
    //   // console.log(personas.length);
    //   if (!selectedPersona) return;
    //   if (personaIndex + num == personas.length) {
    //     //   console.log(personaIndex);
    //     setSelectedPersona(personas[0].persona);
    //     setPersonaIndex(0);
    //     return;
    //   }
    //   if (personaIndex + num < 0) {
    //     setSelectedPersona(personas[personas.length - 1].persona);
    //     setPersonaIndex(personas.length - 1);
    //     return;
    //   }
    //   setSelectedPersona(personas[personaIndex + num].persona);
    //   setPersonaIndex((prev) => prev + num);
    // }

    //   function RenderLabel(props) {
    //     console.log({ props });
    //     // return entry.title;
    //     if (props.value.includes("accuracy in this platform?")) console.log(true);
    //     return <div>"Data Accuracy"</div>;
    //   }

    const labelStyle = {
      fontWeight: "700",
      fontSize: "1.2vw",
    };
    const mobileStyle = {
      fontWeight: "700",
      fontSize: "8pt",
    };

    // function handleBars(num) {
    //   // console.log("handleBars");
    //   const tempIndex = dataIndex + num * 4;
    //   // console.log({ tempIndex });
    //   if (tempIndex > typeForm.length || tempIndex < 0) return;

    //   let tempData = typeForm.slice(tempIndex, tempIndex + 4);

    //   setData(tempData);
    //   setDataIndex((prev) => prev + num * 4);
    // }

    return (
      <>
        {/* <div className=" h-full  md:ml-0  "> */}
        {/* <div className="ml-20 md:ml-3">Average Scores</div> */}
        {/* {screen.width < 550 && (
          <>
            {" "}
            <button
              onClick={() => handleBars(-1)}
              className="absolute z-50  ml-24 p-2 text-white rounded bg-blue-400"
            >
              Last
            </button>
            <button
              onClick={() => handleBars(1)}
              className="absolute z-50  ml-36 p-2 text-white rounded bg-blue-400"
            >
              Next
            </button>
          </>
        )} */}

        {/* <div className=" flex md:hidden absolute left-[10%] mt-2 ml-2">
          {selectedPersona && (
            <div className="h-1 w-4 bg-red-600 place-self-center mr-1"></div>
          )}
          <div className="text-[#0f4d7d] text-sm md:text-lg place-self-center mr-2 font-bold">
            {selectedPersona ? selectedPersona : "All Respondents"}
          </div>
        </div> */}

        <div className="h-full -ml-7 md:ml-0 w-[100%]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              barCategoryGap={"20%"}
              data={data}
              //   data={data.map((el) => {
              //     return { ...el.persona, title: el.title };
              //   })}
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
                dataKey="value"
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
                    style={screen.width > 550 ? labelStyle : mobileStyle}
                    width={150}
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
                    return (
                      <Cell key={`${entry.category}_${index}`} fill={color} />
                    );
                  })}
              </Bar>
              {/* {data.length<4 && } */}
              {selectedPersona && (
                <Line
                  //   data={typeForm.map((el) => el.persona)}
                  strokeWidth={3}
                  dataKey={selectedPersona}
                  stroke={"red"}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="-mt-32 w-screen pr-2 -ml-1 absolute flex text-lg justify-between">
          <button
            onClick={() => handleBars(-1)}
            className="md:hidden  z-50 p-2 text-white  bg-[#999999] bg-opacity-80"
          >
            {"<"}
          </button>
          <button
            onClick={() => handleBars(1)}
            className="md:hidden  z-50  p-2 text-white  bg-[#999999] bg-opacity-80 "
          >
            {">"}
          </button>
        </div>
        <div className="z-60 pl-2 pr-4 sm:pr-8  w-screen flex justify-between lg:ml-24 md:justify-center text-xs text-white  ">
          <div className=" hidden md:flex absolute  md:mb-0 left-[10%]  lg:left-[20%]">
            {selectedPersona && (
              <div className="h-1 w-4 bg-red-600 place-self-center mr-1"></div>
            )}
            <div className="text-[#0f4d7d] text-sm md:text-lg place-self-center mr-2 font-bold">
              {selectedPersona ? selectedPersona : "All Respondents"}
            </div>
          </div>

          <button
            onClick={() => {
              //   console.log({ personas, personaIndex });
              selectedPersona
                ? setSelectedPersona()
                : setSelectedPersona(personas[personaIndex].persona);
            }}
            className="z-30 text-xs text-white p-1 mr-2 rounded bg-[#0EA8DC] w-24"
          >
            {(!selectedPersona && "Show") || "Hide"} Persona
          </button>
          <div>
            <button
              onClick={() => handlePersona(-1)}
              className={
                "z-60 p-3 mx-2 rounded " +
                ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
              }
            >
              {"<"}
            </button>
            <button
              onClick={() => handlePersona(1)}
              className={
                "z-60 p-3 mx-2 rounded " +
                ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
              }
            >
              {">"}
            </button>
          </div>
          <button
            onClick={() => {
              //   console.log({ personas, personaIndex });
              selectedPersona
                ? setSelectedPersona()
                : setSelectedPersona(personas[personaIndex].persona);
            }}
            className="z-30 text-xs text-white p-1 mr-2 rounded bg-[#0EA8DC] w-24"
          >
            {(!selectedPersona && "Show") || "Hide"} Persona
          </button>
          <div>
            <button
              onClick={() => handlePersona(-1)}
              className={
                "z-60 p-3 mx-2 rounded " +
                ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
              }
            >
              {"<"}
            </button>
            <button
              onClick={() => handlePersona(1)}
              className={
                "z-60 p-3 mx-2 rounded " +
                ((selectedPersona && "bg-[#0EA8DC]") || "bg-slate-400")
              }
            >
              {">"}
            </button>
          </div> */}
        {/* <ControlButtons
            selectedItem={selectedPersona}
            items={personas}
            item="persona"
            setSetter={setSelectedPersona}
            itemIndex={personaIndex}
            handler={handlePersona}
          /> */}
        {/* </div>

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
      </div> */}
      </>
    );
  };
}
