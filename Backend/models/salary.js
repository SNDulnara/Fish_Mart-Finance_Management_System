const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const salarySchema = new mongoose.Schema({
    s_id: {
        type: Number,
        unique: true,
    },
    staff_id: {
        type: String,
        required: [true, 'Staff ID is required'],
        match: [/^S-\d{4}$/, 'Staff ID must follow format S-XXXX (e.g., S-1234)']
    },  
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    basicSalary: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: false
    },
    days: {
        type: String,
        required: false
    },
    allowance: {
        type: String,
        required: false
    },
    overtime: {
        type: String,
        required: false,
        default: "0.00"
    },
    epf: {
        type: String,
        required: true
    },
    etf: {
        type: String,
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    netSalary: {
        type: String,
        required: true
    }
},
{
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
});

// Plugin for unique validation
salarySchema.plugin(uniqueValidator, { message: 'Error, {PATH} is Already Exists.' });

// Pre-save middleware to generate s_id
salarySchema.pre('save', async function(next) {
    try {
        // Generate a random 6-digit numeric ID
        const generatedId = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
        this.s_id = generatedId; // Assign generated ID to the s_id field
        next(); // Continue with the save operation
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

module.exports = mongoose.model('salary', salarySchema);
