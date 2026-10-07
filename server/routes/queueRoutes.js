const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params to get hospital :id
const { getHospitalQueue, updateQueue } = require('../controllers/queueController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHospitalQueue);

router.route('/:queueId')
  .put(protect, authorizeRoles('Hospital Staff', 'Admin'), updateQueue);

module.exports = router;
