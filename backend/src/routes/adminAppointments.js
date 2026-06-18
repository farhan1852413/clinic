const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
