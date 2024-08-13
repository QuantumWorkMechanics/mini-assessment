import { mockResults } from "../../modules/results/mock-results";
import ResultsNew from "./ResultsNew";

function ResultsTesting() {
  return (
    <div>
      <div>
        <ResultsNew diagnostic={mockResults} />
      </div>
    </div>
  );
}

export default ResultsTesting;
