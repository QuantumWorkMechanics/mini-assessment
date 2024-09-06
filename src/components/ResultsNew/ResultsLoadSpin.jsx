import LoadSpinner from "../Utils.jsx/LoadSpinner";

function ResultsLoadSpin({ progress }) {
  return (
    <div id="absolute z-50 pdf-download" className="rounded  bg-slate-100 border-2 fixed top-[30vh] w-full ">
      <LoadSpinner />
      <div className="w-full flex justify-center">
        <div className="w-[500px] h-4 rounded-full bg-slate-300 mb-14">
          <div className="h-4 rounded-full bg-[#FDB517]" style={{ width: progress.toString() + "%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default ResultsLoadSpin;
