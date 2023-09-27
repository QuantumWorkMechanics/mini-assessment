import { Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire/Questionnaire";
import Selections from "./Selections/Selections";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Selections />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
