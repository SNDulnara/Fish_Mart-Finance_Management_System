const mongoose = require('mongoose');

const fleetMaintenanceSchema = new mongoose.Schema({
  vehicle_id: {
    type: String,
    required: true,
    unique: true
  },
  vehicle_type: {
    type: String,
    required: true
  },
  maintenance_date: {
    type: Date,
    required: true
  },
  maintenance_type: {
    type: String,
    required: true,
    enum: ['routine', 'repair', 'emergency']
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const FleetMaintenance = mongoose.model('FleetMaintenance', fleetMaintenanceSchema);
module.exports = FleetMaintenance; 