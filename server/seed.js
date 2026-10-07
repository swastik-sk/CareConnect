const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Hospital = require('./models/Hospital');
const Queue = require('./models/Queue');

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    await Hospital.deleteMany();
    await Queue.deleteMany();

    const hospitals = [
      {
        name: 'City Care Hospital',
        address: '123 Main St, Downtown',
        phone: '+1 234 567 8900',
        departments: ['Cardiology', 'Neurology', 'Pediatrics'],
        openingHours: '24/7',
        verificationStatus: 'Verified'
      },
      {
        name: 'Green Valley Hospital',
        address: '456 Park Ave, Northside',
        phone: '+1 987 654 3210',
        departments: ['Pediatrics', 'Orthopedics'],
        openingHours: '08:00 AM - 10:00 PM',
        verificationStatus: 'Verified'
      }
    ];

    const createdHospitals = await Hospital.insertMany(hospitals);

    const queues = [
      {
        hospitalId: createdHospitals[0]._id,
        department: 'Cardiology',
        currentToken: 42,
        waitingPatients: 5,
        estimatedWaitingTime: 25
      },
      {
        hospitalId: createdHospitals[0]._id,
        department: 'Neurology',
        currentToken: 15,
        waitingPatients: 8,
        estimatedWaitingTime: 45
      },
      {
        hospitalId: createdHospitals[1]._id,
        department: 'Pediatrics',
        currentToken: 10,
        waitingPatients: 3,
        estimatedWaitingTime: 15
      }
    ];

    await Queue.insertMany(queues);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
