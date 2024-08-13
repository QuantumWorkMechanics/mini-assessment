import { useEffect, useState } from "react";

function OtherPopup({ other, setOther }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Other:</h3>
        <input
          onChange={(e) => setOther(e.target.value)}
          value={other}
          type="text"
          placeholder="Please specify"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">OK</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default OtherPopup;
