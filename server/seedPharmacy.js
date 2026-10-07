const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Pharmacy = require('./models/Pharmacy');
const Medicine = require('./models/Medicine');
const MedicineInventory = require('./models/MedicineInventory');

dotenv.config();

const seedPharmacyData = async () => {
  await connectDB();

  try {
    await Pharmacy.deleteMany();
    await Medicine.deleteMany();
    await MedicineInventory.deleteMany();

    const pharmacies = await Pharmacy.insertMany([
      { name: 'HealthPlus Pharmacy', address: '123 Main St', phone: '111-222-3333', verificationStatus: 'Verified' },
      { name: 'CareMed Pharmacy', address: '456 Tech Ave', phone: '444-555-6666', verificationStatus: 'Verified' }
    ]);

    const medicines = await Medicine.insertMany([
      { name: 'Paracetamol', brand: 'Crocin', strength: '500mg', form: 'Tablet' },
      { name: 'Amoxicillin', brand: 'Mox', strength: '250mg', form: 'Capsule' },
      { name: 'Ibuprofen', brand: 'Advil', strength: '400mg', form: 'Tablet' }
    ]);

    await MedicineInventory.insertMany([
      { pharmacyId: pharmacies[0]._id, medicineId: medicines[0]._id, quantity: 100, availability: 'Available' },
      { pharmacyId: pharmacies[0]._id, medicineId: medicines[1]._id, quantity: 0, availability: 'Unavailable' },
      { pharmacyId: pharmacies[1]._id, medicineId: medicines[0]._id, quantity: 50, availability: 'Available' },
      { pharmacyId: pharmacies[1]._id, medicineId: medicines[2]._id, quantity: 200, availability: 'Available' }
    ]);

    console.log('Pharmacy Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedPharmacyData();
