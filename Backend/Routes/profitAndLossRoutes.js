const express = require('express');
const { saveProfit, getProfitForYear } = require('../controllers/ProfitAndLoss.js');

const router = express.Router();

router.post('/', saveProfit);
router.get('/:year', getProfitForYear);

module.exports = { router }; 