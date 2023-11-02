import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarGraph from "../Assessment/Assessment-result-components/BarGraph";
import FrequencyPie from "./FrequencyPie";
import NavBar from "../Navigation/NavBar";
import VerticalBarGraph from "./VerticalBar";

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
  //   const mimir_url = "https://mimir-production.up.railway.app/";
  const mimir_url = "http://localhost:3000/";
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

  const colorArr = ["#0E6AAD", "#0EA8DC", "#09497B", "#666666"];

  return (
    <>
      <div className="bg-[url('/public/dataReview.png')] bg-fixed bg-cover bg-no-repeat">
        <div className="bg-opacity-80  bg-white ">
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
                  <div className="m-10 pb-14  rounded-lg">
                    <div className="ml-14 flex justify-start gap-5 ">
                      <div className="   text-[40pt] text-[#09497B] font-semibold">
                        {el}
                      </div>
                      <img
                        className="w-auto h-14"
                        src={
                          data.typeForm.fields.filter(
                            (field) => field.title == el
                          )[0].attachment.href
                        }
                        alt=""
                      />
                    </div>
                    <div key={`${el}_bar`} className="w-screen flex ">
                      <div className="place-self-end">
                        <div className="">
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
                      <div className="md:w-[70%] md:h-[400px]  order-first">
                        <VerticalBarGraph
                          key={`${el}_composed`}
                          categories={[el]}
                          personas={tempPersonas}
                          typeForm={tempForm}
                          customColor={"#0E6AAD"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="divider bg-[#FDB517] h-2 rounded mx-24"></div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
