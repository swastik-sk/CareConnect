const Pharmacy = require('../models/Pharmacy');
const MedicineInventory = require('../models/MedicineInventory');

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public
const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pharmacy inventory
// @route   GET /api/pharmacies/:id/inventory
// @access  Public
const getPharmacyInventory = async (req, res) => {
  try {
    const inventory = await MedicineInventory.find({ pharmacyId: req.params.id }).populate('medicineId');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPharmacies,
  getPharmacyInventory
};
