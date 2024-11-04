import React, { useState, useEffect } from "react";
import { ResponsiveContainer, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList } from "recharts";

export default function SubBarGraph({ dataSet, result }) {
  // console.log(dataSet);

  const COLORS = ["#09497B", "#FDB517"];

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
        <YAxis axisLine={false} type="number" domain={[0, 5]} tickInterval={1} tickCount={0} tick={{ fontSize: 10 }} />
        <XAxis align="right" dataKey="name" type="category" scale="band"></XAxis>
        <Legend />
        <Bar dataKey="currAvg" name="Current" fill={COLORS[0]}>
          <LabelList dataKey="currLabel" position="top"></LabelList>
        </Bar>
        <Bar dataKey="desAvg" name="Desired" fill={COLORS[1]}>
          <LabelList dataKey="desLabel" position="top"></LabelList>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
