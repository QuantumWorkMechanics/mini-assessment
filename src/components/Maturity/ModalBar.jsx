import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import { ALLCOLOR, FILTER1COLOR, FILTER2COLOR } from "../Utils.jsx/Functions";
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

export default function ModalBar({ dataSet }) {
  return (
    <>
      <div className="h-[400px] w-[500px]">
        {dataSet && (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              barGap={25}
              width={500}
              height={300}
              data={dataSet}
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

              <Bar name="Average Score" dataKey="value" fill={ALLCOLOR}></Bar>
              <Bar name="Filter 1" dataKey="value2" fill={FILTER1COLOR} />
              <Bar name="Filter 2" dataKey="value3" fill={FILTER2COLOR} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
}
