//scaling factor
const factor = {
  Running: 0.0175,
  Biking: 0.0175 * (7 / 8),
  Elliptical: 0.0175 * (5 / 8),
  "Stair climber": 0.0175 * (9 / 8),
  Plank: 0.026,
  "Pull up/chin up": 9.8 * (5 / 12),
  "Sit up/crunch": 9.8 * (5 / 32) * 0.64,
  "Push up": 9.8 * (5 / 12) * 0.64,
  Bench: 9.8 * (5 / 12),
  Squat: 9.8 * (1 / 4),
  Deadlift: 9.8 * (7 / 16),
  "Bicep curl": 9.8 * (5 / 12),
  "Shoulder press": 9.8 * (5 / 12),
  "Shoulder raise": 9.8 * (5 / 12),
  Rows: 9.8 * (5 / 12),
  Lunges: 9.8 * (7 / 16),
  Shrugs: 9.8 * (1 / 16),
  "Hang clean": 9.8 * (3 / 8),
  "Clean and jerk": 9.8 * (19 / 24),
  Snatch: 9.8 * ((5 * Math.sqrt(2)) / 24 + 3 / 8),
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

export {
  runningCal,
  bikingCal,
  ellipticalCal,
  stairClimberCal,
  plankCal,
  pullUpChinUpCal,
  sitUpCrunchCal,
  pushUpCal,
  benchCal,
  squatCal,
  deadliftCal,
  bicepCurlCal,
  shoulderPressCal,
  shoulderRaiseCal,
  rowsCal,
  lungesCal,
  shrugsCal,
  hangCleanCal,
  cleanJerkCal,
  snatchCal,
};
