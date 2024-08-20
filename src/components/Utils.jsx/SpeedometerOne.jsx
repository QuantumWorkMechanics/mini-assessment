import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

function SpeedometerOne(gaugeVal) {
  //   const [value, setValue] = useState(0);

  //   useEffect(() => {
  //     setValue(gaugeVal);
  //     console.log(value);
  //   }, [gaugeVal]);
  //   console.log(gaugeVal);
  return (
    <div>
      {gaugeVal && (
        <ReactSpeedometer
          height={190}
          minValue={0.5}
          maxValue={4.5}
          segments={4}
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
              color: "#0EA8DC",
            },
            {
              text: "LEADER",
              fontSize: "12",
              position: "INSIDE",
              color: "#0EA8DC",
            },
          ]}
        />
      )}
    </div>
  );
}

export default SpeedometerOne;
