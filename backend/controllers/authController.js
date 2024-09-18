const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone number' });
    }

    const newUser = new User({ fullName, email, phoneNumber, password });
    newUser.isVerified = true;
    newUser.isNewUser = true; // Mark the user as new

    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', userId: newUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Check if it's the user's first login
    const isNewUser = user.isNewUser;

    // After the first login, mark the user as no longer new
    if (isNewUser) {
      user.isNewUser = false;
      await user.save();
    }

    res.status(200).json({ token, isNewUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
