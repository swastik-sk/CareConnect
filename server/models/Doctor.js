const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
