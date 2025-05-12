const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect } = require("../middleware/auth");
const { createActivity } = require("../lib/function");

router.get("/", protect, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new category
router.post("/", protect, async (req, res) => {
  try {
    const { parentCategory } = req.body;

    const category = new Category({
      ...req.body,
      createdBy: req.user.id,
      parentCategory: parentCategory !== "" ? parentCategory : null,
    });

    const newCategory = await category.save();

    // activity
    await createActivity({
      createdBy: req.user.id,
      action: "Created",
      userName: req.user.name,
      task: "Category",
      taskname: newCategory.name,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.put("/:id", protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { parentCategory } = req.body;

    Object.assign(category, {
      ...req.body,
      parentCategory: parentCategory !== "" ? parentCategory : null,
    });
    category.updatedAt = Date.now();
    const updatedCategory = await category.save();

    // activity
    await createActivity({
      createdBy: req.user.id,
      action: "Updated",
      userName: req.user.name,
      task: "Category",
      taskname: req?.body?.name,
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete category
router.delete("/:id", protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // activity
    await createActivity({
      createdBy: req.user.id,
      action: "Deleted",
      userName: req.user.name,
      task: "Category",               
      taskname: category?.name,   
    });

    await category.deleteOne(); 

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
