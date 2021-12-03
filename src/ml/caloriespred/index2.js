// import * as tf from '@tensorflow/tfjs';
import csv from "csvtojson";
import { create, all, config } from "mathjs";
import MLR from "ml-regression-multivariate-linear";

// import * as Papa from 'papaparse';
// import * as fs from 'fs';
// import * as tfvis from '@tensorflow/tfjs-vis';
const math = create(all, config);

(async () => {
  const mat = await csv().fromFile("merge2.csv");
  const matrix = [];
  for (let i = 0; i < mat.length; i++) {
    //console.log(key);
    let one = Object.values(mat[i]);
    matrix.push(one);
  }
  let x = math.evaluate("matrix[:, 1:6]", {
    matrix,
  });
  let y = math.evaluate(`matrix[:, 7]`, {
    matrix,
  });

  const mulmodel = new MLR(x, y);

  let testVector1 = [0, 1, 21, 172, 64, 60, 100];
  let simpleped = mulmodel.predict(testVector1);
  console.log(simpleped);
})();
