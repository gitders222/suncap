import api from './api';

/**
 * Get all products
 * 
 * @param {Object} params - Optional query parameters (category, limit, sort, etc.)
 * @returns {Promise<Array>} - List of products
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get a product by ID
 * 
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Product details
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Get products by category
 * 
 * @param {string} category - Category name
 * @returns {Promise<Array>} - List of products in category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get('/products', { 
      params: { category } 
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};

/**
 * Search products
 * 
 * @param {string} query - Search query
 * @returns {Promise<Array>} - List of matching products
 */
export const searchProducts = async (query) => {
  try {
    const response = await api.get('/products/search', { 
      params: { q: query } 
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    throw error;
  }
};

/**
 * Get featured products
 * 
 * @param {number} limit - Number of products to return
 * @returns {Promise<Array>} - List of featured products
 */
export const getFeaturedProducts = async (limit = 4) => {
  try {
    const response = await api.get('/products/featured', { 
      params: { limit } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

/**
 * Get related products
 * 
 * @param {string} productId - Product ID to find related items for
 * @param {number} limit - Number of products to return
 * @returns {Promise<Array>} - List of related products
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  try {
    const response = await api.get(`/products/${productId}/related`, { 
      params: { limit } 
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching related products for ${productId}:`, error);
    throw error;
  }
};