import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function Radial() {
  //   const [value, setValue] = useState(0);

  //   useEffect(() => {
  //     setValue(gaugeVal);
  //     console.log(value);
  //   }, [gaugeVal]);
  //   console.log(gaugeVal);
  return (
    <div>
      <ReactSpeedometer
        height={190}
        minValue={0.5}
        maxValue={4.5}
        segments={4}
        segmentColors={["#09497B99", "#09497Bbb", "#09497Bdd", "#09497Bff"]}
        value={3}
        needleHeightRatio={0.5}
        customSegmentLabels={[
          {
            text: "BASIC",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "EMERGING",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "MATURE",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "LEADER",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
        ]}
      />
      <ReactSpeedometer
        height={190}
        minValue={0.5}
        maxValue={4.5}
        segments={4}
        segmentColors={["#FDB51799", "#FDB517bb", "#FDB517dd", "#FDB517ff"]}
        value={3}
        needleHeightRatio={0.5}
        customSegmentLabels={[
          {
            text: "BASIC",
            fontSize: "12",
            position: "INSIDE",
            color: "#333333",
          },
          {
            text: "EMERGING",
            fontSize: "12",
            position: "INSIDE",
            color: "#333333",
          },
          {
            text: "MATURE",
            fontSize: "12",
            position: "INSIDE",
            color: "#333333",
          },
          {
            text: "LEADER",
            fontSize: "12",
            position: "INSIDE",
            color: "#333333",
          },
        ]}
      />
      <ReactSpeedometer
        height={190}
        minValue={0.5}
        maxValue={4.5}
        segments={4}
        segmentColors={["#09497B99", "#09497Bbb", "#09497Bdd", "#FDB517ff"]}
        value={3}
        needleHeightRatio={0.5}
        customSegmentLabels={[
          {
            text: "BASIC",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "EMERGING",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "MATURE",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
          {
            text: "LEADER",
            fontSize: "12",
            position: "INSIDE",
            color: "#fff",
          },
        ]}
      />
    </div>
  );
}

export default Radial;
