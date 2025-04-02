import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/components/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            Nordisk<span>Butikk</span>
          </Link>
          
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Hjem
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Produkter
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Om Oss
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="nav-actions">
            <Link to="/cart" className="cart-icon" aria-label="Handlekurv">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
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
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
            
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;