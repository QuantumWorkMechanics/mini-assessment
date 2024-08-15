import { mockResults } from "../../modules/results/mock-results";
import LaunchForm from "../Results/LaunchForm";
import LaunchPDF from "./LaunchPDF";
import ResultsFlat from "./ResultsFlat";

function ResultsTesting2() {
  return (
    <div>
      <div>
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
      <LaunchPDF />
    </div>
  );
}

export default ResultsTesting2;
