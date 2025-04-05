const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Ensure this path is correct
const router = express.Router();

// Register (Sign Up) route
router.post('/signup', async (req, res) => {
    const { name, email, phone, address, creditCard, password } = req.body;

    // Input validation
    if (!name || !email || !password || !phone || !address || !creditCard) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({ name, email, phone, address, creditCard, password: hashedPassword });
        
        // Save the user
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});
//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        console.error('Signin error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;