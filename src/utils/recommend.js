import { exercises, exerciseMuscles } from "./exercises";

const recommend = (cache) => {
  let scores = {};
  exercises.forEach((x) => {
    scores[x] = 1;
  });

  cache.forEach((recentX) => {
    exerciseMuscles[recentX].major.forEach((recentMa) => {
      exercises.forEach((x) => {
        if (exerciseMuscles[x].major.contains(recentMa))
          scores[x] *= scores[x] * 0.5;
        else if (exerciseMuscles[x].minor.contains(recentMa))
          scores[x] *= scores[x] * 0.75;
      });
    });
    exerciseMuscles[recentX].minor.forEach((recentMi) => {
      exercises.forEach((x) => {
        if (exerciseMuscles[x].major.contains(recentMi))
          scores[x] *= scores[x] * 0.75;
        else if (exerciseMuscles[x].minor.contains(recentMi))
          scores[x] *= scores[x] * 0.875;
      });
    });
  });

  return scores;
};

export default recommend;
