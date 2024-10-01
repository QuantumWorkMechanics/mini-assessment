import { Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire/Questionnaire";
import Selections from "./Setup/Selections/Selections";
import Landing from "./Setup/Landing";
import Scrubber from "../modules/Scrubber";
import { useState } from "react";
import ResultsTesting from "./ResultsNew/ResultsTesting";
import ResultsTesting2 from "./ResultsNew/ResultsTesting2";
import PopupTest from "./Questionnaire/PopupTest";
import Speedometer from "./Utils.jsx/Speedometer";
import Radial from "./Utils.jsx/Radial";
import TestHSForm from "./Questionnaire/TestHSForm";
import BarVertical from "./ResultsNew/BarVertical";
import BarTest from "./ResultsNew/BarTest";

function App() {
  const [data, setData] = useState();
  return (
    <Routes>
      <Route path="/" element={<Selections data={data} setData={setData}></Selections>} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/scrubber" element={<Scrubber />} />
      <Route path="/results-test" element={<ResultsTesting />} />
      <Route path="/results-test2" element={<ResultsTesting2 />} />
      <Route path="/modal-test" element={<PopupTest />} />
      <Route path="/speedometer" element={<Speedometer />} />
      <Route path="/radial" element={<Radial />} />
      <Route path="/test-form" element={<TestHSForm />} />
      <Route path="/bar-test" element={<BarTest />} />
    </Routes>
  );
}

export default App;
