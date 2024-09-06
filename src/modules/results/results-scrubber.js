import tm from "./tm.json" assert { type: "json" };
import ta from "./ta.json" assert { type: "json" };
import wp from "./wp.json" assert { type: "json" };
import vms from "./vms.json" assert { type: "json" };
import pm from "./pm.json" assert { type: "json" };
import lms from "./lms.json" assert { type: "json" };
import small from "./small_ent.json" assert { type: "json" };
import medium from "./medium_ent.json" assert { type: "json" };
import large from "./large_ent.json" assert { type: "json" };

// console.log(tm);
export function parseResults() {
  //   let ta = await fetch("ta.json").then((res) => res.json());
  //   let tm = await fetch("./ta.json").then((res) => res.json());
  //   let wp = await fetch("./wp.json").then((res) => res.json());
  //   let vms = await fetch("./vms.json").then((res) => res.json());
  //   let pm = await fetch("./pm.json").then((res) => res.json());
  //   let lms = await fetch("./lms.json").then((res) => res.json());
  //   let small = await fetch("./small_ent.json").then((res) => res.json());
  //   let medium = await fetch("./medium_ent.json").then((res) => res.json());
  //   let large = await fetch("./large_ent.json").then((res) => res.json());

  let results = {
    ta,
    tm,
    wp,
    vms,
    pm,
    lms,
  };
  let tempResults = {};
  for (const key in results) {
    console.log(results[key]);

    tempResults = results[key].map((res) => {
      // console.log(res);
      let response = { ...res };
      for (let key2 in res) {
        if (key2 != "Type" && key2 != "Intro") {
          // console.log(key2);
          // console.log(res[key2]);
          // console.log(res[key2].split("\n\n"));
          let temp = res[key2].split("\n\n");
          let recs = temp[0].split("\n").slice(1);
          let ben = temp[1].split("\n").slice(1);
          // console.log(temp);
          // console.log(recs);
          // console.log(ben);
          response[key2] = { Recommendations: recs, Benefits: ben };
          console.log({ key2 });
          console.log(res[key2]);
          res[key2];
          // res[key2] = { Recommendations: temp[0].split("\n").slice(1) };
          // console.log(res);
          // let response[key]
          // let temp = res[key2].split("\n\n");
          // console.log(temp);
          // // temp.split("\n\n");
          // res[key2] = { Recommendations: temp[0].split("\n").slice(1), Benefits: temp[1].split("\n").slice(1) };
        }
      }
      return response;
    });

    results[key] = tempResults;
  }
  console.log({ tempResults });
  results.small_org = small;
  results.medium_org = medium;
  results.large_org = large;
  // console.log(results.ta);
  console.log(results);
}

parseResults();
