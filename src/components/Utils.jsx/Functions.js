import { tidy, summarize, mean } from "@tidyjs/tidy";

export const ALLCOLOR = "#0E6AAD";
export const FILTER1COLOR = "#FFCB18";
export const FILTER2COLOR = "#0EA8DC";

export function findAvg(location, type, questionList) {
  let loc = questionList.filter((el) => el.DiamondLoc == location);
  let total = loc.reduce(function (accumulator, answer) {
    return accumulator + (type == "current" ? answer.Current : answer.Desired);
  }, 0);
  return roundToTenth(total / loc.length);
}

export function returnAvg(arr, component) {
  let tempArr = arr.filter((el) => el[component] != 0);
  let datum = tidy(tempArr, summarize({ value: mean(component) }));
  return roundToTenth(datum[0].value);
}

export function roundToTenth(item) {
  if (item) return Number(item.toFixed(1));
}
