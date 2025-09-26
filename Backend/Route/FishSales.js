const express = require("express");
const { getAllFishSales } = require("../Controllers/FishSalesController");

const router = express.Router();

// Get all fish sales for a specific year
router.get("/getallfishsales", getAllFishSales);

module.exports = { router };