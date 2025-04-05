const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // Ensure this path is correct
const router = express.Router();

// Get Current User Profile (without authentication)
router.get('/current', async (req, res) => {
    // Ideally, get the user ID from the request, session, or token
    const userId = req.query.userId; // Adjust this according to how you are passing the user ID

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json(user);
    } catch (error) {
        console.error('Error retrieving current user:', error);
        res.status(500).send('Server error');
    }
});

// Other routes (Signup, Login, etc.)...
module.exports = router;
