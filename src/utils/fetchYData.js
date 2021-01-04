const fetchYData = (data, arrOfWks) => {
  return new Promise((resolve, reject) => {
    let results = [];
    arrOfWks.forEach((wk) => {
      if (wk == 1) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeA));
        results.push({ type: "line", text: "Number of Type A", values: res});
      }
      if (wk == 2) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeB));
        results.push({  type: "line", text: "Number of Type B", values: res });
      }
      if (wk == 3) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeC));
        results.push({  type: "line", text: "Number of Type C",  values: res });
      }
      if (wk == 4) {
        let res = [];
        data.forEach((element) => {
          let sum = [];
          sum.push(
            element.numberOfTypeA,
            element.numberOfTypeB,
            element.numberOfTypeC
          );
          let total = sum.reduce((a, b) => a + b, 0);
          res.push(total);
        });
        results.push({  type: "line", text: "Cumulative of Type A, B & C", values: res });
      }
    });

    resolve(results);
  });
};

export default fetchYData;
