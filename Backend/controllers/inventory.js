const Inventory = require('../models/Inventory');

// Create a new inventory item
const createInventory = async (req, res) => {
    try {
        const { item_id, name, description, fish_category, physical_stock, restock_level, unit_price, image } = req.body;

        if (!item_id || !name || !description || !fish_category || !physical_stock || !restock_level || !unit_price) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newInventory = await Inventory.create({
            item_id,
            name,
            description,
            fish_category,
            physical_stock,
            restock_level,
            unit_price,
            image
        });

        res.status(201).json({
            success: true,
            inventory: newInventory
        });
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating inventory',
            error: error.message
        });
    }
};

// Get all inventory items
const getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({ deleted: false });
        res.status(200).json({
            success: true,
            inventory: inventory
        });
    } catch (error) {
        console.error('Error getting inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting inventory',
            error: error.message
        });
    }
};

// Get total inventory value
const getTotalInventoryValue = async (req, res) => {
    try {
        // Only get non-deleted inventory items
        const inventory = await Inventory.find({ deleted: false });
        
        // Calculate total value by multiplying physical_stock with unit_price for each item
        const totalValue = inventory.reduce((sum, item) => {
            const itemValue = item.physical_stock * item.unit_price;
            return sum + itemValue;
        }, 0);

        console.log('Calculating inventory value:');
        inventory.forEach(item => {
            console.log(`${item.name}: ${item.physical_stock} * ${item.unit_price} = ${item.physical_stock * item.unit_price}`);
        });
        console.log('Total value:', totalValue);

        res.status(200).json({
            success: true,
            totalValue: totalValue,
            // Also send individual items for detailed view if needed
            items: inventory.map(item => ({
                name: item.name,
                value: item.physical_stock * item.unit_price,
                physical_stock: item.physical_stock,
                unit_price: item.unit_price
            }))
        });
    } catch (error) {
        console.error('Error calculating inventory value:', error);
        res.status(500).json({
            success: false,
            message: 'Error calculating inventory value',
            error: error.message
        });
    }
};

// Get a single inventory item by ID
const getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ 
            item_id: req.params.id,
            deleted: false 
        });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory item not found'
            });
        }

        res.status(200).json({
            success: true,
            inventory: inventory
        });
    } catch (error) {
        console.error('Error getting inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting inventory',
            error: error.message
        });
    }
};

// Update an inventory item
const updateInventory = async (req, res) => {
    try {
        const updatedInventory = await Inventory.findOneAndUpdate(
            { item_id: req.params.id, deleted: false },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory item not found'
            });
        }

        res.status(200).json({
            success: true,
            inventory: updatedInventory
        });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating inventory',
            error: error.message
        });
    }
};

// Soft delete an inventory item
const deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOneAndUpdate(
            { item_id: req.params.id, deleted: false },
            { deleted: true },
            { new: true }
        );

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Inventory item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting inventory',
            error: error.message
        });
    }
};

module.exports = {
    createInventory,
    getAllInventory,
    getTotalInventoryValue,
    getInventoryById,
    updateInventory,
    deleteInventory
}; 