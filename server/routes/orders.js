const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { isAuth, isAdmin } = require('../middleware/auth');

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', isAuth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    if (items.length === 0) {
      return res.status(400).json({ message: 'Ingen varer i bestillingen' });
    }
    
    // Get full product details and calculate prices
    const itemsWithDetails = [];
    let total = 0;
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Produkt ikke funnet: ${item.productId}` 
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Ikke nok på lager av ${product.name}`
        });
      }
      
      // Calculate price considering any discounts
      const price = product.discount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      
      itemsWithDetails.push({
        product: product._id,
        name: product.name,
        price,
        quantity: item.quantity
      });
      
      total += price * item.quantity;
    }
    
    // Calculate shipping cost
    const shippingCost = total >= 1000 ? 0 : 99;
    const totalWithShipping = total + shippingCost;
    
    // Create order
    const order = new Order({
      user: req.user._id,
      customer: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone || '',
        address: shippingAddress.street || req.user.address?.street || '',
        postalCode: shippingAddress.postalCode || req.user.address?.postalCode || '',
        city: shippingAddress.city || req.user.address?.city || ''
      },
      items: itemsWithDetails,
      total,
      shippingCost,
      totalAmount: totalWithShipping,
      paymentMethod,
      status: 'pending'
    });
    
    const savedOrder = await order.save();
    
    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    res.status(201).json({
      orderId: savedOrder._id,
      status: savedOrder.status,
      total: savedOrder.totalAmount
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Serverfeil ved opprettelse av bestilling' });
  }
});

/**
 * @route   GET /api/orders/myorders
 * @desc    Get logged in user's orders
 * @access  Private
 */
router.get('/myorders', isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Serverfeil ved henting av dine bestillinger' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Bestilling ikke funnet' });
    }
    
    // Check if the order belongs to the logged in user or if admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Ikke tilgang til denne bestillingen' });
    }
    
    res.json(order);
  } catch (err) {
    console.error(`Error fetching order ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved henting av bestilling' });
  }
});

/**
 * @route   PUT /api/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
router.put('/:id/cancel', isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Bestilling ikke funnet' });
    }
    
    // Check if the order belongs to the logged in user or if admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Ikke tilgang til denne bestillingen' });
    }
    
    // Check if the order can be cancelled
    if (order.status !== 'pending' && order.status !== 'processing') {
      return res.status(400).json({ 
        message: 'Kan ikke kansellere en bestilling som allerede er sendt eller levert' 
      });
    }
    
    // Update order status
    order.status = 'cancelled';
    await order.save();
    
    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }
    
    res.json({ message: 'Bestillingen er kansellert' });
  } catch (err) {
    console.error(`Error cancelling order ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved kansellering av bestilling' });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (admin only)
 * @access  Private/Admin
 */
router.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    const { limit = 20, page = 1, status } = req.query;
    
    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ message: 'Serverfeil ved henting av alle bestillinger' });
  }
});

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status (admin only)
 * @access  Private/Admin
 */
router.put('/:id/status', isAuth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status er påkrevd' });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Bestilling ikke funnet' });
    }
    
    // Update order status
    order.status = status;
    
    // If status is shipped, add shipping details
    if (status === 'shipped' && req.body.shippingDetails) {
      order.shippingDetails = {
        ...order.shippingDetails,
        ...req.body.shippingDetails,
        shippedAt: new Date()
      };
    }
    
    // If status is delivered, add delivered date
    if (status === 'delivered') {
      order.shippingDetails = {
        ...order.shippingDetails,
        deliveredAt: new Date()
      };
    }
    
    await order.save();
    
    res.json({ message: 'Bestillingsstatus oppdatert' });
  } catch (err) {
    console.error(`Error updating order status ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved oppdatering av bestillingsstatus' });
  }
});

module.exports = router;