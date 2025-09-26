const express = require('express');
const router = express.Router();
const { getTotalMaintenanceCost } = require('../controllers/fleetMaintenance');

// Route to get total maintenance cost for a specific year
router.get('/total-cost', getTotalMaintenanceCost);

module.exports = router; 