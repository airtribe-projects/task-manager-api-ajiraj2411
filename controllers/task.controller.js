const service = require("../services/task.service");

exports.createTask = async (req, res) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch {
    res.sendStatus(400);
  }
};

exports.getTasks = async (_req, res) => {
  const tasks = await service.getAllTasks();
  res.status(200).json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await service.getTaskById(req.params.id);
  if (!task) return res.sendStatus(404);
  res.json(task);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await service.updateTask(req.params.id, req.body);
    if (!task) return res.sendStatus(404);
    res.json(task);
  } catch {
    res.sendStatus(400);
  }
};

exports.deleteTask = async (req, res) => {
  const ok = await service.deleteTask(req.params.id);
  if (!ok) return res.sendStatus(404);
  res.sendStatus(200);
};
