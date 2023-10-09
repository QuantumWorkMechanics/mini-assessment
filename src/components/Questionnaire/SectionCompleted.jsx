import React from "react";
import { Button } from "@mui/material";

export default function SectionComplete({ setSeeResult, setSectionComplete }) {
  return (
    <div className="absolute z-40 w-screen h-screen bg-white  text-center ">
      <div className="text-3xl md:text-[60pt] mt-[20vh] animate-jump-in animate-duration-700 animate-delay-500">
        Good Work!
      </div>

      <div className="mt-20 text-lg md:text-xl animate-jump-in animate-duration-700 animate-delay-1000">
        You completed a section
      </div>

      <div className="animate-fade animate-once animate-duration-400 animate-delay-[1600ms]">
        <Button
          style={{ minWidth: "120px", margin: "20px" }}
          variant="outlined"
          size="large"
          onClick={() => {
            setSeeResult(true);
            setSectionComplete(false);
          }}
        >
          SEE RESULTS
        </Button>
        <Button
          style={{ minWidth: "120px", margin: "20px" }}
          variant="outlined"
          size="large"
          onClick={() => setSectionComplete(false)}
        >
          KEEP GOING
        </Button>
      </div>
    </div>
  );
}
