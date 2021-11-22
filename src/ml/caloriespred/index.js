
// "type": "module",
/*
const csv = require('csvtojson');
const math = require("mathjs");
const {collection} = require('firebase/firestore/collection');
*/
import csv from 'csvtojson';
import {create, all, config} from 'mathjs';
import {
    collection,
    db,
    auth,
    getDoc,
    doc
} from "../../firebase/firebase.js";
import { getAuth } from "firebase/auth";

const math = create(all, config);

(async () => {

    const auth = getAuth();

    const mat = await csv().fromFile('merge2.csv');
    //console.log(mat);
    const matrix = []
    for (let i = 0; i <mat.length; i++){
        //console.log(key);
        let one = Object.values(mat[i]);
        matrix.push(one);
    }
    let coef = init(matrix);
    console.log(coef);
    let testVector1 = [0,1,21,172,64,60,100,200];
    let testVector2 = [0,1,91,172,64,60,100,2000];



    console.log('1: suitable exercise    0: not suitable so need to adjust your exercise next time ');

    console.log("21 year boy doing exercise 1 hour with 200 calories")
    console.log(predict(coef,testVector1))
    console.log("91 year old man doing exercise 1 hour with 2000 calories")
    let result = math.round(predict(coef,testVector2),-1);

})();



function init(matrix){
    console.log('train and test data');
    let x = math.evaluate('matrix[:, 1:7]', {
        matrix,
    });

    let y = math.evaluate(`matrix[:, 8]`, {
        matrix,
    });
    //console.log(y)
    let m = y.length;
    let n = x[0].length

    x = math.concat(math.ones([m, 1]).valueOf(), x);
    //console.log(x)
    // cost function
    let theta = Array(n + 1).fill().map(() => [0]);

    const { cost: trainedThetaCost } = costFunction(theta, x, y)

    console.log('Part 2: Gradient Descent ...\n');
    const ALPHA = 0.005;
    const iter = 100;

    theta = [[-25], [0], [0], [0], [0], [0], [0],  [0]]; //initial weight
    theta = gradientDescent(x, y, theta, ALPHA, iter);

    console.log('theta: ', theta);
    console.log('\n');
    console.log('cost: ', trainedThetaCost);
    console.log('\n');

    return theta;
}

function sigmoid(z) {
    let g = math.evaluate(`1 ./ (1 + e.^-z)`, {
        z,
    });

    return g;
}

function costFunction(t,x,y){
    const m = y.length;

    let h = math.evaluate(`x * t`, {
        x,
        t,
    });

    const cost = math.evaluate(`(1 / m) * (-y' * log(h) - (1 - y)' * log(1 - h))`, {
        h,
        y,
        m,
    });
    const grad = math.evaluate(`(1 / m) * (h - y)' * x`, {
        h,
        y,
        m,
        x,
    });

    return { cost, grad };
}

function gradientDescent(x, y, theta, a, iter) {
    const m = y.length;

    for (let i = 0; i < iter; i++) {
        let h = sigmoid(math.evaluate(`x * theta`, {
            x,
            theta,
        }));

        theta = math.evaluate(`theta - a / m * ((h - y)' * x)'`, {
            theta,
            a,
            m,
            x,
            y,
            h,
        });
    }

    return theta;
}

function predict(theta, x) {
    let without_bias = x.slice(1,8);
    let the = theta.slice(1,8);
    let p = sigmoid(math.evaluate(`without_bias * the`, {
        without_bias,
        the,
    }));

    return p;
}