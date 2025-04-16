
const express = require('express');
const router = express.Router();

// Sample admin middleware (can add role checking here)
const isAdmin = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  next();
};

// GET all orders
router.get('/orders', isAdmin, (req, res) => {
  // Dummy data for now
  res.json([
    { id: 1, product: 'Cake', status: 'Delivered' },
    { id: 2, product: 'Gift Box', status: 'Pending' }
  ]);
});

// Manage products
router.post('/add-product', isAdmin, (req, res) => {
  const { name, price } = req.body;
  // Logic to save in DB
  res.json({ message: `Product ${name} added.` });
});

module.exports = router;
