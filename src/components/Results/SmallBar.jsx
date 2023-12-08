import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  // Cell,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";

function SmallBar({ current, desired, animation }) {
  const [data, setData] = useState([
    {
      name: "A",
      x: 0,

      fill: "#09497B",
    },
    {
      name: "B",
      x: 0,
      fill: "#FDB517",
    },
    {
      name: "C",
      x: 5,
      fill: "none",
    },
  ]);

  useEffect(() => {
    // console.log(currentSlide);
    let nextData = [...data];
    (nextData[0] = {
      name: "A",
      x: current,
      fill: "#09497B",
    }),
      (nextData[1] = {
        name: "B",
        x: desired,
        fill: "#FDB517",
      });
    // console.log(nextData);
    setData(nextData);
  }, []);

  // useEffect(() => {
  //   let nextDesiredData = [...data];
  //   (nextDesiredData[1] = {
  //     name: "B",
  //     x: desiredSlide,

  //   }),
  //     console.log(nextDesiredData);
  //   setData(nextDesiredData);
  // }, [desiredSlide]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="x" isAnimationActive={animation} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SmallBar;
