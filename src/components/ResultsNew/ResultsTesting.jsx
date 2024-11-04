import { mockResults } from "../../modules/results/mock-results";
import ResultsFull from "./ResultsFull";
import ResultsNew from "./ResultsNew";
import { rawQuestions } from "../../modules/results/raw-questions";
import { useEffect, useState } from "react";

function ResultsTesting() {
  const [data, setData] = useState();

  console.log(rawQuestions);

  useEffect(() => {
    let rawQuestions2 = rawQuestions.map((q) => {
      if (q.Dimension == "Extended Workforce") {
        q.Current = 4;
        q.Desired = 4;
      } else {
        q.Current = 3;
        q.Desired = 4;
      }
    });
    setData(rawQuestions);
  }, []);
  return (
    <div>
      <div>
        <ResultsFull diagnostic={rawQuestions} />
      </div>
    </div>
  );
}

export default ResultsTesting;
