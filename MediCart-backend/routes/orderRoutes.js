const express = require('express');
const router = express.Router();

router.post('/history', (req, res) => {
    const orderData = req.body;

    // Assuming you have a method to save orders to a database
    saveOrderToDatabase(orderData)
        .then(() => res.status(201).json({ message: 'Order saved successfully!' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
