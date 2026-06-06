const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'COD' },
  trackingId: { type: String, unique: true },
  status: {
    type: String,
    enum: ['Pending', 'Dispatched', 'In Transit', 'Delivered', 'Returned'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
