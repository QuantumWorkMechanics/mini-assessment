import { Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire/Questionnaire";
import Selections from "./Selections/Selections";
import Assessment from "./Assessment/Assessment";
import FullDiagnosticResults from "./Assessment/Assess-result";
import WordCloud from "./WordCloud/Wordcloud";
import TechComparison from "./TechComparison/TechComparison";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Selections />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/assess" element={<Assessment />} />
      <Route
        path="/diagnostic/:tfid"
        element={<FullDiagnosticResults />}
      ></Route>
      <Route path="/wordcloud/:tfid" element={<WordCloud />}></Route>
      <Route path="/tech-compare/:tfid" element={<TechComparison />}></Route>
    </Routes>
  );
}

export default App;
