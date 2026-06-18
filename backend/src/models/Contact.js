const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true, enum: ['appointment','consultation','inquiry','feedback'] },
  message: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New','Read','Replied','Closed'] },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
