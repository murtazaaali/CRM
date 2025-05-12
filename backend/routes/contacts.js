const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Contact = require("../models/Contact");
const { createActivity } = require("../lib/function");

// Get all contacts
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new contact
router.post("/", protect, async (req, res) => {
  try {
    const contact = new Contact({
      ...req.body,
      createdBy: req.user.id,
    });

    const newContact = await contact.save();

    // activity
    await createActivity({
      createdBy: req.user.id,
      action: "Created",
      userName: req.user.name,
      task: "Contact",               
      taskname: newContact.name,   
    });


    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update contact
router.put("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    Object.assign(contact, req.body);
    contact.updatedAt = Date.now();
    const updatedContact = await contact.save();

     // activity
     await createActivity({
      createdBy: req.user.id,
      action: "Updated",
      userName: req.user.name,
      task: "Contact",               
      taskname: req?.body?.name,   
    });

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact
router.delete("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // activity
    await createActivity({
      createdBy: req.user.id,
      action: "Deleted",
      userName: req.user.name,
      task: "Contact",               
      taskname: contact?.name,   
    });

    await contact.deleteOne(); 

    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
