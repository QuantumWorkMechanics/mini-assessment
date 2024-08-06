import { Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire/Questionnaire";
import Selections from "./Setup/Selections/Selections";
import Landing from "./Setup/Landing";
import Scrubber from "../modules/Scrubber";
import { useState } from "react";

function App() {
  const [data, setData] = useState();
  return (
    <Routes>
      <Route path="/" element={<Selections data={data} setData={setData}></Selections>} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/scrubber" element={<Scrubber />} />
    </Routes>
  );
}

export default App;
