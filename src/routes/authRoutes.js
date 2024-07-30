const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { createUser, findUserByEmail } = require('../repositories/userRepository');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const user = await createUser({ username, email, password });
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
