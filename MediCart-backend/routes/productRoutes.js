const express = require('express');
const Product = require('../models/product.model');
const User = require('../models/user.model'); 
const Order = require('../models/order.model'); 

const router = express.Router();

// Fetch All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add to Cart (Decrement Stock)
router.post('/add-to-cart', async (req, res) => {
  const { productId, userId } = req.body; // Assuming you send the user ID

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    if (product.stock <= 0) return res.status(400).send('Product out of stock');

    // Decrement product stock
    product.stock -= 1;
    await product.save();

    // Find user and add product to cart
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.cart.push(product);
    await user.save();

    res.send('Product added to cart');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// View Cart
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('cart');
    if (!user) return res.status(404).send('User not found');

    res.json(user.cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Checkout (Save Order to Order History)
router.post('/checkout', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate('cart');
    if (!user) return res.status(404).send('User not found');

    if (user.cart.length === 0) return res.status(400).send('Your cart is empty');

    // Create a new order
    const newOrder = new Order({
      user: userId,
      products: user.cart,
      totalAmount: user.cart.reduce((sum, product) => sum + product.price, 0),
      date: new Date(),
    });

    await newOrder.save();

    // Clear user's cart after checkout
    user.cart = [];
    await user.save();

    res.send('Order successfully placed');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
