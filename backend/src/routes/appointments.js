const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { appointmentValidationRules, validate } = require('../middleware/validateAppointment');
const { sendAppointmentConfirmation } = require('../utils/email');
const crypto = require('crypto');

// Helper to generate short alphanumeric code
function generateConfirmationCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// POST /api/appointments
router.post('/', appointmentValidationRules, validate, async (req, res) => {
  try {
    const data = req.body;
    const confirmationNo = generateConfirmationCode();
    const appointment = new Appointment({ ...data, confirmationNo });
    await appointment.save();
    // Send email (non‑blocking)
    sendAppointmentConfirmation(appointment).catch(console.error);
    return res.json({ success: true, message: 'Appointment request received', data: { confirmationNo } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/appointments/slots?date=YYYY-MM-DD
router.get('/slots', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ success: false, message: 'date query param required' });
  }
  const appointments = await Appointment.find({ date });
  const bookedSlots = appointments.map(a => a.time);
  return res.json({ success: true, data: { bookedSlots } });
});

module.exports = router;
