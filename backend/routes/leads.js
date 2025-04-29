const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Lead = require("../models/Lead");

// Get all leads
router.get("/", protect, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create new lead
router.post("/", protect, async (req, res) => {
  try {
   
    const lead = new Lead({
      ...req.body,
      createdBy: req.user.id,
    });

    const newLead = await lead.save();
    res.status(201).json(newLead);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update lead
router.put('/:id', protect, async (req, res) => {
    try { 
      
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        Object.assign(lead, req.body);
        lead.updatedAt = Date.now();
        const updatedLead = await lead.save();
        res.json(updatedLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete lead
router.delete("/:id", protect, async (req, res) => {
  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.deleteOne();

    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
