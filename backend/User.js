const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionStatus: { type: String, default: 'free_trial' },
  // Add any other fields you might need
});

module.exports = mongoose.model('User', userSchema);