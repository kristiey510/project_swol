import { exercises, exerciseMuscles } from "./exercises";

const recommend = (cache) => {
  let dict = {};
  exercises.forEach((x) => {
    dict[x] = 1;
  });

  cache.forEach((recentX) => {
    exerciseMuscles[recentX].major.forEach((recentMa) => {
      exercises.forEach((x) => {
        if (exerciseMuscles[x].major.includes(recentMa))
          dict[x] *= dict[x] * 0.75;
        else if (exerciseMuscles[x].minor.includes(recentMa))
          dict[x] *= dict[x] * 0.875;
      });
    });
    exerciseMuscles[recentX].minor.forEach((recentMi) => {
      exercises.forEach((x) => {
        if (exerciseMuscles[x].major.includes(recentMi))
          dict[x] *= dict[x] * 0.875;
        else if (exerciseMuscles[x].minor.includes(recentMi))
          dict[x] *= dict[x] * 0.925;
      });
    });
  });

  let scores = [];
  Object.keys(dict).forEach((key) => {
    scores.push({ name: key, score: dict[key] });
  });

  scores.sort((a, b) => (a.score > b.score ? -1 : 1));

  return scores;
};

export default recommend;
