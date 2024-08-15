import { useEffect, useState } from "react";
import { scoreDiagnostic } from "../../modules/results/scoring-service";
import LoadSpinner from "../Utils.jsx/LoadSpinner";
import TextGenAI from "../Utils.jsx/TextGenAI";
import GaugeChartOne from "../Utils.jsx/GaugeChartOne";
import logo from "../../assets/colorLogo.png";
import DiamondResults from "./DiamondResults";
import Divider from "../Utils.jsx/Divider";
import { BUSINESS_STRATEGY, WHATS_NEXT } from "./results-copy";
import ResultsRadar from "./ResultsRadar";
import ResultsSubResult from "./ResultsSubResult";
import SpeedometerOne from "../Utils.jsx/SpeedometerOne";

const DIMENSIONS = [
  "HR Ecosystem Maturity",
  "Skills Maturity",
  "HR Strategy and Planning",
  "Implementation and Change Management",
  "Digital HR Transformation",
];

function ResultsFlat({ diagnostic, selections }) {
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
    <div className="h-screen flex flex-col items-center justify-center">
      {!results && <LoadSpinner text={"...fetching results"} />}
      {ready && (
        <div className="flex flex-col h-screen w-screen gap-8">
          <img className="w-[300px] -mt-10" src={logo} alt="" />
          <h1 className="text-2xl md:pt-10 text-center animate-fade-up font-semibold">WORFORCE AGILITY DIAGNOSTIC</h1>
          <div className="flex items-center px-4 md:px-40  h-1/3">
            Thank you for completing the diagnostic. Your responses provide valuable insights that will help us tailor solutions to advance your HR
            technology capabilities and align them with your strategic goals. Below, you'll find the maturity results for your HR tech ecosystem and a
            detailed analysis for the selected tech stack area(s).{" "}
          </div>
          <div className=" flex justify-center md:px-72">
            <DiamondResults selections={selections} />
          </div>
          <h2 className="text-2xl pt-10 text-center animate-fade-up">{orgResults.title}</h2>

          <div className="flex items-center px-40 h-1/3">{orgResults.result}</div>

          <div className="flex justify-center gap-8 items-center font-semibold text-lg">
            <div className="flex flex-col items-center">
              {/* <GaugeChartOne gaugeVal={current} /> */}
              <div>Current</div>
              <SpeedometerOne gaugeVal={current} />
            </div>
            <div className="flex flex-col items-center">
              <div>
                Desired<span className=" absolute mt-40 ml-40 text-xs">* based on your selections.</span>
              </div>
              <SpeedometerOne gaugeVal={desired} />
            </div>
          </div>
          <Divider text={BUSINESS_STRATEGY.title} />
          <div className="flex items-center px-40 h-1/3">{BUSINESS_STRATEGY.text}</div>
          <ResultsRadar
            data={diagnostic.filter((question) => {
              return question.fieldType == "Slider Field" && DIMENSIONS.includes(question.Type);
            })}
          />
          {dimensionResults && dimensionResults.map((result) => <ResultsSubResult key={`${result.dimension}`} result={result} />)}
          <Divider text={"What's NEXT?"} />
          <div className="px-40">
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
              By partnering with us, your organization will benefit from our deep expertise, strategic insights, and proven methodologies, ensuring
              your HR technology evolves effectively and supports your long-term business success. Email us at info@quantumwork.com{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsFlat;
