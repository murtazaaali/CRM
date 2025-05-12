const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Activity = require("../models/Activity");

// Get all activities
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const activities = await Activity.find({ hiddenBy: { $ne: userId } }).sort(
      { createdAt: -1 }
    );
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/delete/:id', protect,  async (req, res) => {
  const userId = req.user.id;
  
  const activity = await Activity.findById(req.params.id);
  if (!activity.hiddenBy.includes(userId)) {
    activity.hiddenBy.push(userId);
    await activity.save();
  }
  res.json({ success: true });
});


module.exports = router;
