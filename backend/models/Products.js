
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    itemCode: {
      type: String,
      unique: true,
      required: true,
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "category",
    //   required: true,
    // },
    unit: {
      type: String, // e.g., "pcs", "kg", "box"
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
    },
    isStockItem: {
      type: Boolean,
      default: true,
    },
    hasBatch: {
      type: Boolean,
      default: false,
    },
    hasSerial: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
