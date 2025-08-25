const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// Get wishlist for user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product to wishlist
router.post('/:userId/add', async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user.wishlist.includes(productId)) user.wishlist.push(productId);
    await user.save();
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Move wishlist item to cart
router.post('/:userId/move-to-cart', async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    // Add to cart if not exists
    if (!user.cart.includes(productId)) user.cart.push(productId);
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    res.json({ message: 'Moved to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
