const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Ready for Pickup', 'Collected', 'Cancelled', 'Expired'], 
    default: 'Pending' 
  },
  pickupDeadline: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
