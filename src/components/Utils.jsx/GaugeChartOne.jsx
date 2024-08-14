import GaugeComponent from "react-gauge-component";

function GaugeChartOne({ gaugeVal }) {
  return (
    <>
      <div className="w-[200px] h-[200px] m-10 shadowy">
        <div className="absolute mt-5 ml-10 text-[5pt] font-bold w-[10%]">
          {/* <div className="font-arial tranform -rotate-[35deg] ">EMERGING</div> */}
        </div>
        {/* <div className="w-[100%] h-[100%] bg-slate-200  flex justify-center items-center rounded rounded-full">
          <div className="w-[85%] h-[85%] bg-black flex justify-center items-center rounded rounded-full  pb-[13.5%]"> */}
        <GaugeComponent
          style={{ width: "125%" }}
          value={gaugeVal}
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
            },
          }}
          arc={{
            colorArray: ["#EA4228", "#5BE12C", "#00ffff", "#0000ff"],
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
      {/* </div>
      </div> */}
    </>
  );
}

export default GaugeChartOne;
