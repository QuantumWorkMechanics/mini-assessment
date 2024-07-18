import React from "react";
import { Button } from "@mui/material";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

export default function AllSectionsComplete({ setSeeResult, setIsExploding }) {
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
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setSeeResult(true);
            setIsExploding(false);
          }}
        >
          See Results
        </Button>
      </div>
    </>
  );
}
