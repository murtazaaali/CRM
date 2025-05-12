const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  dueDate: {
    type: Date,
    require: true
  },
  status: {
    type: String,
    enum: ['pending' , 'in-progress' , 'completed'],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ['low' , 'medium' , 'high'],
    default: "low",
  },
  assignedTo: {
    type: String,
    require: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
