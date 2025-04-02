import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../services/productService';
import '../styles/pages/home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts(4);
        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setLoading(false);
      }
    };
    
    loadFeaturedProducts();
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Velkommen til Nordisk Butikk</h1>
            <p className="hero-subtitle">
              Norsk nettbutikk med fokus på kvalitet og design. Enkel og trygg betaling med Vipps og norske banker.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                Se våre produkter
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Utvalgte produkter</h2>
            <Link to="/products" className="view-all-link">
              Se alle produkter
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
          {loading ? (
            <div className="loading-spinner-container">
              <div className="spinner"></div>
              <p>Laster produkter...</p>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Rask levering</h3>
              <p className="benefit-description">
                Vi sender din bestilling innen 24 timer og du mottar varene innen 2-4 virkedager.
              </p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <h3 className="benefit-title">Trygg betaling</h3>
              <p className="benefit-description">
                Betal enkelt og trygt med Vipps eller din norske nettbank.
              </p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="benefit-title">Norsk kvalitet</h3>
              <p className="benefit-description">
                Vi er stolte av å tilby produkter av høy kvalitet fra norske og skandinaviske produsenter.
              </p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
              <h3 className="benefit-title">Fri frakt over 1000 kr</h3>
              <p className="benefit-description">
                Vi tilbyr fri frakt på alle bestillinger over 1000 kr. Bestill i dag!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Få vårt nyhetsbrev</h2>
            <p className="newsletter-description">
              Meld deg på vårt nyhetsbrev for å motta eksklusive tilbud, nyheter og oppdateringer.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Din e-postadresse" 
                required 
              />
              <button type="submit" className="btn btn-primary">
                Meld meg på
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;