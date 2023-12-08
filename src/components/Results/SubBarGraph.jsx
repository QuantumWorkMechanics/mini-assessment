import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Label,
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Rectangle,
} from "recharts";

export default function SubBarGraph({ dataSet }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataSet}
        barSize={100}
        barGap={40}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
        {/* <Tooltip viewBox={{ x: 0, y: 0, width: 300, height: 400 }} /> */}
        <Legend />
        <Bar name="Current" label={name} dataKey="current" fill="#09497B" />
        <Bar name="Desired" dataKey="desired" fill="#FDB517" />
      </BarChart>
    </ResponsiveContainer>
  );
}
