const Pickup = require('../models/Pickup');

exports.schedulePickup = async (req, res) => {
  try {
    const newPickup = new Pickup(req.body);
    const saved = await newPickup.save();
    res.status(201).json({ message: 'Pickup scheduled successfully', pickup: saved });
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving pickups' });
  }
};
