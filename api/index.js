const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/api/products', productController.getProducts);
app.post('/api/products', productController.createProduct);
app.delete('/api/products/:id', productController.deleteProduct);

app.post('/api/orders', orderController.createOrder);
app.get('/api/orders', orderController.getOrders);
app.put('/api/orders/:id', orderController.updateOrderStatus);

app.get('/api/health', (req, res) => {
  res.status(200).json({ operational: true, timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Development server listening on port ${PORT}`));
}

module.exports = app;
