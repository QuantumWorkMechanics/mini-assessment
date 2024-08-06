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
  for (const key in results) {
    results[key] = results[key].map((res) => {
      for (let key in res) {
        if (key != "Type") {
          let temp = res[key].split("\n\n");

          res[key] = { Recommendations: temp[0].split("\n").slice(1), Benefits: temp[1].split("\n").slice(1) };
        }
      }
      return res;
    });
  }
  results.small_org = small;
  results.medium_org = medium;
  results.large_org = large;
  // console.log(results.ta);
  console.log(results);
}

parseResults();
