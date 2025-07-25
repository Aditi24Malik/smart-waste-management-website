const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  wasteType: String,
  pickupDate: String,
  pickupTime: String,
  address: String,
  estimatedWeight: String,
  specialInstructions: String,
  contactNumber: String,
  email: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pickup', pickupSchema);
