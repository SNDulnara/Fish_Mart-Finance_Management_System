const express = require('express');
const { getTotalMaintenanceCost } = require('../controllers/fleetMaintenance');

const router = express.Router();

// Route to get total maintenance cost for a specific year
router.get('/total-cost', getTotalMaintenanceCost);

module.exports = { router }; 