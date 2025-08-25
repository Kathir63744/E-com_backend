const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('cart');
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Dummy payment endpoint
router.post('/:userId/pay', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // Clear cart to simulate successful payment
    user.cart = [];
    await user.save();
    res.json({ success: true, message: 'Payment successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Payment failed' });
  }
});

module.exports = router;
