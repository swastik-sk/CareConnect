const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Pharmacy = require('../models/Pharmacy');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const hospitalCount = await Hospital.countDocuments();
    const pharmacyCount = await Pharmacy.countDocuments();
    
    // You could also add appointment/reservation counts here
    
    res.json({
      users: userCount,
      hospitals: hospitalCount,
      pharmacies: pharmacyCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a hospital or pharmacy
// @route   PUT /api/admin/verify/:type/:id
// @access  Private (Admin)
const verifyEntity = async (req, res) => {
  try {
    const { type, id } = req.params;
    let entity;

    if (type === 'hospital') {
      entity = await Hospital.findById(id);
    } else if (type === 'pharmacy') {
      entity = await Pharmacy.findById(id);
    } else {
      return res.status(400).json({ message: 'Invalid entity type' });
    }

    if (!entity) {
      return res.status(404).json({ message: 'Entity not found' });
    }

    entity.verificationStatus = 'Verified';
    await entity.save();

    res.json({ message: `${type} verified successfully`, entity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  verifyEntity
};
