import { useEffect } from "react";
import HubspotForm from "react-hubspot-form";
import { Helmet } from "react-helmet";
import $ from "jquery";
//import "./styleHs.css";

function HubSpotForm({ tfHidden, setViewForm, setSeeResult, setIsExpoding }) {
  // useEffect(()=>{

  function inputHandler(event) {
    // console.log(document.querySelectorAll(".invalid"));
    // console.log("FirstName: " + document.querySelector("input[name='firstname']").value);
    // console.log("Your Role: " + document.querySelector("select[name='your_role']").value);
    if (
      document.querySelectorAll(".invalid").length > 1 ||
      document.querySelector("input[name='email']").value == "" ||
      document.querySelector("input[name='firstname']").value == "" ||
      document.querySelector("input[name='lastname']").value == "" ||
      document.querySelector("select[name='your_role']").value == "" ||
      document.querySelector("select[name='0-2/diagnostic_tool_industry']").value == "" ||
      document.querySelector("input[name='0-2/diagnostic_company_name']").value == "" ||
      document.querySelector("select[name='0-2/region']").value == ""
    ) {
      console.log("I ran");
      console.log(document.querySelectorAll(".invalid"));
      console.log(document.querySelector("input[name='email']"));
      console.log(document.querySelector("input[name='firstname']"));
      console.log(document.querySelector("input[name='lastname']"));
      console.log(document.querySelector("select[name='your_role']"));
      console.log(document.querySelector("select[name='0-2/diagnostic_tool_industry']"));
      console.log(document.querySelector("input[name='0-2/diagnostic_company_name']"));
      console.log(document.querySelector("select[name='0-2/region']"));
    } else {
      handleSubmit();
    }
  }

  // },[])
  function handleSubmit() {
    // e.preventDefault();
    // console.log("Handle Submit");
    document.getElementById("complete-message-wrapper").classList.add("absolute", "-mt-[2500%]");
    // setViewForm(false);
    //setIsExpoding(false);
    setSeeResult(true);
  }

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
      <div id="hs-form-wrapper" className="flex w-screen items-center  pb-20">
        <div className="md:w-1/3">
          <HubspotForm
            portalId="7988397"
            formId="df3ac686-87c9-4fb1-91d9-dcc3f4fe2041"
            onSubmit={(e) => {
              //  e.preventDefault();
              //      console.log("I ran");
              setViewForm(false);
              setIsExpoding(false);
              setSeeResult(true);
            }}
            onReady={(form) => {
              // console.log("your role val " + (document.querySelector("select[name='your_role']").value == ""));
              // console.log(document.querySelectorAll(".invalid").length);
              addClasses("form", ["flex", "flex-col", "gap-6", "text-noto", "items-center", "max-sm:w-screen"]);
              let submitButton = document.querySelector("input[type='submit']");
              submitButton.classList.add("focus:outline");
              submitButton.addEventListener("click", (event) => inputHandler(event));
              submitButton.addEventListener("onKeyDown", (event) => {
                if (e.key == "Enter" || e.key == " ") {
                  inputHandler(event);
                }
              });
              let inputs = document.querySelectorAll("input");
              inputs = [...inputs, ...document.querySelectorAll("select")];
              console.log(inputs);
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("tabindex", "0");
              }
              // let submitButton = document.querySelector("hs-button");

              for (const q in tfHidden) {
                let testS = `input[name="${q}"]`;
                let inputElement = document.querySelector(testS);
                inputElement.value = tfHidden[q];
                //   console.log(inputElement.value);
              }
            }}
          />
        </div>
      </div>
      <div className="hidden select select-bordered"> </div>
      <div className="hidden input input-bordered w-80 invisible"></div>
    </>
  );
}

export default HubSpotForm;
