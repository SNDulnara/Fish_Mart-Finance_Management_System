const mongoose = require('mongoose');

const profitAndLossSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    unique: true
  },
  profit: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProfitAndLoss', profitAndLossSchema); 