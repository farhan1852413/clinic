const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function sendAppointmentConfirmation(appointment) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: appointment.email,
    subject: 'WhitePearl Dental Clinic – Appointment Confirmation',
    text: `Dear ${appointment.name},\n\nYour appointment for ${appointment.service} on ${appointment.date} at ${appointment.time} has been received.\nYour confirmation number is ${appointment.confirmationNo}.\n\nThank you!`,
  };
  return transporter.sendMail(mailOptions);
}

function sendContactAutoReply(contact) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: contact.email,
    subject: 'WhitePearl Dental Clinic – We Received Your Message',
    text: `Hi ${contact.name},\n\nThank you for reaching out regarding ${contact.subject}. We have received your message and will get back to you shortly.\n\nBest regards,\nWhitePearl Dental Clinic`,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendAppointmentConfirmation, sendContactAutoReply };
