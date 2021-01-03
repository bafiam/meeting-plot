const fetchYData = (data, arrOfWks) => {
  return new Promise((resolve, reject) => {
    let results = [];
    arrOfWks.forEach((wk) => {
      if (wk == 1) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeA));
        results.push({ values: res });
      }
      if (wk == 2) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeB));
        results.push({ values: res });
      }
      if (wk == 3) {
        let res = [];
        data.forEach((element) => res.push(element.numberOfTypeC));
        results.push({ values: res });
      }
    });

    resolve(results);
  });
};

export default fetchYData;
