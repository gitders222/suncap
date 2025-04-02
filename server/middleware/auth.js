const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware
 * Verifies the JWT token and adds the user to the request object
 */
exports.isAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Ingen token, tilgang avvist' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Ugyldig token' });
    }
    
    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Brukerkonto er deaktivert' });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token er ugyldig eller utløpt' });
  }
};

/**
 * Admin middleware
 * Checks if the user is an admin
 * Must be used after isAuth middleware
 */
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Kun tilgang for administratorer' });
  }
};