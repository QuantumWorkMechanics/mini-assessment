import { rawQuestions } from "./questions-raw.js";

//console.log(rawQuestions);
export let scrubbedQuestions = rawQuestions.map((q) => {
  let res1;
  let max = 0;
  let fType;

  if (q["Type of field"].includes("Multi-Select")) {
    fType = "Multi-Select";
    res1 = q.BASIC.split("-");
    res1 = res1.map((x) => x.replace("\n", "").replace("-", "")).filter((x) => x != "");
    max = q["Type of field"].match(/\d+/g);
    if (max != null) {
      max = max[0];
    } else {
      0;
    }
  } else {
    res1 = q.BASIC;
    fType = q["Type of field"];
  }

  return {
    question: q.Question,
    Type: q["Radar Category"],
    Current: 0,
    Desired: 0,
    Number: q.Num,
    Of: rawQuestions.filter((el) => {
      return el["Radar Category"] == q["Radar Category"];
    }).length,
    Dimension: q["Page Title"],
    Response_1: res1,
    Response_2: q.EMERGING,
    Response_3: q.MATURE,
    Response_4: q.LEADER,
    fieldType: fType,
    errorMessage: q["Error message"],
    selections: [],
    max: max,
  };
});

console.log(scrubbedQuestions);
