import React, { useState, useEffect } from "react";
import { RadialChart } from "react-vis";

const initialData = [
  {
    angle0: 0,
    angle: 0,
    radius: 0,
    radius0: 0,
    color: "#09497B", // Blue color
  },
  {
    angle0: 0,
    angle: 0,
    radius: 0,
    radius0: 0,
    color: "#FDB517", // Yellow color
  },
];

function AnimatedRadialSunburstChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let animationFrame;
    let currentValue = 0;

    const animate = () => {
      if (currentValue < 5) {
        currentValue += 0.1;

        const updatedData = [
          {
            angle0: 0,
            angle: (2 * Math.PI * currentValue) / 5 - 0.1, // Adjusted angle for the first donut
            radius: 10,
            radius0: 5,
            color: "#09497B", // Blue color
          },
          {
            angle0: 0,
            angle: ((2 * Math.PI * currentValue) / 5) * 2 + 0.1, // Adjusted angle0 for the second donut
            radius: 5,
            radius0: 0,
            color: "#FDB517", // Yellow color
          },
        ];

        setData(updatedData);

        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RadialChart
        width={300}
        height={300}
        data={data}
        showLabels
        labelsAboveChildren
      />
    </div>
  );
}

export default AnimatedRadialSunburstChart;
