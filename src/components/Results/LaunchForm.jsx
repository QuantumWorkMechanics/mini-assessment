import React, { useState } from "react";

export default function LaunchForm({ setShowForm, handleDownloadPDF }) {
  return (
    <>
      <div className="w-full">Placeholder</div>
      <div className="bg-neutral-50 flex  items-center p-4 border rounded border-#0e416c">
        <div>
          <label htmlFor="email" className="">
            Would you like to receive a detailed PDF of your results?
          </label>
          <input
            id="email"
            type="text"
            placeholder="Work Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#1290e5] text-white p-2 rounded h-10"
        >
          Submit
        </button>
      </div>
    </>
  );
}
