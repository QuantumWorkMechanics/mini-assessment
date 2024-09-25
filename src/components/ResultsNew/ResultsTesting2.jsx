import { useEffect, useState } from "react";
import { mockResults } from "../../modules/results/mock-results";
//import LaunchForm from "../Results/LaunchForm";
//import LaunchPDF from "./LaunchPDF";
import ResultsFlat from "./ResultsFlat";
import { scoreDiagnostic } from "../../modules/results/scoring-service";
import ResultsFull from "./ResultsFull";

function ResultsTesting2() {
  const [results, setResults] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let tempResults = scoreDiagnostic(mockResults);
    setResults(tempResults);
  }, []);

  return (
    <div>
      <ResultsFull diagnostic={mockResults} />
      {/* <div>
        <ResultsFlat
          selections={{
            topLeft: false,
            topRight: false,
            rightCircle: false,
            leftCircle: false,
            bottomCircle: false,
            middleCircle: false,
            middleCircle2: false,
          }}
          diagnostic={mockResults}
        />
      </div>
      <div className="bottom-0 fixed w-screen justify-center">
        {results && <LaunchPDF progress={progress} setProgress={setProgress} results={results} />}
      </div> */}
    </div>
  );
}

export default ResultsTesting2;
