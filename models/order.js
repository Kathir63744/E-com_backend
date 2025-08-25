const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // or ObjectId if you have User refs
  items: [
    {
      productId: { type: String, required: true }, // or ObjectId ref to Product
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      salePrice: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
