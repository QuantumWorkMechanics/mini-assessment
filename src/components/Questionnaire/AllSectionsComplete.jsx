import React, { useState } from "react";
import { Button } from "@mui/material";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { PopupButton } from "@typeform/embed-react";
import HubSpotForm from "./HubSpotForm";
import Box from "../Utils.jsx/Box";
import logo from "../../assets/colorLogo.png";

const FORM_ID = "df3ac686-87c9-4fb1-91d9-dcc3f4fe2041";
const PORTAL_ID = "7988397";

export default function AllSectionsComplete({ setSeeResult, setIsExploding, tfHidden }) {
  const [viewForm, setViewForm] = useState(false);
  console.log({ tfHidden });
  return (
    <>
      <div className="absolute z-50 left-[50vw] top-[60vh] ">
        <Realistic autorun={{ speed: 200, duration: 1, gravity: 10 }} />
      </div>
      <div className="text-[30pt] md:text-[60pt] place-self-center mt-[20vh] animate-jump-in animate-duration-700 animate-delay-500">Great Job!</div>
      <div className="text-xl md:text-3xl mt-4 place-self-center  animate-jump-in animate-duration-700 animate-delay-1000">
        You answered all the questions.
      </div>
      <div className="text-md md:text-xl place-self-center mt-10 animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
        Click below to see your results.
      </div>
      <div className="w-[150px] place-self-center mt-24 animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
        {/* {!viewForm && ( */}
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setViewForm(true);
            // document.getElementById("hs_modal").showModal();
            // setSeeResult(true);
            // setIsExploding(false);
          }}
        >
          See Results
        </Button>
        {/* )} */}

        {/* <PopupButton
          hidden={tfHidden}
          //   onSubmit={() => handleReady()}
          id="JU5OyH4T"
          autoClose={true}
          style={{ fontSize: 16 }}
          className="my-button btn btn-outline text-sm md:text-[#09497B]"
          onSubmit={(event) => {
            console.log(event);
            setSeeResult(true);
            setIsExploding(false);
          }}
          onQuestionChanged={(event) => console.log(event)}
        >
          See Results
        </PopupButton> 
        '0-2/q1'
        "0-2/q1"
        "0-2/q2"
        */}
        {/* <dialog id="hs_modal" className="modal modal-bottom sm:modal-middle"> */}
        {viewForm && (
          <div className="absolute top-0 left-0 w-screen h-screen ">
            <div className="flex flex-col w-screen justify-center items-center ">
              <div className="md:w-1/3 bg-slate-100 min-h-screen border-2 my-4 ">
                <div className="flex flex-col animate-fade-up">
                  <div
                    className="btn btn-outline animate-fade-up animate-delay-500"
                    onClick={() => {
                      setViewForm(false);
                      setSeeResult(true);
                      setIsExploding(false);
                    }}
                  >
                    SKIP
                  </div>
                  <img src={logo} className="h-52 w-fit self-center " alt="" />
                  <HubSpotForm tfHidden={tfHidden} setViewForm={setViewForm} setSeeResult={setSeeResult} setIsExpoding={setIsExploding} />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* </dialog> */}
      </div>

      {/* {viewForm && tfHidden && (
        <HubspotForm
          portalId="7988397"
          formId="df3ac686-87c9-4fb1-91d9-dcc3f4fe2041"
          onSubmit={() => console.log("Submit!")}
          onReady={(form) => {
            console.log("onReady");
            let ques = "q1";
            let testS = `input[name="0-2/${ques}"]`;
            const inputElement = document.querySelector('input[name="0-2/q1"]');
            const inputElement2 = document.querySelector(testS);
            console.log({ inputElement, inputElement2 });
            const yourRole = document.getElementById("your_role-df3ac686-87c9-4fb1-91d9-dcc3f4fe2041");
            yourRole.classList.add("select", "border-2");
            const fields = document.querySelectorAll(".hs-form-field");

            for (const q in tfHidden) {
              console.log({ q });
              let testS = `input[name="0-2/${q}"]`;
              const inputElement = document.querySelector('input[name="0-2/q1"]');
              inputElement.value = tfHidden[q];
              console.log(inputElement.value);
            }
          }}
          loading={<div>Loading...</div>}
        />
      )} */}
    </>
  );
}

{
  /* <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "7988397",
    formId: "df3ac686-87c9-4fb1-91d9-dcc3f4fe2041"
  });
</script> */
}
