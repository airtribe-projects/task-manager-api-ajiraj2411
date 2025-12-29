function validateTask(body) {
  if (!body) return false;

  const { title, description, completed, priority } = body;

  if (typeof title !== "string" || title.trim() === "") return false;
  if (typeof description !== "string" || description.trim() === "") return false;
  if (typeof completed !== "boolean") return false;

  if (priority !== undefined) {
    if (!["low", "medium", "high"].includes(priority)) {
      return false;
    }
  }

  return true;
}

module.exports = validateTask;
