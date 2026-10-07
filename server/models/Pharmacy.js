const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  phone: { type: String, required: true },
  openingHours: { type: String },
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  staffMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Pharmacy', pharmacySchema);
