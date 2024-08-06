import { useState } from "react";
import img1 from "../../assets/image7.jpeg";
function MultiSelect({ questionNum, handleMultiSelect, handleNext }) {
  const colNumTailwind = Math.min(Math.floor(questionNum.Response_1.length / 3), 3);
  const [isSelected, setIsSelected] = useState(false);

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
        <div className="md:grid md:grid-cols-2 p-10 md:grid-flow-row flex flex-col gap-2 md:w-full  ">
          {questionNum.Response_1.map((choice, i) => {
            let item = choice.replace("-", "").trim();
            // let isSelected = questionNum.selections.indexOf(item) > -1;
            return (
              <div className=" hover:bg-sky-700 hover:text-[#ffffff] w-58 form control gap-2  border-2 rounded" key={`btn_${choice}_${i}`}>
                <label className="label cursor-pointer flex justify-start gap-3 hover:text-white">
                  <input
                    onChange={() => {
                      handleMultiSelect(item);
                      // if (`#${item}_check`)
                      console.log(item);
                    }}
                    id={`${item}_check`}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="">{item.split("(")[0]}</span>
                </label>
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

export default MultiSelect;
