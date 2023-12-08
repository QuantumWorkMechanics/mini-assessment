import React, { useState, useEffect } from "react";
import { resultsList } from "../../modules/question-bank";

export default function Overall({
  total,
  title,
  content,
  totalColor,
  resultLookup,
}) {
  const [level, setLevel] = useState(
    (total > 0 && total < 2 && "Starting") ||
      (total >= 2 && total < 3 && "Developing") ||
      (total >= 3 && total < 4 && "Intermediate") ||
      (total >= 4 && "Advanced")
  );
  console.log({ total });

  return (
    <div className="p-5 flex flex-col items-end">
      <div className="ml-2 text-xs mb-2 bg-neutral-50 rounded-full w-fit p-2 shadow-md">
        {title + ": "}
        <span className="text-3xl font-semibold" style={{ color: totalColor }}>
          {" "}
          {Math.floor(total)}
        </span>
      </div>
      {level && (
        <>
          <div className="ml-2 text-3xl font-extralight text-[#065a9e]">
            {level}
          </div>

          <div className=" text-sm hyphens-auto pl-8  mt-4 text-[#666666] leading-6  w-[46ch]">
            {
              resultsList.filter((el) => {
                console.log({ el, resultLookup });
                return el.type == resultLookup;
              })[0][level.toLowerCase()]
            }
          </div>
        </>
      )}
    </div>
  );
}
