const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // e.g., 'admin', 'citizen'
});

module.exports = mongoose.model('User', userSchema);
