import React from "react";
import { BarChart, ComposedChart, Line, Area, Bar, XAxis, LabelList, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { returnAvg } from "../Utils.jsx/Functions";
import { getDataSet } from "../Utils.jsx/Functions";

function BarVertical({ data }) {
  // console.log(getDataSet(MOCK_DATA));

  return (
    <div className="w-[full] max-w-screen h-[700px] text-xs font-extrabold">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          barCategoryGap={20}
          layout="vertical"
          width={500}
          height={500}
          data={getDataSet(data)}
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: -43,
          }}
        >
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <XAxis domain={[0, 4]} tickCount={2} tickLine={false} orientation="top" type="number" />
          <YAxis
            tickLine={false}
            // axisLine={false}
            style={{
              fontFamily: "Noto Sans",
              fontSize: "0.3rem",
            }}
            dataKey="Type"
            type="category"
            scale="band"
            tick={<CustomTick />}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Current" fill="#09497B">
            {/* <LabelList width="400" dataKey={"Type"} position="top" /> */}
          </Bar>
          <Bar dataKey="Desired" fill="#FDB517" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTick(props) {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${0},${y})`}>
      <text x={25} y={12} textAnchor="start" fill="#666">
        {payload.value}
      </text>
    </g>
  );
}

export default BarVertical;
