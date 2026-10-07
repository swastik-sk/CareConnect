const Medicine = require('../models/Medicine');
const MedicineInventory = require('../models/MedicineInventory');

// @desc    Search medicines and find pharmacies having them
// @route   GET /api/medicines/search
// @access  Public
const searchMedicines = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Please provide a medicine name to search' });
    }

    // Find medicines matching the name
    const medicines = await Medicine.find({ name: { $regex: name, $options: 'i' } });
    const medicineIds = medicines.map(m => m._id);

    // Find inventory for these medicines across all pharmacies
    const inventory = await MedicineInventory.find({ medicineId: { $in: medicineIds } })
      .populate('pharmacyId', 'name address location phone')
      .populate('medicineId');

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchMedicines
};
