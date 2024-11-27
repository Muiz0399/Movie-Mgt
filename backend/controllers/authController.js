const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Create a new user
      const user = await User.create({ name, email, password });
  
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'User registered', token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in', token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = { register, login };
