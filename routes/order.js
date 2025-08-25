const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/', async (req, res) => {
  try {
    const { user, items, totalAmount, paymentMethod } = req.body;

    if (!user || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newOrder = new Order({ user, items, totalAmount, paymentMethod });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
