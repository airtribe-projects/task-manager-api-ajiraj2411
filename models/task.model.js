const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  {
    timestamps: true
  }
);

/**
 * Indexes for faster querying
 */

// Filter by completion status
TaskSchema.index({ completed: 1 });

// Filter by priority
TaskSchema.index({ priority: 1 });

// Sort by creation date
TaskSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Task", TaskSchema);
