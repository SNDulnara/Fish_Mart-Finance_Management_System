const express = require('express');
const router = express.Router();
const { getAllFishSales } = require('../Controllers/FishSalesController');

// Get all fish sales for a specific year
router.get('/getallfishsales', getAllFishSales);

module.exports = router; 