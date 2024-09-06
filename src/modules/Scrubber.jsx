import { parseResults } from "./results/results-scrubber";
import { mockResults } from "./results/mock-results";
import { scoreDiagnostic } from "./results/scoring-service";

function Scrubber() {
  parseResults();
  // scoreDiagnostic(mockResults);
  return <div>I don't want no scrubs</div>;
}

export default Scrubber;
