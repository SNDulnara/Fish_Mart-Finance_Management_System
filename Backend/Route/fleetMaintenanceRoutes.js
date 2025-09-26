const express = require('express');
const router = express.Router();
const FleetMaintenance = require('../models/FleetMaintenance');

// Route to get total maintenance cost for a specific year
router.get('/total-cost', (req, res) => {
  try {
    const { year } = req.query;
    
    if (!year) {
      return res.status(400).json({
        success: false,
        message: 'Year parameter is required'
      });
    }

    // Create start and end dates for the year
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`);

    console.log(`Fetching maintenance costs between ${startDate.toISOString()} and ${endDate.toISOString()}`);

    // Find all maintenance records for the specified year
    FleetMaintenance.find({
      maintenance_date: {
        $gte: startDate,
        $lt: endDate
      }
    })
    .then(maintenanceRecords => {
      console.log(`Found ${maintenanceRecords.length} maintenance records for ${year}`);
      
      // Calculate total cost
      const totalCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
      
      console.log(`Total maintenance cost for ${year}: ${totalCost}`);

      res.json({
        success: true,
        totalCost: totalCost.toFixed(2)
      });
    })
    .catch(error => {
      console.error('Error finding maintenance records:', error);
      res.status(500).json({
        success: false,
        message: 'Error finding maintenance records',
        error: error.message
      });
    });
  } catch (error) {
    console.error('Error calculating total maintenance cost:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating total maintenance cost',
      error: error.message
    });
  }
});

module.exports = { router }; 