const express = require('express');
const router = express.Router();
const { searchMedicines } = require('../controllers/medicineController');

router.route('/search')
  .get(searchMedicines);

module.exports = router;
