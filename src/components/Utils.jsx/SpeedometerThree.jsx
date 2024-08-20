import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function SpeedometerThree(gaugeVal) {
  //   const [value, setValue] = useState(0);

  //   useEffect(() => {
  //     setValue(gaugeVal);
  //     console.log(value);
  //   }, [gaugeVal]);
  //   console.log(gaugeVal);
  return (
    <ReactSpeedometer
      height={190}
      minValue={0.5}
      maxValue={4.5}
      segments={4}
      segmentColors={["#FDB51799", "#FDB517bb", "#FDB517dd", "#FDB517ff"]}
      value={gaugeVal.gaugeVal}
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
  );
}

export default SpeedometerThree;
