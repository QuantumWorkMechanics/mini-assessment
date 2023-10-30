import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarGraph from "../Assessment/Assessment-result-components/BarGraph";
import FrequencyPie from "./FrequencyPie";
import NavBar from "../Navigation/NavBar";

export default function FullDiagnosticResults() {
  const routeParams = useParams();
  const [data, setData] = useState();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   console.log({ requestOptions });
  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(
      mimir_url + "tf-techcompare/" + routeParams.tfid,
      requestOptions
    )
      .then((response) => {
        // console.log({ response });
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();

    console.log({ dataSet });
    return dataSet;
  }

  useEffect(() => {
    getData().then((data) => {
      //   console.log({ data });
      setData(data);
    });
  }, []);

  const colorArr = ["#0E6AAD", "#0EA8DC", "#FFCB18", "#666666"];

  return (
    <>
      <NavBar></NavBar>
      {data &&
        data.categories.map((el, index) => {
          let tempPersonas = data.personas.map((el) => {
            return { persona: el };
          });
          //   console.log({ tempPersonas });
          const tempForm = data.fullForm.filter((question) => {
            return question.category == el;
          });
          //   console.log({ tempForm });

          return (
            <>
              <div
                key={`${el}_bar`}
                className="md:grid md:grid-cols-2 w-screen my-20"
              >
                <div className="place-self-center">
                  <img
                    className="w-auto h-14"
                    src={
                      data.typeForm.fields.filter(
                        (field) => field.title == el
                      )[0].attachment.href
                    }
                    alt=""
                  />
                  <div className="flex flex-col items-end justify-center mr-10">
                    <div className="text-end  md:w-[50%] place-self-end text-[40pt] text-[#09497B]">
                      {el}
                    </div>
                    {data && (
                      <FrequencyPie
                        data={
                          data.scoredFrequencies.filter(
                            (item) => item.category == el
                          )[0]
                        }
                        colorArr={colorArr}
                      />
                    )}
                  </div>
                </div>
                <div className="w-screen md:w-[80%] bg-slate-50 mr-[10%]">
                  <BarGraph
                    key={`${el}_composed`}
                    categories={[el]}
                    personas={tempPersonas}
                    typeForm={tempForm}
                    customColor={"#0E6AAD"}
                  />
                </div>
              </div>
              <div className="divider"></div>
            </>
          );
        })}
    </>
  );
}
