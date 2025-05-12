const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Product = require("../models/Products");


router.get("/", protect, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new product
router.post("/", protect, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.user.id,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Object.assign(product, req.body);
    product.updatedAt = Date.now();
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete deal
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    await product.deleteOne();
    res.json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;