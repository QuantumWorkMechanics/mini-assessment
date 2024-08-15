import ReactSpeedometer from "react-d3-speedometer";
import GaugeComponent from "react-gauge-component";
import SpeedometerOne from "./SpeedometerOne";
import { useEffect, useState } from "react";
import { mockResults } from "../../modules/results/mock-results";
import { scoreDiagnostic } from "../../modules/results/scoring-service";

function Speedometer() {
  const [results, setResults] = useState();
  const [dimensionResults, setDimensionResults] = useState();
  const [current, setCurrent] = useState();
  const [desired, setDesired] = useState();
  const [orgResults, setOrgResults] = useState();
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      //console.log({ diagnostic });
      const tempResults = scoreDiagnostic(mockResults);
      setResults(mockResults);
      setDimensionResults(tempResults.dimensionResults);
      //   console.log((tempResults.currentAvg / 4) * 100);
      setCurrent(parseInt(tempResults.currentAvg));
      console.log(tempResults.currentAvg);
      setDesired(tempResults.desiredAvg);
      setOrgResults(tempResults.orgResults);
      console.log(tempResults);
      setReady(true);
    }, 2500);
  }, []);
  return (
    <div>
      {current && current > 0 && <SpeedometerOne gaugeVal={current} />}
      {desired && desired > 0 && <SpeedometerOne gaugeVal={desired} />}
    </div>
  );
}

export default Speedometer;
