import { useState } from "react";
import img1 from "../../assets/image7.jpeg";
function SingleSelect({ questionNum, handleSingleSelect, handleNext }) {
  const colNumTailwind = Math.min(Math.floor(questionNum.Response_1.length / 3), 3);
  // const [isSelected, setIsSelected] = useState(false);

  {
    /* <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Remember me</span>
    <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
  </label>
</div> */
  }

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-light pt-10 pl-8 pr-8">{questionNum.question}</h2>
        <div className="flex flex-col justify-center items-center gap-2 md:w-full  ">
          {questionNum.Response_1.map((choice, i) => {
            let item = choice.replace("-", "").trim();
            // let isSelected = questionNum.selections.indexOf(item) > -1;
            return (
              <div
                // className={" btn btn-outline " + (questionNum.selections[0] && item == questionNum.selections[0]) && " btn-active"}
                className={
                  "cursor-pointer rounded-md w-72 border-2 p-2 hover:bg-sky-200 hover:text-[#ffffff] " +
                  (questionNum.selections.indexOf(item) > -1 && " bg-sky-700 text-white")
                }
                key={`btn_${choice}_${i}`}
                onClick={() => {
                  // setIsSelected((prev) => !prev);
                  handleSingleSelect(item);
                  // if (`#${item}_check`)
                  console.log(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div onClick={handleNext} className="btn btn-outline mt-10">
          NEXT
        </div>
      </div>
    </div>
  );
}

export default SingleSelect;
