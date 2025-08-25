// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// @route GET /api/products
// @desc Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/products
// @desc Add new product
router.post("/", async (req, res) => {
  const { name, price, description, category, stock, image } = req.body;

  const product = new Product({ name, price, description, category, stock, image });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
