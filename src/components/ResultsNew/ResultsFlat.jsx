import { useEffect, useState } from "react";
import { scoreDiagnostic } from "../../modules/results/scoring-service";
import LoadSpinner from "../Utils.jsx/LoadSpinner";
import TextGenAI from "../Utils.jsx/TextGenAI";
import GaugeChartOne from "../Utils.jsx/GaugeChartOne";
import logo from "../../assets/grayScaleLogo.png";
import DiamondResults from "./DiamondResults";
import Divider from "../Utils.jsx/Divider";
import { BUSINESS_STRATEGY, WHATS_NEXT } from "./results-copy";
import ResultsRadar from "./ResultsRadar";
import ResultsSubResult from "./ResultsSubResult";
import SpeedometerOne from "../Utils.jsx/SpeedometerOne";
import SpeedometerTwo from "../Utils.jsx/SpeedometerTwo";
import SpeedometerThree from "../Utils.jsx/SpeedometerThree";
import SpeedometerFour from "../Utils.jsx/SpeedometerFour";
import SpeedometerFive from "../Utils.jsx/SpeedometerFive";
import Box from "../Utils.jsx/Box";
import LaunchPDF from "./LaunchPDF";

const DIMENSIONS = [
  "HR Ecosystem Maturity",
  "Skills Maturity",
  "HR Strategy and Planning",
  "Implementation and Change Management",
  "Digital HR Transformation",
];

function ResultsFlat({ diagnostic }) {
  const [results, setResults] = useState();
  const [dimensionResults, setDimensionResults] = useState();
  const [current, setCurrent] = useState();
  const [desired, setDesired] = useState();
  const [orgResults, setOrgResults] = useState();
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log({ diagnostic });
      const tempResults = scoreDiagnostic(diagnostic);
      setResults(diagnostic);
      setDimensionResults(tempResults.dimensionResults);
      //   console.log((tempResults.currentAvg / 4) * 100);
      setCurrent(tempResults.currentAvg);
      setDesired(tempResults.desiredAvg);
      setOrgResults(tempResults.orgResults);
      console.log(tempResults);
      setReady(true);
    }, 2500);
  }, []);

  return (
    <>
      <div id="flat-result" className="h-screen flex flex-col items-center justify-center overflow-x-contain">
        {!results && <LoadSpinner text={"...fetching results"} />}
        {ready && (
          <div className="flex flex-col h-screen w-screen ">
            <div className="w-screen bg-[#09497B] ">
              <img className="z-50 hidden md:block  md:-mt-8 overflow-show md:w-[300px] overflow-show " src={logo} alt="" />
            </div>
            <h1 className="z-40 overflow-show text-[#FDB517] font-bold text-xl md:text-[30pt] bg-[#09497B] text-center pt-28 md:pt-0">
              {BUSINESS_STRATEGY.title}{" "}
            </h1>
            <div className="flex flex-col md:gap-4 xl:gap-10 md:flex-row bg-[#09497B] text-white xl:justify-around items-center p-2 md:pl-20 md:pr-20 xl:pl-40 xl:pr-40">
              <div className="md:w-1/2 ">
                {/* <h1 className="text-2xl md:pt-10 text-center animate-fade-up font-semibold">WORFORCE AGILITY DIAGNOSTIC</h1> */}
                <div className="flex items-center py-4 px-4 md:p-0 text-justify md:mt-10 md:text-2xl font-light">
                  Thank you for completing the diagnostic. Your responses provide valuable insights that will help us tailor solutions to advance your
                  HR technology capabilities and align them with your strategic goals. Below, you'll find the maturity results for your HR tech
                  ecosystem and a detailed analysis for the selected tech stack area(s).{" "}
                </div>
              </div>
              <div className="order-first md:order-last justify-center w-full md:w-1/2 my-14">
                <DiamondResults />
              </div>
            </div>

            <div className="bg-[#09497B]">
              {/* <div className="bg-slate-200 flex text-justify flex-col md:mx-20 md:my-8 p-10 gap-10 border border-black-2 shadow-md"> */}
              <Box>
                <div className="flex items-center text-justify">{orgResults.result}</div>
              </Box>
              {/* </div> */}
            </div>
            <div className="flex flex-col md:flex-row justify-around  items-center font-semibold text-lg bg-[#09497B] p-6">
              <div id="current-speedometer" className="flex flex-col items-center">
                {/* <GaugeChartOne gaugeVal={current} /> */}
                <div className="text-[#FDB517] font-bold">Current</div>
                <SpeedometerFive gaugeVal={current} />
              </div>
              <div id="desired-speedometer" className="flex flex-col items-center">
                <div className="text-[#FDB517] font-bold">
                  Desired<span className=" absolute mt-52  text-xs">* based on your selections.</span>
                </div>
                <SpeedometerFive gaugeVal={desired} />
              </div>
            </div>
            <div className="m-5 md:m-14 overflow-x-contain w-full">
              <ResultsRadar
                customLabel={false}
                data={diagnostic.filter((question) => {
                  return question.fieldType == "Slider Field" && DIMENSIONS.includes(question.Type);
                })}
              />
            </div>
            <Divider text={BUSINESS_STRATEGY.title} />
            <Box>
              <h3 className="md:hidden text-2xl py-4 text-justify">{BUSINESS_STRATEGY.title} </h3>
              <div>{BUSINESS_STRATEGY.text}</div>
            </Box>
            {dimensionResults && dimensionResults.map((result) => <ResultsSubResult key={`${result.dimension}`} result={result} />)}
            <Divider text={"What's NEXT?"} />
            <Box className=" bg-slate-200 flex flex-col md:mx-20 md:my-8 p-10 gap-10 border border-[#999999] shadow">
              <div className="w-full">
                <div>
                  Evolving your HR technology stack is a complex process that requires careful planning, strategic alignment, and seamless execution.
                  Here’s how <strong>QuantumWork Advisory</strong> can help you navigate this journey:{" "}
                </div>
                <div className="py-6">
                  {WHATS_NEXT.map((el, i) => {
                    return (
                      <div className="py-1" key={`next_${i}`}>
                        <strong>{el.title}</strong>
                        <div className="pl-4">{el.text[0]}</div>
                        <div className="pl-4">{el.text[1]}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="font-semibold">
                  By partnering with us, your organization will benefit from our deep expertise, strategic insights, and proven methodologies,
                  ensuring your HR technology evolves effectively and supports your long-term business success. Email us at info@quantumwork.com{" "}
                </div>
              </div>
            </Box>
            <div className="mt-40">&copy{new Date().getFullYear}QunatumWork Advisory</div>
          </div>
        )}
      </div>
      {/* <div className="bottom-0 fixed w-screen justify-center">
        {results && <LaunchPDF progress={progress} setProgress={setProgress} results={results} />}
      </div> */}
    </>
  );
}

export default ResultsFlat;
