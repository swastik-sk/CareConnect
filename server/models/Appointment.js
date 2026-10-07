const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  department: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  tokenNumber: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Waiting', 'In Progress', 'Completed', 'Cancelled', 'No Show'], 
    default: 'Confirmed' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
