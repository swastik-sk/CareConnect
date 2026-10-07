const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, bookAppointment)
  .get(protect, getAppointments);

module.exports = router;
