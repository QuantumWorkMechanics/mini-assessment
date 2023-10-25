import React, { useState, useEffect } from "react";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
  Legend,
} from "recharts";
import RenderLegend from "./RenderLegend";

export default function RadialGraph({ personas, colorArr, dataArr, title }) {
  const [data, setData] = useState([dataArr[0]]);
  const [dataIndex, setDataIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    console.log({ personas, colorArr, dataArr, title });
    setTimeout(() => {
      setAnimate(false);
    }, 14500);
    setTimeout(() => {
      let tempIndex;
      dataIndex + 1 == dataArr.length
        ? (tempIndex = 0)
        : (tempIndex = dataIndex + 1);
      setData([dataArr[tempIndex]]);
      setAnimate(true);
      setDataIndex(tempIndex);
    }, 20000);
  }, [dataIndex]);

  const style = {
    top: 0,
    left: 200,
    lineHeight: "24px",
  };
  //   console.log({ data });

  return (
    <>
      {data && (
        <div className="animate-fade-left animate-once animate-duration-[800ms] animate-ease-linear">
          <h3 className="ml-3 ">{title}</h3>
          <div className="w-[200px] h-[200px] ">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                barSize={10}
                width={600}
                height={600}
                data={data}
                innerRadius="50%"
                outerRadius="120%"
                // domain={[0, 5]}
              >
                <PolarAngleAxis
                  type="number"
                  //   angleAxisId={0}
                  tick={false}
                  domain={[0, 5]}
                />
                {/* <RadialBar data={5} clockWise /> */}
                {personas.map((el, index) => {
                  //   console.log(el.persona);
                  if (!data[0][el.persona]) return;
                  return (
                    <RadialBar
                      name={[el.persona]}
                      key={`radial_${el.persona}_${index}`}
                      dataKey={el.persona}
                      fill={colorArr[index]}
                      clockWise
                      label={{ position: "insideStart", fill: "#fff" }}
                    />
                  );
                })}
                <RadialBar
                  name="All"
                  label={{ position: "insideStart", fill: "#fff" }}
                  dataKey="AllAvgScore"
                  clockWise
                />
                <Legend
                  //   iconSize={10}
                  width={200}
                  //   height={140}
                  layout="horizontal"
                  verticalAlign="middle"
                  wrapperStyle={style}
                  content={
                    <RenderLegend
                      personas={personas}
                      colorArr={colorArr}
                      data={data}
                    />
                  }
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute text-sm right-10 top-40 text-[#0E6AAD]">
            {data[0].category}
          </div>
          <div
            className={
              "pt-24 text-xs px-3 -mt-28 " +
              (animate &&
                " animate-flip-up animate-once animate-duration-[800ms] animate-ease-linear")
            }
          >
            {data[0].title}
          </div>
        </div>
      )}
    </>
  );
}
