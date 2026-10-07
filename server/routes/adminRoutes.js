const express = require('express');
const router = express.Router();
const { getStats, verifyEntity } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// In a real application, we would also add an admin middleware here
// e.g. .get(protect, admin, getStats)

router.route('/stats')
  .get(protect, getStats);

router.route('/verify/:type/:id')
  .put(protect, verifyEntity);

module.exports = router;
