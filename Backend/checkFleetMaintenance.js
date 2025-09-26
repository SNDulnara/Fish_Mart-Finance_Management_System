const mongoose = require('mongoose');
const FleetMaintenance = require('./models/fleetmaintenance');

console.log('Starting script to check fleet maintenance records...');

const mongoURI = 'mongodb+srv://mongofishmart:HiMRMphsJF7EpMsO@fishmart.evslozk.mongodb.net/fishmart?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas successfully');
  
  // Find all fleet maintenance records
  console.log('Searching for all fleet maintenance records...');
  return FleetMaintenance.find({});
})
.then(records => {
  console.log(`Found ${records.length} fleet maintenance records`);
  
  if (records.length > 0) {
    console.log('Sample records:');
    records.slice(0, 3).forEach(record => {
      console.log({
        id: record._id,
        vehicle_id: record.vehicle_id,
        maintenance_date: record.maintenance_date,
        cost: record.cost,
        status: record.status
      });
    });
  } else {
    console.log('No records found in the database.');
  }
  
  // Check records for 2025
  console.log('Searching for records from 2025...');
  const startDate = new Date('2025-01-01T00:00:00.000Z');
  const endDate = new Date('2026-01-01T00:00:00.000Z');
  
  return FleetMaintenance.find({
    maintenance_date: {
      $gte: startDate,
      $lt: endDate
    }
  });
})
.then(records2025 => {
  console.log(`Found ${records2025.length} fleet maintenance records for 2025`);
  
  if (records2025.length > 0) {
    console.log('2025 records:');
    records2025.forEach(record => {
      console.log({
        id: record._id,
        vehicle_id: record.vehicle_id,
        maintenance_date: record.maintenance_date,
        cost: record.cost,
        status: record.status
      });
    });
    
    // Calculate total cost for 2025
    const totalCost = records2025.reduce((sum, record) => sum + record.cost, 0);
    console.log(`Total maintenance cost for 2025: ${totalCost}`);
  } else {
    console.log('No records found for 2025.');
  }
  
  console.log('Closing MongoDB connection...');
  mongoose.connection.close();
})
.catch(error => {
  console.error('Error occurred:', error);
  console.error('Error details:', error.message);
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
  mongoose.connection.close();
}); 