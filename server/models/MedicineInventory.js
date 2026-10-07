const mongoose = require('mongoose');

const medicineInventorySchema = new mongoose.Schema({
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, default: 0 },
  availability: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('MedicineInventory', medicineInventorySchema);
