import { exercises, exerciseMuscles } from "./exercises";
import { create, all, config } from "mathjs";
const math = create(all, config);

//fit (1), gender (0, 0.5, 1), age, height (cm), weight (kg), calories
//no duration or heartrate
let coef = [
  -0.000720227952313, -0.00033022261894791085, -0.00116291667261878,
  0.025922387078901987, -0.007142846658622096, -0.0392155038148618,
];

function lbsToKg(lbs) {
  return 0.453592 * lbs;
}
function heightToCentimeters(feet, inches) {
  return 30.48 * feet + 2.54 * inches;
}

function sigmoid(z) {
  return math.evaluate(`1 ./ (1 + e.^-z)`, {
    z,
  });
}

function predict(theta, x) {
  return sigmoid(
    math.evaluate(`x * theta`, {
      x,
      theta,
    })
  );
}

function calc_age(bday) {
  let ts = Date.now();
  let today = new Date(ts);

  let month = parseInt(bday.substring(0, 2));
  let day = parseInt(bday.substring(3, 5));
  let year = parseInt(bday.substring(6));

  let age = today.getFullYear() - year;
  let m = today.getMonth() - month;

  if (m < 0 || (m === 0 && today.getDate() < day)) {
    age--;
  }

  return age;
}

const recommend = (user) => {
  let dict = {};
  exercises.forEach((x) => {
    dict[x] = 1;
  });

  user?.cache?.forEach((recentX) => {
    if (recentX.type) {
      //new cache w/ cals
      let intensity = 1;
      if (
        user?.Height_Ft &&
        user?.Height_In &&
        user?.Weight &&
        user?.Dob &&
        recentX.cals
      ) {
        //fit (1), gender (0, 0.5, 1), age, height (cm), weight (kg), calories
        let gender = 0.5;
        if (user?.Gender === "Female") gender = 0;
        else if (user?.Gender === "Male") gender = 1;
        const age = calc_age(user.Dob);
        const height = heightToCentimeters(user.Height_Ft, user.Height_In);
        const weight = lbsToKg(user.Weight);
        intensity -= predict(coef, [
          1,
          gender,
          age,
          height,
          weight,
          recentX.cals,
        ]);
      }

      exerciseMuscles[recentX.type].major.forEach((recentMa) => {
        exercises.forEach((x) => {
          if (exerciseMuscles[x].major.includes(recentMa))
            dict[x] = dict[x] * (1 - 0.33 * intensity);
          else if (exerciseMuscles[x].minor.includes(recentMa))
            dict[x] = dict[x] * (1 - 0.25 * intensity);
        });
      });
      exerciseMuscles[recentX.type].minor.forEach((recentMi) => {
        exercises.forEach((x) => {
          if (exerciseMuscles[x].major.includes(recentMi))
            dict[x] = dict[x] * (1 - 0.25 * intensity);
          else if (exerciseMuscles[x].minor.includes(recentMi))
            dict[x] = dict[x] * (1 - 0.125 * intensity);
        });
      });
    } else {
      //older cache
      exerciseMuscles[recentX].major.forEach((recentMa) => {
        exercises.forEach((x) => {
          if (exerciseMuscles[x].major.includes(recentMa))
            dict[x] = dict[x] * 0.75;
          else if (exerciseMuscles[x].minor.includes(recentMa))
            dict[x] = dict[x] * 0.875;
        });
      });
      exerciseMuscles[recentX].minor.forEach((recentMi) => {
        exercises.forEach((x) => {
          if (exerciseMuscles[x].major.includes(recentMi))
            dict[x] = dict[x] * 0.875;
          else if (exerciseMuscles[x].minor.includes(recentMi))
            dict[x] = dict[x] * 0.925;
        });
      });
    }
  });

  let scores = [];
  Object.keys(dict).forEach((key) => {
    scores.push({ name: key, score: dict[key] });
  });

  scores.sort((a, b) => (a.score > b.score ? -1 : 1));

  return scores;
};

export default recommend;
