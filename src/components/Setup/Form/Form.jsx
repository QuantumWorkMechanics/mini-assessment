import { useNavigate } from "react-router-dom";
import { formQuestions } from "../../../modules/form-questions";
import Choice from "./form-question-types/Choice";
import { Widget } from "@typeform/embed-react";

function Form({ data }) {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/questionnaire", { state: data })}>Go to</button>
      <div className="w-screen flex flex-col items-center h-screen">
        <Widget id="JU5OyH4T" style={{ width: "75%", height: "75%" }} className="my-form" />
      </div>
    </div>
  );
}

export default Form;
