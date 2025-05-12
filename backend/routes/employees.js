const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Employee = require("../models/Employee");

const { idCreator } = require("../lib/function");

// Get all employees
router.get("/", protect, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new employee
router.post("/", protect, async (req, res) => {
  try {
    const emp_id = await idCreator({
      model: Employee,
      idStr: "EMP",
    });
    
    const employee = new Employee({
      ...req.body,
      createdBy: req.user.id,
      ID: emp_id,
    });

    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    Object.assign(employee, req.body);
    employee.updatedAt = Date.now();
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete deal
router.delete("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.deleteOne();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
