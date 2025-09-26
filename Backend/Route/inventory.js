const express = require('express');
const {
    createInventory,
    getAllInventory,
    getTotalInventoryValue,
    getInventoryById,
    updateInventory,
    deleteInventory
} = require('../controllers/inventory');

const router = express.Router();

// Create a new inventory item
router.post('/', createInventory);

// Get all inventory items
router.get('/', getAllInventory);

// Get total inventory value
router.get('/total-value', getTotalInventoryValue);

// Get a single inventory item
router.get('/:id', getInventoryById);

// Update an inventory item
router.put('/:id', updateInventory);

// Delete an inventory item
router.delete('/:id', deleteInventory);

module.exports = { router }; 