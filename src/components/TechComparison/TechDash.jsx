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
    data.typeForm.fields.filter((field) => field.title == el)[0]?.attachment
      ?.href || null
  );

  //   console.log({ tempForm });

  useEffect(() => {
    let tempDataArr = data.scoredFrequencies.filter(
      (item) => item.category == el
    )[0];

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

  console.log({ tempPersonas });

  return (
    <>
      <div
        key={el + "_dashboard"}
        className="m-2 md:m-10 pb-14 pt-4 rounded-lg bg-opacity-90  bg-white"
      >
        <div className="ml-4 md:ml-14 flex flex-col sm:flex-row justify-between justify-start gap-5 mb-3 md:mt-2 mr-4 md:mb-0">
          <div className="flex gap-5 items-center">
            <div className=" text-2xl  lg:text-[40pt] text-[#09497B] font-semibold">
              {el}
            </div>
            {imgSrc && (
              <img className="w-auto h-8 lg:h-14" src={imgSrc} alt="" />
            )}
          </div>
          <div className=" text-xl md:text-3xl font-semibold text-[#0EA8DC]">
            <span className="text-[#09497B] font-normal">Overall: </span>
            {Math.floor(
              (tempForm.reduce(function (acc, obj) {
                return acc + obj.AllAvgScore;
              }, 0) *
                100) /
                tempForm.length
            ) / 100}
          </div>
        </div>
        <div
          key={el + "_bar"}
          className="w-screen flex flex-col justify-between lg:flex-row"
        >
          <div className="flex flex-col  justify-between ">
            <div className="flex flex-col mt-14 pr-40 pl-3 sm:place-self-end justify-between  text-[#09497B]">
              <div className="font-bold">Respondents</div>
              {data &&
                tempPersonas.map((persona, index) => {
                  console.log({ el });
                  console.log(data.choices);
                  let score = data.choices.filter(
                    (choice) => choice.label.trim() == el.trim()
                  );
                  console.log({ score });
                  if (score.length > 0) console.log(score.length);
                  let totalScore = 0;
                  if (tempPersonas.length == index + 1 && score.length) {
                    let tempValues = Object.values(score[0]).filter((obj) =>
                      Number.isInteger(obj)
                    );
                    totalScore = tempValues.reduce(function (acc, num) {
                      return acc + num;
                    });
                    // console.log({ totalScore });
                  }
                  //   console.log({ score });
                  return (
                    <>
                      {score[0] && (
                        <div
                          className="flex justify-between"
                          key={persona.persona + el}
                        >
                          <div className="mr-2">{`${persona.persona}:`}</div>
                          <div>{`${score[0][persona.persona]}`}</div>
                        </div>
                      )}
                      {totalScore > 0 && (
                        <div
                          key={el + " total"}
                          className="flex justify-between text-[#0EA8DC]"
                        >
                          <div>Total:</div>
                          <div>{totalScore}</div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
            <div className="">
              <div className="">
                {dataSet && (
                  <FrequencyPie
                    dataSet={dataSet}
                    colorArr={colorArr}
                    selectedPersona={selectedPersona}
                  />
                )}
              </div>
            </div>
          </div>
          <div className=" md:w-[40%] h-[200px] md:h-[400px] z-50 md:ml-0 order-first ">
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
