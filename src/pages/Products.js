import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import '../styles/pages/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Det oppstod en feil ved henting av produkter.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, []);
  
  // For demo purposes, let's add some mock categories
  const categories = [
    { id: 'all', name: 'Alle produkter' },
    { id: 'clothing', name: 'Klær' },
    { id: 'footwear', name: 'Sko' },
    { id: 'accessories', name: 'Tilbehør' }
  ];
  
  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.category === filter);
  
  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="page-title">Våre Produkter</h1>
          
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Laster produkter...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Prøv igjen
            </button>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>Ingen produkter funnet.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;