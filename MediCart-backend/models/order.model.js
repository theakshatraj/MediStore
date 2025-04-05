const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartItems: [
        {
            product: { type: Object, required: true }, // Adjust based on your product model
            quantity: { type: Number, required: true }
        }
    ],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
