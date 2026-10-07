const Queue = require('../models/Queue');
const Hospital = require('../models/Hospital');

// @desc    Get queue for a specific hospital
// @route   GET /api/hospitals/:id/queue
// @access  Public
const getHospitalQueue = async (req, res) => {
  try {
    const queues = await Queue.find({ hospitalId: req.params.id });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a queue (Call next patient, add patient, etc)
// @route   PUT /api/hospitals/:id/queue/:queueId
// @access  Private (Hospital Staff)
const updateQueue = async (req, res) => {
  try {
    const { currentToken, waitingPatients, estimatedWaitingTime } = req.body;
    
    const queue = await Queue.findById(req.params.queueId);
    
    if (!queue) {
      return res.status(404).json({ message: 'Queue not found' });
    }

    // Check if the queue belongs to the hospital
    if (queue.hospitalId.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Queue does not belong to this hospital' });
    }

    if (currentToken !== undefined) queue.currentToken = currentToken;
    if (waitingPatients !== undefined) queue.waitingPatients = waitingPatients;
    if (estimatedWaitingTime !== undefined) queue.estimatedWaitingTime = estimatedWaitingTime;

    const updatedQueue = await queue.save();

    // Emit real-time event to all connected clients
    req.io.emit('queue_updated', {
      hospitalId: req.params.id,
      queueId: updatedQueue._id,
      department: updatedQueue.department,
      currentToken: updatedQueue.currentToken,
      waitingPatients: updatedQueue.waitingPatients,
      estimatedWaitingTime: updatedQueue.estimatedWaitingTime
    });

    res.json(updatedQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHospitalQueue,
  updateQueue
};
