const express = require('express');
const router = express.Router();

// Rider authentication middleware (dummy)
const isRider = (req, res, next) => {
  console.log('Rider middleware passed');
  next();
};

// GET rider's assigned orders
router.get('/assigned-orders', isRider, (req, res) => {
  // Dummy data
  res.json([
    { id: 101, address: 'Bangalore', status: 'Out for delivery' },
    { id: 102, address: 'Delhi', status: 'Pending' }
  ]);
});

// Update order delivery status
router.post('/update-status', isRider, (req, res) => {
  const { orderId, status } = req.body;
  // Logic to update DB
  res.json({ message: `Order ${orderId} marked as ${status}` });
});

module.exports = router;
