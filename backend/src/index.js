// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const appointmentRoutes = require('./routes/appointments');
const contactRoutes = require('./routes/contact');
const adminAuth = require('./middleware/adminAuth');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

// Admin routes (protected)
app.use('/api/admin/appointments', adminAuth, require('./routes/adminAppointments'));
app.use('/api/admin/contact', adminAuth, require('./routes/adminContact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
