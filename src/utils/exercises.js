const exercises = [
  "Running",
  "Biking",
  "Elliptical",
  "Stair climber",
  "Plank",
  "Pull up/chin up",
  "Sit up/crunch",
  "Push up",
  "Bench",
  "Squat",
  "Deadlift",
  "Bicep curl",
  "Shoulder press",
  "Shoulder raise",
  "Rows",
  "Lunges",
  "Shrugs",
  "Hang clean",
  "Clean and jerk",
  "Snatch",
];

const exerciseMuscles = {
  Running: {
    major: ["calves", "cardio"],
    minor: ["abs", "obliques", "glutes", "hams"],
  },
  Biking: {
    major: ["quads", "glutes", "hams", "cardio"],
    minor: [],
  },
  Elliptical: {
    major: ["quads", "glutes", "hams", "abs", "cardio"],
    minor: [],
  },
  "Stair climber": {
    major: ["quads", "cardio"],
    minor: ["glutes", "hams"],
  },
  Plank: {
    major: ["abs", "obliques"],
    minor: ["delts"],
  },
  "Pull up/chin up": {
    major: ["bis", "lats"],
    minor: ["grip"],
  },
  "Sit up/crunch": {
    major: ["abs"],
    minor: ["obliques"],
  },
  "Push up": {
    major: ["pecs", "tris"],
    minor: ["abs"],
  },
  Bench: {
    major: ["pecs", "tris"],
    minor: [],
  },
  Squat: {
    major: ["quads", "glutes"],
    minor: ["abs", "hams"],
  },
  Deadlift: {
    major: ["quads", "glutes"],
    minor: ["grip"],
  },
  "Bicep curl": {
    major: ["bis"],
    minor: [],
  },
  "Shoulder press": {
    major: ["delts"],
    minor: ["tris"],
  },
  "Shoulder raise": {
    major: ["delts"],
    minor: [],
  },
  Rows: {
    major: ["lats"],
    minor: ["traps"],
  },
  Lunges: {
    major: ["quads", "hams", "glutes"],
    minor: [],
  },
  Shrugs: {
    major: ["traps"],
    minor: ["grip"],
  },
  "Hang clean": {
    major: ["calves", "traps", "quads", "glutes", "grip"],
    minor: [],
  },
  "Clean and jerk": {
    major: ["calves", "traps", "quads", "glutes", "grip"],
    minor: [],
  },
  Snatch: {
    major: ["calves", "traps", "quads", "glutes", "grip"],
    minor: [],
  },
};

const exerciseUnits = {
  Running: {
    scale: "miles",
    quantity: "minutes",
  },
  Biking: {
    scale: "miles",
    quantity: "minutes",
  },
  Elliptical: {
    scale: "miles",
    quantity: "minutes",
  },
  "Stair climber": {
    scale: "miles",
    quantity: "minutes",
  },
  Plank: {
    scale: "",
    quantity: "minutes",
  },
  "Pull up/chin up": {
    scale: "",
    quantity: "reps",
  },
  "Sit up/crunch": {
    scale: "",
    quantity: "reps",
  },
  "Push up": {
    scale: "",
    quantity: "reps",
  },
  Bench: {
    scale: "pounds",
    quantity: "reps",
  },
  Squat: {
    scale: "pounds",
    quantity: "reps",
  },
  Deadlift: {
    scale: "pounds",
    quantity: "reps",
  },
  "Bicep curl": {
    scale: "pounds (total)",
    quantity: "reps",
  },
  "Shoulder press": {
    scale: "pounds (total)",
    quantity: "reps",
  },
  "Shoulder raise": {
    scale: "pounds (total)",
    quantity: "reps",
  },
  Rows: {
    scale: "pounds (total)",
    quantity: "reps",
  },
  Lunges: {
    scale: "pounds",
    quantity: "reps",
  },
  Shrugs: {
    scale: "pounds (total)",
    quantity: "reps",
  },
  "Hang clean": {
    scale: "pounds",
    quantity: "reps",
  },
  "Clean and jerk": {
    scale: "pounds",
    quantity: "reps",
  },
  Snatch: {
    scale: "pounds",
    quantity: "reps",
  },
};

export { exercises, exerciseMuscles, exerciseUnits };
