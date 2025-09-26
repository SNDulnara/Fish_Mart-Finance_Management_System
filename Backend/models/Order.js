const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  customerDetails: {
    type: Object,
    required: true
  },
  items: [{
    type: Object,
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled']
  },
  type: {
    type: String,
    required: true,
    enum: ['Self Pickup', 'Delivery']
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 