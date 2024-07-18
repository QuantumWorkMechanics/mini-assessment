import { Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire/Questionnaire";
import Selections from "./Setup/Selections/Selections";
import Landing from "./Setup/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
