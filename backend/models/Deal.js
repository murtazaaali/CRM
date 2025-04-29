
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  value: {
    type: Number,
  },
  stage: {
    type: String,
    enum: ['proposal', 'negotiation' , 'contract' ,'closed', 'lost'],
    default: "proposal",
  },
  probability: {
    type: Number,
  },
  expectedCloseDate: {
    type: String,
  },
  owner: {
    type: String,
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

module.exports = mongoose.model("deals", dealSchema);
