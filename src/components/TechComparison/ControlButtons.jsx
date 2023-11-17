import React, { useState } from "react";

export default function ControlButtons(
  selectedItem,
  setSetter,
  item,
  items,
  itemIndex,
  handler
) {
  console.log({ selectedItem });

  return (
    <>
      <button
        onClick={() => {
          //   console.log({ personas, personaIndex });
          selectedItem
            ? () => setSetter()
            : () => setSetter(items[itemIndex][item]);
        }}
        className="z-30 text-xs text-white p-1 mr-2 rounded bg-[#0EA8DC] w-24"
      >
        {(!selectedItem && "Show") || "Hide"} Persona
      </button>
      <div>
        <button
          onClick={() => {
            return handler(-1);
          }}
          className={
            "z-60 p-3 mx-2 rounded " +
            ((selectedItem && "bg-[#0EA8DC]") || "bg-slate-400")
          }
        >
          {"<"}
        </button>
        <button
          onClick={() => handler(1)}
          className={
            "z-60 p-3 mx-2 rounded " +
            ((selectedItem && "bg-[#0EA8DC]") || "bg-slate-400")
          }
        >
          {">"}
        </button>
      </div>
    </>
  );
}
