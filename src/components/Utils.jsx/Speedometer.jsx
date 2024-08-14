import ReactSpeedometer from "react-d3-speedometer";
import GaugeComponent from "react-gauge-component";

function Speedometer() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <ReactSpeedometer
          minValue={0}
          maxValue={4}
          segments={4}
          value={3.4}
          customSegmentLabels={[
            {
              text: "BASIC",
              fontSize: 10,
              position: "OUTSIDE",
              color: "#999999",
            },
            {
              text: "EMERGING",
              fontSize: 10,
              position: "OUTSIDE",
              color: "#999999",
            },
            {
              text: "MATURE",
              fontSize: 10,
              position: "OUTSIDE",
              color: "#999999",
            },
            {
              text: "LEADER",
              fontSize: 10,
              position: "OUTSIDE",
              color: "#999999",
            },
          ]}
        />
        <ReactSpeedometer
          minValue={0}
          maxValue={4}
          segments={4}
          value={2.5}
          customSegmentLabels={[
            {
              text: "BASIC",
              fontSize: "10",
              position: "INSIDE",
              color: "#fff",
            },
            {
              text: "EMERGING",
              fontSize: "10",
              position: "INSIDE",
              color: "#fff",
            },
            {
              text: "MATURE",
              fontSize: "10",
              position: "INSIDE",
              color: "#0EA8DC",
            },
            {
              text: "LEADER",
              fontSize: "10",
              position: "INSIDE",
              color: "#0EA8DC",
            },
          ]}
        />
      </div>
      <div className="flex">
        <GaugeComponent
          style={{ width: "20%" }}
          value={30}
          type="radial"
          labels={{
            valueLabel: { formatTextValue: (value) => value / 25 },
            tickLabels: {
              defaultTickValueConfig: { hide: true },
              type: "inner",
              ticks: [
                { value: 0 },
                { value: 10 },
                { value: 20 },
                { value: 30 },
                { value: 40 },
                { value: 50 },
                { value: 60 },
                { value: 70 },
                { value: 80 },
                { value: 90 },
              ],
              valueConfig: {
                formatTextValue: (val) => {
                  val % 20 == 0 ? ["BASIC", "EMERGING", "MATURE", "LEADER"][val / 20 - 1] : "";
                },
              },
            },
          }}
          arc={{
            colorArray: ["#EA4228", "#5BE12C"],
            subArcs: [{}, {}, {}, {}],
            padding: 0.02,
            width: 0.3,
          }}
          pointer={{
            color: "#ff4d00",
            elastic: true,
            animationDelay: 0,
            width: 10,
            length: 0.8,
          }}
        />
        <GaugeComponent
          style={{ width: "25%" }}
          value={60}
          type="grafana"
          labels={{
            valueLabel: { formatTextValue: (value) => value / 25 },
            tickLabels: {
              defaultTickValueConfig: { hide: true },
              type: "inner",
              ticks: [
                { value: 0 },
                { value: 10 },
                { value: 20 },
                { value: 30 },
                { value: 40 },
                { value: 50 },
                { value: 60 },
                { value: 70 },
                { value: 80 },
                { value: 90 },
              ],
              valueConfig: {
                formatTextValue: (val) => {
                  val % 20 == 0 ? ["BASIC", "EMERGING", "MATURE", "LEADER"][val / 20 - 1] : "";
                },
              },
            },
          }}
          arc={{
            colorArray: ["#EA4228", "#5BE12C"],
            subArcs: [{}, {}, {}, {}],
            padding: 0.02,
            width: 0.3,
          }}
          pointer={{
            color: "#ff4d00",
            elastic: true,
            animationDelay: 0,
            width: 10,
            length: 0.8,
          }}
        />
        <GaugeComponent
          style={{ width: "25%" }}
          value={3}
          type="semicircle"
          labels={{
            valueLabel: { formatTextValue: (value) => value / 25 },
            tickLabels: {
              defaultTickValueConfig: { hide: true },
              type: "inner",
              ticks: [
                { value: 0 },
                { value: 10 },
                { value: 20 },
                { value: 30 },
                { value: 40 },
                { value: 50 },
                { value: 60 },
                { value: 70 },
                { value: 80 },
                { value: 90 },
              ],
              valueConfig: {
                formatTextValue: (val) => {
                  val % 20 == 0 ? ["BASIC", "EMERGING", "MATURE", "LEADER"][val / 20 - 1] : "";
                },
              },
            },
          }}
          arc={{
            colorArray: ["#EA4228", "#5BE12C"],
            subArcs: [{}, {}, {}, {}],
            padding: 0.02,
            width: 0.3,
          }}
          pointer={{
            color: "#ff4d00",
            elastic: true,
            animationDelay: 0,
            width: 10,
            length: 0.8,
          }}
        />
      </div>
    </div>
  );
}

export default Speedometer;
