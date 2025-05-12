const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    detail: { type: String },
    link: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    hiddenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    expireAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

activitySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model("activities", activitySchema);
