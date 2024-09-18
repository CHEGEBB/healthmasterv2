const PersonalInfo = require('../models/PersonalInfo');

exports.create = async (req, res) => {
  try {
    const personalInfo = new PersonalInfo(req.body);
    await personalInfo.save();
    res.status(201).json({ message: 'Personal information saved successfully', data: personalInfo });
  } catch (error) {
    res.status(400).json({ message: 'Error saving personal information', error: error.message });
  }
};

// New GET method to fetch user information
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await PersonalInfo.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user information', error: error.message });
  }
};