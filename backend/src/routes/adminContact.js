const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
