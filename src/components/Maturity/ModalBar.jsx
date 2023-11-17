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

export default function ModalBar({
  dataSet,
  currentModal,
  allColor,
  filterOne,
  filterTwo,
}) {
  const [localData, setLocalData] = useState();

  console.log({ currentModal });
  useEffect(() => {
    setLocalData([currentModal]);
  }, [currentModal]);

  return (
    <>
      <div className="h-[400px] w-[500px]">
        {localData && (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              barGap={25}
              width={500}
              height={300}
              data={localData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
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
              <Label value="value" fill={"white"} position="insideBottom" />
              {/* <Tooltip viewBox={{ x: 0, y: 0, width: 300, height: 400 }} /> */}

              <Bar name="Average Score" dataKey="value" fill={allColor}>
                {/* <LabelList
                  dataKey="value"
                  position="insideBottom"
                  fontSize={25}
                  fill="white"
                /> */}
              </Bar>
              <Bar name="Filter 1" dataKey="value2" fill={filterOne} />
              <Bar name="Filter 2" dataKey="value3" fill={filterTwo} />

              {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
}
