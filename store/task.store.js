const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../task.js");

const readTasks = () => {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw).tasks;
};

const writeTasks = (tasks) => {
  fs.writeFileSync(dataPath, JSON.stringify({ tasks }, null, 2));
};

module.exports = {
  readTasks,
  writeTasks
};
