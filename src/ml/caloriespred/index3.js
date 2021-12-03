// bias, gender, age, height, info['weight'], duration, heart_rate
import { create, all, config } from "mathjs";
import { db, getDoc, doc } from "../../firebase/firebase.js";
const math = create(all, config);

(async () => {
  let example = "Y5sAEElg7cUOAdrswinf8Swrs443";

  // const userinfo = query(info, where("User_id", "==", example));
  let input = {};

  const docSnap = await getDoc(doc(db, "Profile", example));
  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    const data = docSnap.data();
    console.log("Data:", data);

    //[0,1,21,172,64,60,100,200];
    // gender, age, height, weight, duration, heart_rate
    // let require = ['gender', 'age', 'height', 'weight', 'duration', 'heart_rate']
    if (data["Gender"].toLowerCase() === "male") {
      input["gender"] = 1;
    } else {
      input["gender"] = 0;
    }

    let dob = data["Dob"];
    let age = cal_age(dob);
    input["age"] = age;

    let h_ft = data["Height_Ft"];
    input["feet"] = h_ft;
    let h_in = data["Height_In"];
    input["inch"] = h_in;
    let height = parseInt(30.48 * parseInt(h_ft) + 2.54 * parseInt(h_in));
    input["height"] = height;

    let pounds = data["Weight"];
    input["pounds"] = pounds;
    let weight = parseInt(pounds) * 0.4536;
    input["weight"] = weight;
  } else {
    console.log("No such document!");
  }
  let activity = {};
  const docSnap2 = await getDoc(doc(db, "Exercise", example));
  if (docSnap2.exists()) {
    //console.log("Document data:", docSnap.data());
    const data2 = docSnap2.data();
    activity["duration"] = data2["Duration"];
    activity["heart_rate"] = data2["Heart_rate"];
    activity["reps"] = data2["Reps"];
    activity["min"] = data2["Min"];
  } else {
    console.log("No such document!");
  }
  //
  let info = [];
  for (let key in input) {
    if (key in require) {
      info.push(input[key]);
    }
  }
  for (let key in activity) {
    if ((key === "duration") | (key === "heart_rate")) {
      info.push(input[key]);
    }
  }
  // logistic prediction uses info array

  let testVector1 = [1, 40, 180, 64, 60, 100, 200];
  let coef = [
    -0.000720227952313, -0.00033022261894791085, -0.00116291667261878,
    0.025922387078901987, -0.007142846658622096, 0.0041021005690845755,
    0.026589314877995082, -0.0392155038148618,
  ];
  console.log(predict(coef, testVector1));
})();

function sigmoid(z) {
  let g = math.evaluate(`1 ./ (1 + e.^-z)`, {
    z,
  });

  return g;
}

function predict(theta, x) {
  x.unshift(1);
  let p = sigmoid(
    math.evaluate(`x * theta`, {
      x,
      theta,
    })
  );

  return suggest(p);
}

export function cal_age(sample) {
  let ts = Date.now();
  let today = new Date(ts);

  let month = parseInt(sample.substring(0, 2));
  let day = parseInt(sample.substring(3, 5));
  let year = parseInt(sample.substring(6));

  let age = today.getFullYear() - year;
  let m = today.getMonth() - month;

  if (m < 0 || (m === 0 && today.getDate() < day)) {
    age--;
  }

  return age;
}

export function suggest(p) {
  let sentence = "";
  if (p < 0.25) {
    sentence = "you need to change your exercise custom completely";
  } else if (0.25 <= p && p < 0.75) {
    sentence = "not bad. change a bit of your exercise habits can be better";
  } else {
    sentence = "good work! keep it on";
  }
  return sentence;
}
