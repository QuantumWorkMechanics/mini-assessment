import React, { useState, useEffect } from "react";

import Slider from "@mui/material/Slider";

export default function Ranges({ themeStyle }) {
  const [slideValue, setSlideValue] = useState(0);

  return (
    <>
      <div className="">
        <div className=" bottom-0">
          <input
            type="range"
            value={slideValue}
            min={0}
            max={5}
            className={"bg-white md:w-80 range range-xs range-" + themeStyle}
            step="1"
            onChange={(e) => setSlideValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
