const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staff_id: { 
    type: String, 
    required: [true, 'Staff ID is required'], 
    unique: true,
    match: [/^S-\d{4}$/, 'Staff ID must follow format S-XXXX (e.g., S-1234)']
  },
  full_name: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  role: { 
    type: String, 
    enum: {
      values: ['Warehouse Staff', 'Fleet Manager', 'Fisherman', 'Rider'],
      message: '{VALUE} is not a valid role'
    }, 
    required: [true, 'Role is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  phone_number: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    minlength: [5, 'Address must be at least 5 characters']
  },
  salary: { 
    type: Number, 
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  hire_date: { 
    type: Date, 
    required: [true, 'Hire date is required'],
    validate: {
      validator: function(v) {
        return v <= new Date(); // Must be today or earlier
      },
      message: 'Hire date cannot be in the future'
    }
  },
  status: { 
    type: String, 
    enum: {
      values: ['Active', 'Inactive'],
      message: '{VALUE} is not a valid status'
    }, 
    default: 'Active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('staff', staffSchema);