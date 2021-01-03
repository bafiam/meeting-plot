const fetchXData = (data) => {
  return new Promise((resolve, reject) => {
    let results = []
    data.forEach(element => results.push(element.weekStart));

    resolve(results);
    
  });
};

export default fetchXData