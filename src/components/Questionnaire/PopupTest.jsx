import { useEffect, useState } from "react";
import OtherPopup from "./OtherPopup";

function PopupTest() {
  const [other, setOther] = useState("");
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);
  return (
    <div>
      <OtherPopup other={other} setOther={setOther} />
    </div>
  );
}

export default PopupTest;
