const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  if (!req.body || !req.body.items || !Array.isArray(req.body.items)) {
    return res.status(400).json({ message: 'Order payload must include items.' });
  }

  try {
    const orderData = {
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone || 'N/A',
      address: req.body.address || 'N/A',
      items: req.body.items,
      totalAmount: req.body.totalAmount || 0,
      paymentMethod: req.body.paymentMethod || 'COD',
      trackingId: `PEX-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
