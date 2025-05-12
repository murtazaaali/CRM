const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  ID: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  hireDate: {
    type: Date,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
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

module.exports = mongoose.model("employees", employeeSchema);
