import { tidy, groupBy, summarize, mean } from "@tidyjs/tidy";

export const ALLCOLOR = "#0E6AAD";
export const FILTER1COLOR = "#FFCB18";
export const FILTER2COLOR = "#0EA8DC";

export function getCategoryBreakout(dataSet) {
  let tempData = tidy(
    dataSet,
    groupBy(
      ["category"],
      [
        summarize({
          value: mean("value"),
          value2: mean("value2"),
          value3: mean("value3"),
        }),
      ]
    )
  );
  tempData = tempData.map((el) => {
    if (el.value != undefined) el.value = Math.floor(el.value * 10) / 10;
    if (el.value2 != undefined) el.value2 = Math.floor(el.value2 * 10) / 10;
    if (el.value3 != undefined) el.value3 = Math.floor(el.value3 * 10) / 10;
    return el;
  });
  return tempData;
}

export function filterByItemAndQuestion(
  itemName,
  itemValue,
  arr,
  question = false
) {
  if (itemValue == false) return arr;
  let tempFiltered = arr.filter((arrItem) => arrItem[itemName] == itemValue);
  if (question) {
    tempFiltered = tempFiltered.filter((el) => el.title == question);
  }
  return tempFiltered.map((el) => {
    return { ...el, audience: itemValue };
  });
}

export function getAverages(arr) {
  // console.log({ arr });
  let tempAvg = tidy(
    arr,
    groupBy(
      ["formRef", "title", "category"],
      [summarize({ value: mean("score") })]
    )
  );
  return tempAvg.map((el) => {
    el.value = Math.floor(el.value * 10) / 10;
    return el;
  });
}

export function getPercentOf(operator, arr) {
  let tempArr = [...arr];

  let percent;
  operator == "gte"
    ? (percent =
        (tempArr.filter((el) => el.score >= 4).length / tempArr.length) * 100)
    : (percent =
        (tempArr.filter((el) => el.score <= 2).length / tempArr.length) * 100);

  // console.log({ percent });
  // console.log({ tempData });
  return Math.floor(percent * 10) / 10;
}
