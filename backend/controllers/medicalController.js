const MedicalInfo = require('../models/MedicalInfo');

exports.saveMedicalInfo = async (req, res) => {
  try {
    const medicalInfo = new MedicalInfo(req.body);
    const savedMedicalInfo = await medicalInfo.save();
    res.status(201).json({ message: 'Medical information saved successfully', data: savedMedicalInfo });
  } catch (error) {
    console.error('Error saving medical information:', error);
    res.status(400).json({ message: 'Failed to save medical information. Please try again.', error: error.message });
  }
};