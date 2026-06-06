const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  stock: { type: Number, required: true, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
