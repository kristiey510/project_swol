//scaling factor
const factor = {
  //* 10 fudge factor because human body not 100% efficient
  Running: 0.0175,
  Biking: 0.0175 * (7 / 8),
  Elliptical: 0.0175 * (5 / 8),
  "Stair climber": 0.0175 * (9 / 8),
  Plank: 0.026,
  "Pull up/chin up": 10 * 9.8 * (5 / 12),
  "Sit up/crunch": 10 * 9.8 * (5 / 32) * 0.64,
  "Push up": 10 * 9.8 * (5 / 12) * 0.64,
  Bench: 10 * 9.8 * (5 / 12),
  Squat: 10 * 9.8 * (1 / 4),
  Deadlift: 10 * 9.8 * (7 / 16),
  "Bicep curl": 10 * 9.8 * (5 / 12),
  "Shoulder press": 10 * 9.8 * (5 / 12),
  "Shoulder raise": 10 * 9.8 * (5 / 12),
  Rows: 10 * 9.8 * (5 / 12),
  Lunges: 10 * 9.8 * (7 / 16),
  Shrugs: 10 * 9.8 * (1 / 16),
  "Hang clean": 10 * 9.8 * (3 / 8),
  "Clean and jerk": 10 * 9.8 * (19 / 24),
  Snatch: 10 * 9.8 * ((5 * Math.sqrt(2)) / 24 + 3 / 8),
};

//unit conversions
const weightToKg = (pounds) => {
  return 0.453592 * pounds;
};
const heightToMeters = (feet, inches) => {
  return 0.3048 * feet + 0.0254 * inches;
};
const joulesToKcal = (joules) => {
  return 0.000239006 * joules;
};
const minutesToHours = (minutes) => {
  return minutes / 60;
};
const estimateMET = (scale, quantity) => {
  return 1.52 * (scale / minutesToHours(quantity)) + 0.113;
};

//final functions
const runningCal = (weight, scale, quantity) => {
  return (
    factor["Running"] *
    weightToKg(weight) *
    estimateMET(scale, quantity) *
    quantity
  );
};
const bikingCal = (weight, scale, quantity) => {
  return (
    factor["Biking"] *
    weightToKg(weight) *
    estimateMET(scale, quantity) *
    quantity
  );
};
const ellipticalCal = (weight, scale, quantity) => {
  return (
    factor["Elliptical"] *
    weightToKg(weight) *
    estimateMET(scale, quantity) *
    quantity
  );
};
const stairClimberCal = (weight, scale, quantity) => {
  return (
    factor["Stair climber"] *
    weightToKg(weight) *
    estimateMET(scale, quantity) *
    quantity
  );
};
const plankCal = (weight, quantity) => {
  return factor["Plank"] * weight * quantity;
};
const pullUpChinUpCal = (feet, inches, weight, quantity) => {
  return joulesToKcal(
    factor["Pull up/Chin up"] *
      heightToMeters(feet, inches) *
      weightToKg(weight) *
      quantity
  );
};
const sitUpCrunchCal = (feet, inches, weight, quantity) => {
  return joulesToKcal(
    factor["Sit up/Crunch"] *
      heightToMeters(feet, inches) *
      weightToKg(weight) *
      quantity
  );
};
const pushUpCal = (feet, inches, weight, quantity) => {
  return joulesToKcal(
    factor["Push up"] *
      heightToMeters(feet, inches) *
      weightToKg(weight) *
      quantity
  );
};
const benchCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Bench"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const squatCal = (feet, inches, weight, scale, quantity) => {
  return joulesToKcal(
    factor["Squat"] *
      heightToMeters(feet, inches) *
      weightToKg(weight + scale) *
      quantity
  );
};
const deadliftCal = (feet, inches, weight, scale, quantity) => {
  return joulesToKcal(
    factor["Deadlift"] *
      heightToMeters(feet, inches) *
      weightToKg(weight + scale) *
      quantity
  );
};
const bicepCurlCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Bicep curl"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const shoulderPressCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Shoulder press"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const shoulderRaiseCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Shoulder raise"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const rowsCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Rows"] * heightToMeters(feet, inches) * weightToKg(scale) * quantity
  );
};
const lungesCal = (feet, inches, weight, scale, quantity) => {
  return joulesToKcal(
    factor["Lunges"] *
      heightToMeters(feet, inches) *
      weightToKg(weight + scale) *
      quantity
  );
};
const shrugsCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Shrugs"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const hangCleanCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Hang clean"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const cleanJerkCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Clean and jerk"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};
const snatchCal = (feet, inches, scale, quantity) => {
  return joulesToKcal(
    factor["Snatch"] *
      heightToMeters(feet, inches) *
      weightToKg(scale) *
      quantity
  );
};

const wrapper = (exercise, feet, inches, weight, scale, quantity) => {
  switch (exercise) {
    case "Running":
      return runningCal(weight, scale, quantity);
    case "Biking":
      return bikingCal(weight, scale, quantity);
    case "Elliptical":
      return ellipticalCal(weight, scale, quantity);
    case "Stair climber":
      return stairClimberCal(weight, scale, quantity);
    case "Plank":
      return plankCal(weight, quantity);
    case "Pull up/chin up":
      return pullUpChinUpCal(feet, inches, weight, quantity);
    case "Sit up/crunch":
      return sitUpCrunchCal(feet, inches, weight, quantity);
    case "Push up":
      return pushUpCal(feet, inches, weight, quantity);
    case "Bench":
      return benchCal(feet, inches, scale, quantity);
    case "Squat":
      return squatCal(feet, inches, weight, scale, quantity);
    case "Deadlift":
      return deadliftCal(feet, inches, weight, scale, quantity);
    case "Bicep curl":
      return bicepCurlCal(feet, inches, scale, quantity);
    case "Shoulder press":
      return shoulderPressCal(feet, inches, scale, quantity);
    case "Shoulder raise":
      return shoulderRaiseCal(feet, inches, scale, quantity);
    case "Rows":
      return rowsCal(feet, inches, scale, quantity);
    case "Lunges":
      return lungesCal(feet, inches, weight, scale, quantity);
    case "Shrugs":
      return shrugsCal(feet, inches, scale, quantity);
    case "Hang clean":
      return hangCleanCal(feet, inches, scale, quantity);
    case "Clean and jerk":
      return cleanJerkCal(feet, inches, scale, quantity);
    case "Snatch":
      return snatchCal(feet, inches, scale, quantity);
    default:
      return 0;
  }
};

export { wrapper as calories };
