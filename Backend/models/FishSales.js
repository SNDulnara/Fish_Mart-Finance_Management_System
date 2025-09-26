const mongoose = require('mongoose');

const fishSalesSchema = new mongoose.Schema({
  sale_id: {
    type: Number,
    required: true,
    unique: true
  },
  customer_id: {
    type: Number,
    required: true
  },
  fish_id: {
    type: Number,
    required: true
  },
  quantity_kg: {
    type: Number,
    required: true
  },
  sale_price: {
    type: Number,
    required: true
  },
  sale_type: {
    type: String,
    required: true,
    enum: ['retail', 'wholesale']
  },
  sale_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('FishSales', fishSalesSchema);

