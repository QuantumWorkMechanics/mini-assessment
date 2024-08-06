import { useState } from "react";
import { categoriesList } from "../../../modules/question-bank-v3-scrubbed";

function DiamondNew({ handleReady, selections, setSelections, setReady }) {
  //const [ready, setReady] = useState(false);
  const [selectedCircles, setSelectedCircles] = useState({
    path27: false,
    path28: false,
    path29: false,
    path30: false,
    path76: false,
    path77: false,
    path31: false,
  });

  const COMPONENT_MAP = {
    path27: "Talent Acquisition System",
    path28: "Talent Management System",
    path29: "Learning and Development System",
    path30: "Extended Workforce",
    path31: "Human Resources Information System & Enterprise Platforms",
    path77: "Performance Management System",
    path76: "Workforce Planning System",
  };

  function isReady(temp) {
    // const temp = {...selections}
    let test = false;
    for (const key in temp) {
      if (temp[key]) {
        test = true;
      }
    }
    return test;
  }

  function handleSelected(tempCircles) {
    // const tempCircles = {...selectedCircles}
    let tempSelections = { ...selections };
    // Get Diamond Loc from categories
    for (const key in tempCircles) {
      tempSelections[categoriesList.filter((x) => x.DiamondPath == key)[0].DiamondLoc] = tempCircles[key];
    }
    setSelections(tempSelections);
    console.log(tempSelections);
  }

  function handleDiamondClick(e) {
    let temp = { ...selectedCircles };
    if (e.target.id in temp) {
      temp[e.target.id] = !temp[e.target.id];
      setSelectedCircles(temp);
      handleSelected(temp);
      setReady(isReady(temp));
    }

    //  console.log(selectedCircles);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      style={{
        enableBackground: "new 0 0 576 396.7",
      }}
      onClick={(e) => handleDiamondClick(e)}
      onFocus={(e) => console.log(e.target.id)}
      viewBox="0 0 576 396.7"
    >
      <style id="style1" type="text/css">
        {
          ".st0{fill:none;stroke:#bde3f9;stroke-width:1.26}.st1{fill:#0da6d9}.st2{fill:#79d0e6}.st3{fill:#4fbfe5}.st4{fill:#e0ebf0}.st5{fill:#0e6aad}.st7{fill:#badef5}.st9{fill:#d1e8f5}.st10{fill:#fdb517}.st11{fill:none;stroke:#fdb517;stroke-width:1.26}.st12{fill:#231f20}.st13{}.st14{font-size:9px}.st15{fill:#0ea8dc}.st16{}.st17{font-size:13px}.st20{}.st21{font-size:10px}.st23{fill:#fcb517}.st24{fill:none}.st25{fill:#ffcb18}"
        }
      </style>
      <text id="text1" className="st12 st13 st14" transform="translate(189.28 -12.323)" />
      <g id="g78">
        <path id="line1" d="M95.6 143.2H76.8" className="st0" />
        <path id="line2" d="M77.1 130.4V156" className="st0" />
        <path id="line3" d="m153 72.9-13.8-12.8" className="st0" />
        <path id="line4" d="M139.5 47.3v25.6" className="st0" />
        <path id="line5" d="m389.3 72.9 13.8-12.8" className="st0" />
        <path id="line6" d="M402.8 47.3v25.6" className="st0" />
        <path id="line7" d="M139.7 194.3v25.6" className="st0" />
        <path id="line8" d="M403.7 194.3v25.6" className="st0" />
        <path id="line9" d="M468.3 143.1h-18.8" className="st0" />
        <path id="polygon9" d="M271.9 320.6V171.5h-99.2z" className="st1" />
        <path id="polygon10" d="M271.9 98.6h-84.7l84.7 72.9z" className="st2" />
        <path id="polygon11" d="m172.7 171.5 14.5-72.9 84.7 72.9z" className="st3" />
        <path id="polygon12" d="M271.9 98.6 245 85.4l-57.8 13.2z" className="st4" />
        <path id="polygon13" d="M271.9 320.6 96.3 141.7l76.4 29.8z" className="st3" />
        <path id="polygon14" d="m187.2 98.6-90.9 43.1 76.4 29.8z" className="st2" />
        <path id="polygon15" d="m96.3 141.7 64-66.3 26.9 23.2z" className="st3" />
        <path id="polygon16" d="m245 85.4-84.7-10 26.9 23.2z" className="st4" />
        <path id="polygon17" d="m160.3 75.4 111.6-9.9L245 85.4z" className="st4" />
        <path id="polygon18" d="M271.9 320.6V171.5H371z" className="st5" />
        <path
          id="polygon19"
          d="M271.9 98.6h84.6l-84.6 72.9z"
          style={{
            fill: "#3ec1e4",
          }}
        />
        <path id="polygon20" d="m371 171.5-14.5-72.9-84.6 72.9z" className="st1" />
        <path id="polygon21" d="m271.9 98.6 26.8-13.2 57.8 13.2z" className="st7" />
        <path
          id="polygon22"
          d="m271.9 320.6 175.5-178.9-76.4 29.8z"
          style={{
            fill: "#142f55",
          }}
        />
        <path id="polygon23" d="m356.5 98.6 90.9 43.1-76.4 29.8z" className="st5" />
        <path id="polygon24" d="m447.4 141.7-64-66.3-26.9 23.2z" className="st1" />
        <path id="polygon25" d="m298.7 85.4 84.7-10-26.9 23.2z" className="st9" />
        <path id="polygon26" d="m383.4 75.4-111.5-9.9 26.8 19.9z" className="st7" />
        <path id="polygon27" d="m245 85.4 26.9-19.9 26.8 19.9-26.8 13.2z" className="st9" />
        <g id="g31">
          <path
            className={
              " cursor-pointer " +
              ((!selectedCircles.path27 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path27 && "fill-[#FDB517] ") || "")
            }
            id="path27"
            d="M160.1 85.9c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c0 4.8 3.9 8.7 8.7 8.7"
            // className="st10"
          />
          <circle tabIndex={0} id="circle27" cx={160.1} cy={77.2} r={11} className="st11" />
          <path
            id="path28"
            d="M383.9 85.9c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c.1 4.8 4 8.7 8.7 8.7"
            className={
              " cursor-pointer " +
              ((!selectedCircles.path28 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path28 && "fill-[#FDB517] ") || "")
            }
          />
          <circle tabIndex={0} id="circle28" cx={383.9} cy={77.2} r={11} className="st11" />
          <path
            id="path29"
            d="M445.6 151.8c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c0 4.8 3.9 8.7 8.7 8.7"
            className={
              " cursor-pointer " +
              ((!selectedCircles.path29 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path29 && "fill-[#FDB517] ") || "")
            }
          />
          <circle tabIndex={0} id="circle29" cx={445.6} cy={143.1} r={11} className="st11" />
          <g id="g30">
            <path
              id="path30"
              d="M96.3 151.8c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c0 4.8 3.9 8.7 8.7 8.7"
              className={
                " cursor-pointer " +
                ((!selectedCircles.path30 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
                ((selectedCircles.path30 && "fill-[#FDB517] ") || "")
              }
            />
            <circle tabIndex={0} id="circle30" cx={96.3} cy={143.1} r={11} className="st11" />
          </g>
          <path
            id="path31"
            d="M273.2 329.3c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c0 4.8 3.9 8.7 8.7 8.7"
            className={
              " cursor-pointer " +
              ((!selectedCircles.path31 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path31 && "fill-[#FDB517] ") || "")
            }
          />
          <circle tabIndex={0} id="circle31" cx={273.2} cy={320.6} r={11} className="st11" />
        </g>
        <text id="text31" className="st12 st13 st14" transform="translate(164.725 36.547)" />
        <text id="text33" transform="translate(223.087 353.33)">
          <tspan id="tspan31" x={0} y={0} className="st15 st16 st17">
            {" Human Resources  "}
          </tspan>
          <tspan id="tspan32" x={-39.5} y={13.6} className="st15 st16 st17">
            {"Information System & Enterprise  "}
          </tspan>
          <tspan id="tspan33" x={26.5} y={27.2} className="st15 st16 st17">
            {"Platforms"}
          </tspan>
        </text>
        <text id="text35" transform="translate(14.824 139.446)">
          <tspan id="tspan34" x={0} y={0} className="st15 st16 st17">
            {"Extended  "}
          </tspan>
          <tspan id="tspan35" x={-5} y={13.6} className="st15 st16 st17">
            {"Workforce"}
          </tspan>
        </text>
        <text id="text37" transform="translate(21.971 204.219)">
          <tspan id="tspan36" x={-7} y={0} className="st15 st16 st17">
            {"Workforce Strategy,"}
          </tspan>
          <tspan id="tspan37" x={-20} y={13.6} className="st15 st16 st17">
            {"Insights and Planning"}
          </tspan>
        </text>
        <text id="text39" transform="translate(408.015 204.218)">
          <tspan id="tspan38" x={2} y={0} className="st15 st16 st17">
            {"Performance "}
          </tspan>
          <tspan id="tspan39" x={2} y={13.6} className="st15 st16 st17">
            {"Management"}
          </tspan>
        </text>
        <text id="text41" transform="translate(100.492 57.404)">
          <tspan id="tspan40" x={-4} y={0} className="st15 st16 st17">
            {"Talent "}
          </tspan>
          <tspan id="tspan41" x={-33} y={13.6} className="st15 st16 st17">
            {"Acquisition"}
          </tspan>
        </text>
        <text id="text43" transform="translate(408.156 57.404)">
          <tspan id="tspan42" x={0} y={0} className="st15 st16 st17">
            {"Talent "}
          </tspan>
          <tspan id="tspan43" x={0} y={13.6} className="st15 st16 st17">
            {"Management"}
          </tspan>
        </text>
        <text id="text45" transform="translate(474.233 139.446)">
          <tspan id="tspan44" x={0} y={0} className="st15 st16 st17">
            {"L&D and"}
          </tspan>
          <tspan id="tspan45" x={0} y={13.6} className="st15 st16 st17">
            {"Reskilling"}
          </tspan>
        </text>
        <g id="g47">
          <g
            id="g46"
            style={{
              opacity: 0.5,
            }}
          >
            <g id="g45">
              <defs id="defs45">
                <path id="SVGID_1_" d="M213.3 121.7h115.3V227H213.3z" />
              </defs>
              <clipPath id="SVGID_00000122699596049723729890000006212783203728288166_">
                <use
                  xlinkHref="#SVGID_1_"
                  id="use45"
                  style={{
                    overflow: "visible",
                  }}
                />
              </clipPath>
              <path
                id="path45"
                d="M271 128.7c-26.9 0-48.6 21.8-48.6 48.6 0 26.9 21.8 48.6 48.6 48.6s48.6-21.8 48.6-48.6-21.8-48.6-48.6-48.6"
                clipPath="url(#SVGID_00000122699596049723729890000006212783203728288166_)"
                style={{
                  clipPath: "url(#SVGID_00000122699596049723729890000006212783203728288166_)",
                  fill: "#fff",
                }}
              />
            </g>
          </g>
        </g>
        <g id="g64">
          <text id="text50" fontWeight={"bold"} transform="translate(240.495 158.266)">
            <tspan id="tspan47" x={0} y={0} className="st12 st20 st21">
              {"W"}
            </tspan>
            <tspan id="tspan48" x={9.6} y={0} className="st12 st20 st21">
              {"ORK"}
            </tspan>
            <tspan id="tspan49" x={29.8} y={0} className="st12 st20 st21">
              {"F"}
            </tspan>
            <tspan id="tspan50" x={34.9} y={0} className="st12 st20 st21">
              {"ORCE "}
            </tspan>
          </text>
          <text id="text53" fontWeight={"bold"} transform="translate(253.91 170.266)">
            <tspan id="tspan51" x={0} y={0} className="st12 st20 st21">
              {"A"}
            </tspan>
            <tspan id="tspan52" x={6.6} y={0} className="st12 st20 st21">
              {"G"}
            </tspan>
            <tspan id="tspan53" x={13.9} y={0} className="st12 st20 st21">
              {"ILITY"}
            </tspan>
          </text>
          <text fontWeight={"300"} id="text56" transform="translate(249.995 183.9)">
            <tspan id="tspan54" x={0} y={0} className="st12 st13 st14">
              {"3R \u2013 "}
            </tspan>
            <tspan id="tspan55" x={17.2} y={0} className="st12 st13 st14">
              {"R"}
            </tspan>
            <tspan id="tspan56" x={21.6} y={0} className="st12 st13 st14">
              {"eskill, "}
            </tspan>
          </text>
          <text fontWeight={"300"} id="text62" transform="translate(252.757 194.7)">
            <tspan id="tspan57" x={0} y={0} className="st12 st13 st14">
              {"R"}
            </tspan>
            <tspan id="tspan58" x={4.4} y={0} className="st12 st13 st14">
              {"e"}
            </tspan>
            <tspan id="tspan59" x={9} y={0} className="st12 st13 st14">
              {"depl"}
            </tspan>
            <tspan id="tspan60" x={25.9} y={0} className="st12 st13 st14">
              {"o"}
            </tspan>
            <tspan id="tspan61" x={30.7} y={0} className="st12 st13 st14">
              {"y"}
            </tspan>
            <tspan id="tspan62" x={33.9} y={0} className="st12 st13 st14">
              {", "}
            </tspan>
          </text>
          <text fontWeight={"300"} id="text64" transform="translate(253 205.5)">
            <tspan id="tspan63" x={0} y={0} className="st12 st13 st14">
              {"R"}
            </tspan>
            <tspan id="tspan64" x={4.4} y={0} className="st12 st13 st14">
              {"ebalance"}
            </tspan>
          </text>
        </g>
        <text id="text65" className="st12 st13 st14" transform="translate(291.215 183.9)" />
        <text id="text66" className="st12 st13 st14" transform="translate(288.452 194.7)" />
        <g id="g68">
          <path
            id="path67"
            d="M318.2 178.8c-.3 12.2-5.1 23.7-13.8 32.4-8.9 8.9-20.8 13.9-33.5 13.9s-24.5-4.9-33.5-13.9c-8.7-8.7-13.6-20.2-13.8-32.4h-8.9v1c1.1 30.1 25.9 54.2 56.2 54.2 30.7 0 55.6-24.7 56.2-55.2h-8.9z"
            className="st23"
          />
          <path
            id="path68"
            d="M223.7 176.8c.2-12.3 5.1-23.8 13.8-32.5 8.9-8.9 20.8-13.9 33.5-13.9 12.6 0 24.5 4.9 33.5 13.9 8.7 8.7 13.6 20.2 13.8 32.5h8.9c-.5-30.6-25.5-55.3-56.2-55.3-30.3 0-55.1 24.1-56.2 54.2v1h8.9z"
            className="st23"
          />
        </g>
        <path
          id="SVGID_x5F_00000042705226417958625100000008573359142733021076_x5F_"
          d="M222.7 176.9c0-26.9 21.8-48.6 48.6-48.6S320 150 320 176.9"
          className="st24"
        />
        <text fontWeight={"600"} id="text68">
          <textPath xlinkHref="#SVGID_x5F_00000042705226417958625100000008573359142733021076_x5F_" id="textPath68" startOffset="29%">
            <tspan
              id="tspan68"
              className="st16"
              style={{
                fontSize: 7,
              }}
            >
              {"SKILLS FIRST/SBO"}
            </tspan>
          </textPath>
        </text>
        <path
          id="SVGID_x5F_00000173883535880519722240000007737202615387133111_x5F_"
          d="M222.7 183.5c0 26.9 21.8 48.6 48.6 48.6s48.6-21.8 48.6-48.6"
          className="st24"
        />
        <text
          fontWeight={"600"}
          id="text69"
          style={{
            display: "inline",
          }}
        >
          <textPath xlinkHref="#SVGID_x5F_00000173883535880519722240000007737202615387133111_x5F_" id="textPath69" startOffset="35%">
            <tspan
              id="tspan69"
              className="st16 font-noto"
              style={{
                fontSize: 7,
              }}
            >
              {"WORK DESIGN"}
            </tspan>
          </textPath>
        </text>
        <g id="g72">
          <path
            id="path69"
            d="M330.6 178.8c-.3 15.5-6.4 30.1-17.4 41.1-11 11-25.6 17.2-41.2 17.4v9.4c37.3-.5 67.5-30.7 68-68h-9.4z"
            className="st25"
          />
          <path
            id="path70"
            d="M211.4 176.8c.2-15.6 6.4-30.2 17.4-41.2 11-11 25.6-17.2 41.2-17.4v-9.4c-36.3.5-65.9 29.1-67.9 65h-.1v3h9.4z"
            className="st25"
          />
          <path id="path71" d="M272 118.2c15.6.3 30.1 6.4 41.2 17.4 11 11 17.2 25.6 17.4 41.2h9.4c-.5-37.3-30.7-67.6-68-68.1v9.5z" className="st25" />
          <path
            id="path72"
            d="M270 237.4c-15.5-.3-30.1-6.4-41.2-17.4-11-11-17.2-25.6-17.4-41.1h-9.5v3h.1c2.1 35.9 31.7 64.5 67.9 65v-9.5z"
            className="st25"
          />
        </g>
        <path
          id="SVGID_x5F_00000051346043805282165260000010752419696733988529_x5F_"
          d="M205.4 183c.8 16.3 7.8 30.9 18.6 41.8 10.6 10.6 24.9 17.5 40.8 18.5"
          className="st24"
        />
        <text fontWeight={"500"} id="text72">
          <textPath xlinkHref="#SVGID_x5F_00000051346043805282165260000010752419696733988529_x5F_" id="textPath72" startOffset="36%">
            <tspan
              id="tspan72"
              style={{
                fontSize: 6,
                //   fontFamily: "Gibson-Regular",
              }}
            >
              {"PEOPLE"}
            </tspan>
          </textPath>
        </text>
        <path
          id="SVGID_x5F_00000090277203845428429050000012430918160311737253_x5F_"
          d="M275.5 243.3c16.6-.6 31.5-7.6 42.5-18.6 10.9-10.9 17.8-25.7 18.6-42.1"
          className="st24"
        />
        <text
          fontWeight={"500"}
          id="text73"
          x={68}
          y={24}
          style={{
            lineHeight: 0,
          }}
        >
          <textPath xlinkHref="#SVGID_x5F_00000090277203845428429050000012430918160311737253_x5F_" id="textPath73" startOffset="-35%">
            <tspan
              id="tspan73"
              style={{
                fontSize: 6,
                lineHeight: 0,
                //   fontFamily: "Gibson-Regular",
              }}
            >
              {"CULTURE"}
            </tspan>
          </textPath>
        </text>
        <path
          id="SVGID_x5F_00000109725063759176023730000007989755131052410525_x5F_"
          d="M272.5 115.2c16.6.6 31.5 7.6 42.5 18.6 10.9 10.9 17.9 25.8 18.6 42.4"
          className="st24"
        />
        <text fontWeight={"500"} id="text74" x={27} y={-12}>
          <textPath xlinkHref="#SVGID_x5F_00000109725063759176023730000007989755131052410525_x5F_" id="textPath74" startOffset="7.171%">
            <tspan
              id="tspan74"
              style={{
                fontSize: 6,
                //   fontFamily: "Gibson-Regular",
              }}
            >
              {"LEADERSHIP"}
            </tspan>
          </textPath>
        </text>
        <path
          id="SVGID_x5F_00000089572921487067265740000007718148386580856501_x5F_"
          d="M208.4 175.4c.8-16.2 7.8-30.9 18.5-41.6 10.7-10.7 25.2-17.6 41.3-18.5"
          className="st24"
        />
        <text fontWeight={"500"} id="text75" x={42.945} y={-145.686}>
          <textPath xlinkHref="#SVGID_x5F_00000089572921487067265740000007718148386580856501_x5F_" id="textPath75" startOffset="-13%">
            <tspan
              id="tspan75"
              style={{
                fontSize: 6,
                //   fontFamily: "Gibson-Regular",
              }}
            >
              {"STRATEGY"}
            </tspan>
          </textPath>
        </text>
        <path id="line75" d="M468.3 130.6v25.6" className="st0" />
        <path id="line76" d="m174.2 173.1-34.8 27.1" className="st0" />
        <g id="g76">
          <path
            id="path76"
            d="M174.8 181.4c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7c0 4.8 3.9 8.7 8.7 8.7"
            className={
              " cursor-pointer " +
              ((!selectedCircles.path76 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path76 && "fill-[#FDB517] ") || "")
            }
          />
          <circle tabIndex={0} id="circle76" cx={174.8} cy={172.7} r={11} className="st11" />
        </g>
        <path id="line77" d="m369.2 173.1 34.7 27.1" className="st0" />
        <g id="g77">
          <path
            id="path77"
            d="M368.9 181.4c4.8 0 8.7-3.9 8.7-8.7 0-4.8-3.9-8.7-8.7-8.7-4.8 0-8.7 3.9-8.7 8.7 0 4.8 3.9 8.7 8.7 8.7"
            className={
              " cursor-pointer " +
              ((!selectedCircles.path77 && "fill-[#cccccc] hover:fill-[#FFCB18] ") || "") +
              ((selectedCircles.path77 && "fill-[#FDB517] ") || "")
            }
          />
          <circle tabIndex={0} id="circle77" cx={368.9} cy={172.7} r={11} className="st11" />
        </g>
        <text
          xmlSpace="preserve"
          id="text78"
          x={219}
          y={124}
          style={{
            fill: "#333",
          }}
        />
        <text
          xmlSpace="preserve"
          id="text79"
          x={226}
          y={128}
          style={{
            fill: "#333",
          }}
        />
      </g>
    </svg>
  );
}
export default DiamondNew;
