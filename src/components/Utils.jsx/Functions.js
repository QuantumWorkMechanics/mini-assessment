import { tidy, groupBy, summarize, mean } from "@tidyjs/tidy";

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
