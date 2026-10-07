const Reservation = require('../models/Reservation');
const MedicineInventory = require('../models/MedicineInventory');

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Private (Patient)
const createReservation = async (req, res) => {
  try {
    const { pharmacyId, medicineId, quantity } = req.body;

    // Check inventory
    const inventory = await MedicineInventory.findOne({ pharmacyId, medicineId });
    if (!inventory || inventory.quantity < quantity) {
      return res.status(400).json({ message: 'Medicine not available in requested quantity' });
    }

    const reservation = await Reservation.create({
      patientId: req.user._id,
      pharmacyId,
      medicineId,
      quantity,
      status: 'Pending',
      pickupDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });

    // Reduce inventory quantity immediately
    inventory.quantity -= quantity;
    if (inventory.quantity === 0) {
      inventory.availability = 'Unavailable';
    }
    await inventory.save();

    // Emit real-time inventory update
    req.io.emit('medicine_stock_updated', {
      pharmacyId,
      medicineId,
      quantity: inventory.quantity,
      availability: inventory.availability
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's reservations or pharmacy's reservations
// @route   GET /api/reservations
// @access  Private
const getReservations = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'Pharmacy Staff') {
      // In real app, restrict by user's pharmacy ID
      // query.pharmacyId = req.user.pharmacyId;
    }

    const reservations = await Reservation.find(query)
      .populate('pharmacyId', 'name address')
      .populate('medicineId', 'name strength form');
      
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getReservations
};
