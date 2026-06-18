const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { contactValidationRules, validate } = require("../middleware/validateContact");

router.post("/", contactValidationRules, validate, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: "Message sent successfully", data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
