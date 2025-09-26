const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createDatabaseAndCollections } = require('./Database/DB.js');
const { router: fishSalesRouter } = require('./Route/FishSales.js');
const { router: salaryRouter } = require('./Route/salary.js');
const { router: staffRouter } = require('./Route/staff.js');
const { router: profitAndLossRouter } = require('./Routes/profitAndLossRoutes.js');
const { router: inventoryRouter } = require('./Route/inventory.js');
const FleetMaintenance = require('./models/fleetmaintenance');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Routes
app.use("/api/fishsales", fishSalesRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/staff", staffRouter);
app.use("/api/profitandloss", profitAndLossRouter);
app.use("/api/inventory", inventoryRouter);

// Fleet Maintenance Route - Directly in server.js
app.get("/api/fleetmaintenance/total-cost", async (req, res) => {
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
    const maintenanceRecords = await FleetMaintenance.find({
      maintenance_date: {
        $gte: startDate,
        $lt: endDate
      }
    });

    console.log(`Found ${maintenanceRecords.length} maintenance records for ${year}`);
    
    // Calculate total cost
    const totalCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
    
    console.log(`Total maintenance cost for ${year}: ${totalCost}`);

    res.json({
      success: true,
      totalCost: totalCost.toFixed(2)
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

// Initialize database
createDatabaseAndCollections()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch(err => {
    console.error('Error initializing database:', err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
