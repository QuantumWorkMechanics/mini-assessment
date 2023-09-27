import React, { useState, useEffect } from "react";

import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

function RechartBar({ currentSlide, desiredSlide }) {
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
      fill: "white",
    },
  ]);

  var test = [3, 4, 5];

  useEffect(() => {
    console.log(currentSlide);
    let nextData = [...data];
    (nextData[0] = {
      name: "A",
      x: currentSlide,
      fill: "#09497B",
    }),
      console.log(nextData);
    setData(nextData);
  }, [currentSlide]);

  useEffect(() => {
    let nextDesiredData = [...data];
    (nextDesiredData[1] = {
      name: "B",
      x: desiredSlide,
      fill: "#FDB517",
    }),
      console.log(nextDesiredData);
    setData(nextDesiredData);
  }, [desiredSlide]);

  return (
    <RadialBarChart
      width={400}
      height={400}
      data={data}
      innerRadius="20%"
      outerRadius="70%"
    >
      <RadialBar minAngle={30} dataKey="x" clockWise />
    </RadialBarChart>
  );
}

export default RechartBar;
