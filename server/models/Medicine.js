const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genericName: { type: String },
  brand: { type: String },
  strength: { type: String },
  form: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
