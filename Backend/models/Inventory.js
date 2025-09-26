const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    item_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fish_category: {
      type: String,
      required: true,
    },
    physical_stock: {
      type: Number,
      required: true,
      min: 0,
    },
    restock_level: {
      type: Number,
      required: true,
      min: 0,
    },
    unit_price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, 
      required: false, 
    },
    deleted: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;