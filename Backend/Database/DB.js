const mongoose = require('mongoose');
const { fishSalesData } = require('./../Data/FishSalesData.js');
const FishSales = require('../models/FishSales.js');

// Updated connection string with new username and password
const mongoURI = 'mongodb+srv://mongofishmart:HiMRMphsJF7EpMsO@fishmart.evslozk.mongodb.net/fishmart?retryWrites=true&w=majority';

async function createDatabaseAndCollections() {
  try {
    // Connect with new credentials
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully to FishMart database");

    // Only insert fish sales data if the collection is empty
    const count = await FishSales.countDocuments();
    if (count === 0) {
      const insertedFishSales = await FishSales.insertMany(fishSalesData);
      console.log(`${insertedFishSales.length} documents inserted into "Fish Sales" collection`);
    }

  } catch (err) {
    console.error("Error while connecting or inserting data:", err);
    console.error("Error details:", err.message);
    throw err; // Rethrow the error to be handled by the caller
  }
}

module.exports = { createDatabaseAndCollections };



