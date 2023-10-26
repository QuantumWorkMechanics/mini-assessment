import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ResponsiveThreeBar({ dataKey, dataArr, label, title }) {
  console.log({ dataArr });
  //   console.log(dataKey);
  const [dataSet, setDataSet] = useState();

  useEffect(() => {
    //   let tempData = dataArr;
    //   dataArr.map((el, index) => {
    //     console.log({ index });
    //     const fillArr = ["#09497B", "#0E6AAD", "#FDB517"];
    //     tempData[index].fill = fillArr[index];
    //   });
    //   setDataSet(tempData);
    const tempData = [
      {
        dataKey: dataArr[0].AllAvgScore,
        title: dataArr[0].title,
        fill: "#09497B",
      },
      {
        dataKey: dataArr[1].AllAvgScore,
        title: dataArr[1].title,
        fill: "#0E6AAD",
      },
      {
        dataKey: dataArr[2].AllAvgScore,
        title: dataArr[2].title,
        fill: "#FDB517",
      },
    ];
    setDataSet(tempData);
  }, []);

  return (
    <>
      {dataSet && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            // layout="vertical"
            width={350}
            height={300}
            data={dataSet}
            domain={[0, 5]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={label} />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              dataKey="dataKey"
              // fill={["#09497B", "#0E6AAD", "#FDB517"]}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}