import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Legend,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import RadarMaturity from "./RadarMaturity";
import QuestionBreakout from "./QuestionBreakout";
import PillarOverview from "./PillarOverview";

export default function Overview({
  dataSet,
  ALLCOLOR,
  FILTER1COLOR,
  FILTER2COLOR,
  setCurrentModal,
  categoryBreakout,
  currentModal,
  filters,
  rawData,
  regions,
  roles,
  personas,
}) {
  return (
    <>
      {!currentModal && (
        <PillarOverview dataSet={dataSet} categoryBreakout={categoryBreakout} />
      )}
      {currentModal && (
        <div className="h-full border-y-2 mb-10">
          <QuestionBreakout
            currentModal={currentModal}
            filters={filters}
            regions={regions}
            roles={roles}
            personas={personas}
            rawData={rawData.filter((el) => el.formRef == currentModal.formRef)}
            setCurrentModal={setCurrentModal}
            dataSet={dataSet}
          />
        </div>
      )}
      {dataSet && (
        <div className="h-80 w-full ">
          <h3
            className="text-2xl font-semibold ml-14"
            style={{ color: ALLCOLOR }}
          >
            All Response Averages
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={dataSet}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
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
              <Tooltip />
              <Legend />
              <Bar
                name={"All Respondents"}
                dataKey={"value"}
                fill={ALLCOLOR}
                onClick={(e) => {
                  //   console.log({ e });
                  setCurrentModal(e.payload);
                  console.log({ e, dataSet });
                }}
              />

              <Line
                strokeWidth={3}
                legendType="none"
                name={"Filter 1"}
                type="monotone"
                dataKey="value2"
                stroke={FILTER1COLOR}
              />

              <Line
                strokeWidth={3}
                legendType="none"
                //   key="line2"
                name={"Filter 2"}
                type="monotone"
                dataKey="value3"
                stroke={FILTER2COLOR}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
