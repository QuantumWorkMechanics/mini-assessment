import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import { tidy, arrange, desc } from "@tidyjs/tidy";
import questionBank from "../../../modules/question-bank";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  Legend,
  LabelList,
} from "recharts";

export default function VarianceGraph({ fullForm, personas, colorArr }) {
  const [data, setData] = useState();
  const [dataSet, setDataSet] = useState();
  const [dataIndex, setDataIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  // let dataSet = []

  useEffect(() => {
    // console.log(dataSet.length);
    // let lengthVar = dataSet.length;
    // let dataArr = dataSet;

    // setTimeout(() => {
    //   setAnimate(false);
    // }, 29800);
    setTimeout(() => {
      if (!dataSet) return;
      console.log({ dataSet, dataIndex });
      let tempIndex;
      dataIndex + 1 == dataSet.length
        ? (tempIndex = 0)
        : (tempIndex = dataIndex + 1);
      setDataIndex(tempIndex);
      setData(dataSet[tempIndex]);
      setAnimate(true);
    }, 20000);
  }, [dataIndex]);

  useEffect(() => {
    let mutableForm = fullForm;
    let tempFormArr = tidy(
      mutableForm,
      arrange((a, b) => b.variance - a.variance)
    );
    console.log({ tempFormArr });

    let highVariance = tempFormArr.slice(0, 10);
    let dataArr = [];
    highVariance.map((question) => {
      let personaItems = {};
      personas.map((persona) => {
        personaItems = {
          ...personaItems,
          [persona.persona]: question.AllAvgScore,
        };
        return personaItems;
      });
      //   console.log({ personaItems });
      dataArr = [...dataArr, [personaItems, question, personaItems]];
    });
    console.log({ dataArr });
    setDataSet(dataArr);
    setData(dataArr[0]);
    setDataIndex((prev) => prev + 1);
  }, []);

  return (
    <div className="w-full h-full">
      {data && (
        <>
          <div className="ml-3">High Variance</div>
          <div className="text-xs absolute ml-3 mt-16 z-50 opacity-80">
            Mean
          </div>
          <div className="w-[80%] h-[50%]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={data}>
                <YAxis domain={[0, 5]} axisLine={false} tick={false} />
                {personas.map((persona, index) => {
                  return (
                    <Line
                      key={`line_${persona.persona}`}
                      type="monotone"
                      dataKey={persona.persona}
                      stroke={colorArr[index]}
                      strokeWidth={3}
                    >
                      <LabelList dataKey={persona.persona} position="top" />
                    </Line>
                  );
                })}
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            className={
              "text-xs mt-3 px-3  " +
              (animate &&
                " animate-flip-up animate-once animate-duration-[800ms] animate-ease-linear")
            }
          >
            {data[1].title}
          </div>
        </>
      )}
    </div>
  );
}
