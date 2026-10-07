const Hospital = require('../models/Hospital');
const Queue = require('../models/Queue');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
const getHospitals = async (req, res) => {
  try {
    const { search, department } = req.query;
    
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (department) {
      query.departments = department;
    }

    const hospitals = await Hospital.find(query);
    
    // Attach queue data (waiting times) to each hospital
    const hospitalsWithQueue = await Promise.all(hospitals.map(async (hospital) => {
      const queues = await Queue.find({ hospitalId: hospital._id });
      // Find max waiting time across departments, or just sum it for a general overview
      const totalWaitingPatients = queues.reduce((sum, q) => sum + q.waitingPatients, 0);
      const avgEstimatedTime = queues.length > 0 
        ? Math.round(queues.reduce((sum, q) => sum + q.estimatedWaitingTime, 0) / queues.length)
        : 0;
        
      return {
        ...hospital._doc,
        totalWaitingPatients,
        avgEstimatedTime
      };
    }));

    res.json(hospitalsWithQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single hospital
// @route   GET /api/hospitals/:id
// @access  Public
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    
    // Get queues for this hospital
    const queues = await Queue.find({ hospitalId: hospital._id });
    
    res.json({
      ...hospital._doc,
      queues
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a hospital
// @route   POST /api/hospitals
// @access  Private (Admin or Hospital Staff)
const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    const createdHospital = await hospital.save();
    res.status(201).json(createdHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  createHospital
};
