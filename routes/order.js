const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
  const { product, size, color } = req.body;
  const order = await Order.create({
    user: req.user._id,
    product,
    size,
    color,
    status: 'pending'
  });
  res.json(order);
});

module.exports = router;
