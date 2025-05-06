const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple login route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      // Create and save new user
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
