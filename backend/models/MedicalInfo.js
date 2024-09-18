const mongoose = require('mongoose');

const MedicalInfoSchema = new mongoose.Schema({
  primaryPhysician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  insuranceProvider: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  allergies: {
    type: String
  },
  currentMedications: {
    type: String
  },
  familyMedicalHistory: {
    type: String
  },
  pastMedicalHistory: {
    type: String
  }
}, {
  timestamps: true
});

const MedicalInfo = mongoose.model('MedicalInfo', MedicalInfoSchema);

module.exports = MedicalInfo;