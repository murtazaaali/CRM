const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  source: {
    type: String,
    enum: ["website", "referral", "social", "other"],
    default: "other",
  },
  company: {
    type: String,
  },
  value: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "qualified", "lost"],
    default: "new",
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

module.exports = mongoose.model("leads", leadSchema);
