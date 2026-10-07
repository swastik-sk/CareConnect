const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  department: { type: String, required: true },
  currentToken: { type: Number, default: 0 },
  waitingPatients: { type: Number, default: 0 },
  estimatedWaitingTime: { type: Number, default: 0 } // in minutes
}, { timestamps: true });

module.exports = mongoose.model('Queue', queueSchema);
