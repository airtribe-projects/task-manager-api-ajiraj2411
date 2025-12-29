const Task = require("../models/task.model");
const validateTask = require("../utils/validateTask");

const getNextId = async () => {
  const last = await Task.findOne().sort({ id: -1 });
  return last ? last.id + 1 : 1;
};

exports.createTask = async (data) => {
  if (!validateTask(data)) throw new Error("INVALID_INPUT");

  const id = await getNextId();
  return Task.create({ id, ...data });
};

exports.getAllTasks = async (query) => {
  const filter = {};
  const sort = {};

  // Filter by completion status
  if (query.completed !== undefined) {
    filter.completed = query.completed === "true";
  }

  // Sorting by creation date
  if (query.sort === "createdAt") {
    sort.createdAt = query.order === "asc" ? 1 : -1;
  }

  return Task.find(filter, { _id: 0, __v: 0 }).sort(sort);
};

exports.getTaskById = async (id) => {
  return Task.findOne({ id: Number(id) }, { _id: 0, __v: 0 });
};

exports.getTasksByPriority = async (priority) => {
  return Task.find(
    { priority },
    { _id: 0, __v: 0 }
  );
};

exports.updateTask = async (id, data) => {
  if (!validateTask(data)) throw new Error("INVALID_INPUT");

  return Task.findOneAndUpdate(
    { id: Number(id) },
    data,
    { new: true, projection: { _id: 0, __v: 0 } }
  );
};

exports.deleteTask = async (id) => {
  const result = await Task.findOneAndDelete({ id: Number(id) });
  return !!result;
};
