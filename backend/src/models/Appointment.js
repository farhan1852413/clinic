const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true, enum: ['cosmetic','implants','orthodontic','preventive','restorative','emergency'] },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // e.g., "09:00 AM"
  notes: { type: String },
  isNewPatient: { type: String, required: true, enum: ['yes','no'] },
  status: { type: String, default: 'Pending', enum: ['Pending','Confirmed','Completed','Cancelled'] },
  confirmationNo: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
