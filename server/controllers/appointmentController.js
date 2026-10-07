const Appointment = require('../models/Appointment');
const Queue = require('../models/Queue');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
  try {
    const { hospitalId, doctorId, department, date, time } = req.body;

    // Find the queue for this department to generate a token
    let queue = await Queue.findOne({ hospitalId, department });
    
    if (!queue) {
      // Create a queue if it doesn't exist
      queue = await Queue.create({
        hospitalId,
        department,
        currentToken: 0,
        waitingPatients: 0,
        estimatedWaitingTime: 0
      });
    }

    // Generate token number (simple implementation: current token + waiting + 1)
    const tokenNumber = queue.currentToken + queue.waitingPatients + 1;

    const appointment = await Appointment.create({
      patientId: req.user._id,
      hospitalId,
      doctorId,
      department,
      date,
      time,
      tokenNumber,
      status: 'Confirmed'
    });

    // Update the queue waiting patients
    queue.waitingPatients += 1;
    queue.estimatedWaitingTime += 15; // Assume 15 mins per patient
    await queue.save();

    // Emit real-time queue update
    req.io.emit('queue_updated', {
      hospitalId,
      queueId: queue._id,
      department: queue.department,
      currentToken: queue.currentToken,
      waitingPatients: queue.waitingPatients,
      estimatedWaitingTime: queue.estimatedWaitingTime
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    // If patient, get their appointments. If hospital staff, get hospital's appointments
    let query = {};
    if (req.user.role === 'Patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'Hospital Staff') {
      // For a real app, staff should be linked to a hospitalId. We'll simplify here.
      // query.hospitalId = req.user.hospitalId; 
    }

    const appointments = await Appointment.find(query).populate('hospitalId', 'name').populate('doctorId', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments
};
