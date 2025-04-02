const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20, page = 1, sort = 'createdAt', order = 'desc' } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (featured) {
      query.featured = featured === 'true';
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Serverfeil ved henting av produkter' });
  }
});

/**
 * @route   GET /api/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get('/featured', async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    
    const products = await Product.find({ featured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(products);
  } catch (err) {
    console.error('Error fetching featured products:', err);
    res.status(500).json({ message: 'Serverfeil ved henting av utvalgte produkter' });
  }
});

/**
 * @route   GET /api/products/search
 * @desc    Search products
 * @access  Public
 */
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 20, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Søkeparameter er påkrevd' });
    }
    
    // Build search query with text index
    const query = {
      $text: { $search: q },
      isActive: true
    };
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ message: 'Serverfeil ved søk av produkter' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produkt ikke funnet' });
    }
    
    res.json(product);
  } catch (err) {
    console.error(`Error fetching product ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved henting av produkt' });
  }
});

/**
 * @route   GET /api/products/:id/related
 * @desc    Get related products
 * @access  Public
 */
router.get('/:id/related', async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produkt ikke funnet' });
    }
    
    // Find products in the same category excluding the current product
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      isActive: true
    })
      .limit(parseInt(limit));
    
    res.json(relatedProducts);
  } catch (err) {
    console.error(`Error fetching related products for ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved henting av relaterte produkter' });
  }
});

/**
 * @route   POST /api/products/:id/reviews
 * @desc    Add a review to a product
 * @access  Private
 */
router.post('/:id/reviews', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Vurdering og kommentar er påkrevd' });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produkt ikke funnet' });
    }
    
    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Du har allerede anmeldt dette produktet' });
    }
    
    // Add the review
    const review = {
      user: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      rating: Number(rating),
      comment
    };
    
    product.reviews.push(review);
    
    // Calculate new average rating
    product.calculateRatings();
    
    await product.save();
    
    res.status(201).json({ message: 'Anmeldelse lagt til' });
  } catch (err) {
    console.error(`Error adding review to product ${req.params.id}:`, err);
    res.status(500).json({ message: 'Serverfeil ved lagring av anmeldelse' });
  }
});

module.exports = router;