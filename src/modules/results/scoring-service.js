import { mockResults } from "./mock-results";
import { results } from "./results";

const LEVEL_CUTOFFS = [1.4, 2.4, 3.4, 5];

const COMPONENT_MAP = {
  "Talent Acquisition System": "ta",
  "Extended Workforce": "vms",
  "Talent Management System": "tm",
  "Workforce Planning System": "wp",
  "Learning & Development System": "lms",
  "Performance Management System": "pm",
};

export function scoreDiagnostic(diagnostic) {
  let numericSet = diagnostic.filter((q) => q.fieldType == "Slider Field");
  let type;
  //console.log(diagnostic[-1]);
  const SIZE_RESPONSE = diagnostic.filter((x) => x.Dimension == "Organization Size")[0].selections;
  if (SIZE_RESPONSE.includes("Small")) {
    type = "Small";
  } else if (SIZE_RESPONSE.includes("Medium")) {
    type = "Medium";
  } else {
    type = "Large";
  }
  let currentAvg = Math.round(numericSet.reduce((acc, val) => acc + parseInt(val.Current), 0) / numericSet.length);
  let desiredAvg = Math.round(numericSet.reduce((acc, val) => acc + parseInt(val.Desired), 0) / numericSet.length);
  let tempKey = getLevelKey(currentAvg, desiredAvg);
  console.log({ results });
  let mathRandOne = Math.floor(Math.random() * 10);
  let mathRandTwo = mathRandOne;
  while (mathRandTwo == mathRandOne) {
    mathRandTwo = Math.floor(Math.random() * 10);
  }
  let tempResult = { title: tempKey, result: results[`${type.toLowerCase()}_org`][mathRandOne][tempKey] };
  let tempResult2 = { title: tempKey, result: results[`${type.toLowerCase()}_org`][mathRandTwo][tempKey] };
  // console.log(currentAvg, desiredAvg);
  let result = {
    currentAvg,
    desiredAvg,
    dimensionResults: [],
    orgResults: tempResult,
    orgResults2: tempResult2,
  };
  for (let dimension in COMPONENT_MAP) {
    let temp = getDimensionResult(dimension, numericSet, type);
    if (temp != null && temp != undefined) {
      result.dimensionResults = [...result.dimensionResults, temp];
    }
  }
  return result;
}

function getDimensionResult(dimension, diagnostic, type) {
  //filter for dimension
  console.log({ dimension, diagnostic, type });
  let dimensionResults = diagnostic.filter((question) => {
    return question.Dimension == dimension;
  });
  //   console.log(dimensionResults);
  //if results exist tally score
  let current;
  let desired;
  if (dimensionResults.length == 0) {
    return;
  }

  current = dimensionResults.reduce((acc, val) => parseInt(val.Current) + acc, 0);
  desired = dimensionResults.reduce((acc, val) => parseInt(val.Desired) + acc, 0);

  let desiredLevel = getLevel(desired);
  const currentLevel = getLevel(current);
  if (desiredLevel == "Basic") {
    desiredLevel = "Emerging";
  }

  const resultKey = desiredLevel == currentLevel ? `Staying at ${desiredLevel} Level` : `${currentLevel} to ${desiredLevel}`;

  //   console.log(resultKey);
  //   console.log(results[COMPONENT_MAP[dimension]].filter((r) => r.Type == type)[0][resultKey]);

  let tempResult = {
    title: resultKey,
    result: results[COMPONENT_MAP[dimension]].filter((r) => r.Type == type)[0][resultKey],
    current,
    desired,
    dimension,
    currentLevel,
    desiredLevel,
    intro: results[COMPONENT_MAP[dimension]].filter((r) => r.Type == type)[0]["Intro"],
  };
  //   tempResult.Current = current;
  //   tempResult.Desired = desired;
  //return the result and score
  return tempResult;
}

function getLevel(level) {
  // let level;
  // for (let i = 0; i < 4; i++) {
  //   if (num < LEVEL_CUTOFFS[i]) {
  //     level = i + 1;
  //     break;
  //   }
  // }
  if (level == 1) return "Basic";
  if (level == 2) return "Emerging";
  if (level == 3) return "Mature";
  if (level == 4) return "Leader";
}

function getLevelKey(current, desired) {
  let desiredLevel = getLevel(desired);
  const currentLevel = getLevel(current);
  if (desiredLevel == "Basic") {
    desiredLevel = "Emerging";
  }

  return desiredLevel == currentLevel ? `Staying at ${desiredLevel} Level` : `${currentLevel} to ${desiredLevel}`;
}

//scoreDiagnostic(mockResults);
