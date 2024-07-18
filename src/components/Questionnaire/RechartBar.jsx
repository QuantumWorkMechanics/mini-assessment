import React, { useState, useEffect } from "react";

import { RadialBarChart, RadialBar } from "recharts";

function RechartBar({ currentSliderValue, desiredSliderValue }) {
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
    let nextData = [...data];
    (nextData[0] = {
      name: "A",
      x: currentSliderValue,
      fill: "#09497B",
    }),
      (nextData[1] = {
        name: "B",
        x: desiredSliderValue,
        fill: "#FDB517",
      });
    setData(nextData);
  }, [currentSliderValue, desiredSliderValue]);

  return (
    <RadialBarChart width={400} height={400} data={data} innerRadius="20%" outerRadius="70%">
      <RadialBar minAngle={30} dataKey="x" clockWise />
    </RadialBarChart>
  );
}

export default RechartBar;
