import { useEffect } from "react";
import HubspotForm from "react-hubspot-form";
import { Helmet } from "react-helmet";
import $ from "jquery";
//import "./styleHs.css";

function TestHSForm() {
  const tfHidden = { q1: "test q1", q2: "test q2" };
  function addClasses(selector, classes) {
    const tempItem = document.querySelectorAll(selector);
    for (let i = 0; i < tempItem.length; i++) {
      tempItem[i].classList.add(...classes);
    }
  }

  const FORM_ID = "df3ac686-87c9-4fb1-91d9-dcc3f4fe2041";
  const PORTAL_ID = "7988397";

  return (
    <>
      <div className="flex w-screen items-center  pb-20">
        <div className="w-1/3">
          <HubspotForm
            portalId="7988397"
            formId="df3ac686-87c9-4fb1-91d9-dcc3f4fe2041"
            // onSubmit={() => {
            //   let scripts = document.querySelectorAll("script");
            //   console.log(scripts);
            // }}
            onReady={(form) => {
              addClasses("form", ["flex", "flex-col", "gap-6", "text-noto", "items-center"]);
              let inputs = document.querySelectorAll("input");
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("taindex", "1");
              }

              for (const q in tfHidden) {
                let testS = `input[name="${q}"]`;
                let inputElement = document.querySelector(testS);
                inputElement.value = tfHidden[q];
                //   console.log(inputElement.value);
              }
            }}
            loading={<div>Loading...</div>}
          />
        </div>
      </div>
      {/* <div
        onClick={() => {
          let scripts = document.querySelectorAll("script");
          console.log(scripts);
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].id == "recaptcha") {
              console.log(scripts[i]);
              scripts[i].parentElement.removeChild(scripts[i]);
              scripts[i].parentElement.removeChild(scripts[i]);
            }
            console.log(scripts);
          }
          console.log(scripts);
        }}
        className="btn"
      >
        test
      </div> */}
      <div className="hidden select select-bordered"> </div>
      <div className="hidden input input-bordered w-80"></div>
    </>
  );
}

export default TestHSForm;
