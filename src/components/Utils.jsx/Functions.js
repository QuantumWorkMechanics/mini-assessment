import { tidy, groupBy, summarize, mean, distinct, count } from "@tidyjs/tidy";

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

  return Math.floor(percent * 10) / 10;
}

export function runDynamicFilter(filterList, filterSet, rawData) {
  let filteredData = { filterOne: [...rawData], filterTwo: [...rawData] };
  filterList.map((filter) => {
    if (filterSet[filter])
      filteredData.filterOne = filteredData.filterOne.filter(
        (el) => el[filter] == filterSet[filter]
      );
    if (filterSet[filter + "2"])
      filteredData.filterTwo = filteredData.filterTwo.filter(
        (el) => el[filter] == filterSet[filter + "2"]
      );
  });
  return filteredData;
}

export function addFilteredData(keyName, dataToAdd, initialDataSet) {
  let dataArr = [...initialDataSet];

  return dataArr.map((el) => {
    let thisValue = dataToAdd.filter((datum) => {
      return datum.formRef == el.formRef;
    });

    return {
      ...el,
      [keyName]: thisValue[0] != undefined ? thisValue[0].value : null,
    };
  });
}

export function addCountsToFilters(filterSet, dataArr) {
  filterSet.count = tidy(dataArr.filterOne, distinct(["response_id"])).length;
  filterSet.count2 = tidy(dataArr.filterTwo, distinct(["response_id"])).length;
  return filterSet;
}

export function runFrequencyFilters(filterSet, filterList, frequencies) {
  let tempFrequencyData = runDynamicFilter(filterList, filterSet, frequencies);

  let tempFreq = { frequency1: false, frequency2: false };
  if (filterSet.persona || filterSet.role || filterSet.region) {
    tempFreq.frequency1 = tidy(tempFrequencyData.filterOne, count("answer"));
  }
  if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
    tempFreq.frequency2 = tidy(tempFrequencyData.filterTwo, count("answer"));
  }

  return tempFreq;
}

export function addAndAverageFilteredData(
  initialData,
  filterSet,
  filteredData,
  filteredData2
) {
  let tempData = [...initialData];
  if (filterSet.persona || filterSet.role || filterSet.region) {
    tempData = addFilteredData("value2", filteredData, tempData);
  }
  if (filterSet.persona2 || filterSet.role2 || filterSet.region2) {
    tempData = addFilteredData("value3", filteredData2, tempData);
  }
  tempData.map((el) => {
    if (el.value2) {
      el.value2 = Math.floor(el.value2 * 10) / 10;
    }
    if (el.value3) {
      el.value3 = Math.floor(el.value3 * 10) / 10;
    }
    return el;
  });
  return tempData;
}
