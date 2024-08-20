import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function SpeedometerFive(gaugeVal) {
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
      needleColor="#FDB517"
      segmentColors={["#79d0e699", "#79d0e6bb", "#79d0e6dd", "#FDB517"]}
      textColor="#fff"
      value={gaugeVal.gaugeVal}
      needleHeightRatio={0.5}
      customSegmentLabels={[
        {
          text: "BASIC",
          fontSize: "12",
          position: "INSIDE",
          color: "#FFF",
        },
        {
          text: "EMERGING",
          fontSize: "12",
          position: "INSIDE",
          color: "#FFF",
        },
        {
          text: "MATURE",
          fontSize: "12",
          position: "INSIDE",
          color: "#FFF",
        },
        {
          text: "LEADER",
          fontSize: "12",
          position: "INSIDE",
          color: "#FFF",
        },
      ]}
    />
  );
}

export default SpeedometerFive;
