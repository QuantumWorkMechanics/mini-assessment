import React, { useState, useEffect } from "react";
import VerticalBarGraph from "./VerticalBar";
import FrequencyPie from "./FrequencyPie";

export default function TechDash({
  data,
  colorArr,
  parentPersona,
  tempPersonas,
  tempForm,
  handleParent,
  el,
}) {
  const [selectedPersona, setSelectedPersona] = useState();
  const [personaIndex, setPersonaIndex] = useState(0);
  const [dataSet, setDataSet] = useState();
  const [imgSrc, setImgSrc] = useState(
    data.typeForm.fields.filter((field) => field.title == el)[0].attachment.href
  );

  useEffect(() => {
    let tempDataArr = data.scoredFrequencies.filter(
      (item) => item.category == el
    )[0];
    console.log("pie");
    let tempData;
    if (!selectedPersona) {
      tempData = tempDataArr.choices.map((el) => {
        let tempDatum = {
          choice: el,
          score: tempDataArr[el].all ? tempDataArr[el].all : 0,
        };
        return tempDatum;
      });
    } else
      tempData = tempDataArr.choices.map((el) => {
        let tempDatum = {
          choice: el,
          score: tempDataArr[el][selectedPersona]
            ? tempDataArr[el][selectedPersona]
            : 0,
        };
        return tempDatum;
      });
    console.log({ tempData });
    setDataSet(tempData);
  }, [selectedPersona]);

  return (
    <>
      {" "}
      <div className="m-2 md:m-10 pb-14 pt-4 rounded-lg bg-opacity-90  bg-white ">
        <div className="md:ml-14 flex justify-around md:justify-start gap-5 mb-3 md:mt-2  md:mb-0">
          <div className=" text-2xl  lg:text-[40pt] text-[#09497B] font-semibold">
            {el}
          </div>
          {imgSrc && <img className="w-auto h-8 lg:h-14" src={imgSrc} alt="" />}
        </div>
        <div
          key={`${el}_bar`}
          className="w-screen place-content-start flex flex-col lg:flex-row"
        >
          <div className="lg:place-self-end ">
            <div className="lg:-ml-12 xl:-ml-4">
              {dataSet && (
                <FrequencyPie
                  dataSet={dataSet}
                  colorArr={colorArr}
                  selectedPersona={selectedPersona}
                />
              )}
            </div>
          </div>
          <div className=" md:w-[70%] h-[200px] md:h-[400px] z-50 md:ml-0 order-first ">
            <VerticalBarGraph
              key={`${el}_composed`}
              categories={[el]}
              personas={tempPersonas}
              typeForm={tempForm}
              customColor={"#0E6AAD"}
              handleParent={handleParent}
              setPersonaIndex={setPersonaIndex}
              setSelectedPersona={setSelectedPersona}
              personaIndex={personaIndex}
              selectedPersona={selectedPersona}
            />
          </div>
        </div>
      </div>
      <div className="divider bg-[#FDB517] h-2 rounded mx-24"></div>
    </>
  );
}
