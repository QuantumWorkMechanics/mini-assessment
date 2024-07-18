import { useState } from "react";
import Selections from "./Selections/Selections";
import { useNavigate } from "react-router-dom";
import Form from "./Form/Form";
import { PopupButton } from "@typeform/embed-react";

function Landing() {
  const [data, setData] = useState();

  return (
    <div>
      <Selections data={data} setData={setData}></Selections>
    </div>
  );
}

export default Landing;
