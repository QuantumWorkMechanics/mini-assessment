import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function SpeedometerTwo(gaugeVal) {
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
        needleColor="#FDB517"
        segmentColors={["#09497B99", "#09497Bbb", "#09497Bdd", "#09497Bff"]}
        value={gaugeVal.gaugeVal}
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

export default SpeedometerTwo;
