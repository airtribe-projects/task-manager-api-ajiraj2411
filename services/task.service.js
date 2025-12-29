const Task = require("../models/task.model");

const isValid = (task) =>
  typeof task.title === "string" &&
  typeof task.description === "string" &&
  typeof task.completed === "boolean";

const getNextId = async () => {
  const last = await Task.findOne().sort({ id: -1 });
  return last ? last.id + 1 : 1;
};

exports.createTask = async (task) => {
  if (!isValid(task)) throw new Error("INVALID");
  const id = await getNextId();
  return Task.create({ id, ...task });
};

exports.getAllTasks = async () =>
  Task.find({}, { _id: 0, __v: 0 });

exports.getTaskById = async (id) =>
  Task.findOne({ id: Number(id) }, { _id: 0, __v: 0 });

exports.updateTask = async (id, task) => {
  if (!isValid(task)) throw new Error("INVALID");
  return Task.findOneAndUpdate(
    { id: Number(id) },
    task,
    { new: true, projection: { _id: 0, __v: 0 } }
  );
};

exports.deleteTask = async (id) => {
  const res = await Task.findOneAndDelete({ id: Number(id) });
  return !!res;
};
