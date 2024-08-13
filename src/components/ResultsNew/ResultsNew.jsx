import { useEffect, useState } from "react";
import { scoreDiagnostic } from "../../modules/results/scoring-service";
import LoadSpinner from "../Utils.jsx/LoadSpinner";
import TextGenAI from "../Utils.jsx/TextGenAI";
import GaugeChartOne from "../Utils.jsx/GaugeChartOne";
import ResultsSubResult from "./ResultsSubResult";

function ResultsNew({ diagnostic }) {
  const [results, setResults] = useState();
  const [current, setCurrent] = useState();
  const [desired, setDesired] = useState();
  const [orgResults, setOrgResults] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log({ diagnostic });
      const tempResults = scoreDiagnostic(diagnostic);
      setResults(diagnostic);
      //   console.log((tempResults.currentAvg / 4) * 100);
      setCurrent((tempResults.currentAvg / 4) * 100);
      setDesired((tempResults.desiredAvg / 4) * 100);
      setOrgResults(tempResults.orgResults);
      console.log(tempResults);
      setReady(true);
    }, 2500);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {!results && <LoadSpinner text={"...fetching results"} />}
      {ready && (
        <div className="flex flex-col h-screen w-screen">
          <h1 className="text-2xl pt-10 text-center animate-fade-up">{orgResults.title}</h1>
          <div className="flex items-center px-[25%] h-1/3">
            <TextGenAI text={orgResults.result} min={200} delay={5} />
          </div>

          <div className="flex justify-center items-center font-semibold text-lg">
            <div className="flex flex-col items-center">
              <GaugeChartOne gaugeVal={current} />
              <div>Current</div>
            </div>
            <div className="flex flex-col items-center">
              <GaugeChartOne gaugeVal={desired} />
              <div>Desired</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsNew;
