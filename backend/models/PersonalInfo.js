const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  emergencyPhone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);