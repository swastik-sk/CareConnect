const express = require('express');
const router = express.Router();
const { getHospitals, getHospitalById, createHospital } = require('../controllers/hospitalController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHospitals)
  .post(protect, authorizeRoles('Admin', 'Hospital Staff'), createHospital);

router.route('/:id')
  .get(getHospitalById);

module.exports = router;
