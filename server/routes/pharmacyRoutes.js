const express = require('express');
const router = express.Router();
const { getPharmacies, getPharmacyInventory } = require('../controllers/pharmacyController');

router.route('/')
  .get(getPharmacies);

router.route('/:id/inventory')
  .get(getPharmacyInventory);

module.exports = router;
