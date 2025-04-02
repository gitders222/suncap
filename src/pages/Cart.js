import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import '../styles/pages/cart.css';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Din Handlekurv</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="empty-cart-icon"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2 className="empty-cart-title">Handlekurven din er tom</h2>
            <p className="empty-cart-text">
              Du har ikke lagt til noen produkter i handlekurven ennå.
            </p>
            <Link to="/products" className="btn btn-primary">
              Se våre produkter
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              <div className="cart-header">
                <div className="cart-header-product">Produkt</div>
                <div className="cart-header-price">Pris</div>
                <div className="cart-header-quantity">Antall</div>
                <div className="cart-header-subtotal">Sum</div>
                <div className="cart-header-remove"></div>
              </div>
              
              <div className="cart-items">
                {cartItems.map(item => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
              
              <div className="cart-actions">
                <button 
                  className="btn btn-outline clear-cart-btn"
                  onClick={clearCart}
                >
                  Tøm handlekurv
                </button>
                
                <Link to="/products" className="continue-shopping-link">
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
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Fortsett å handle
                </Link>
              </div>
            </div>
            
            <div className="cart-summary">
              <h2 className="summary-title">Ordresammendrag</h2>
              
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Frakt:</span>
                <span className="summary-value">
                  {cartTotal >= 1000 ? 'Gratis' : formatPrice(99)}
                </span>
              </div>
              
              <div className="summary-row total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">
                  {formatPrice(cartTotal >= 1000 ? cartTotal : cartTotal + 99)}
                </span>
              </div>
              
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Gå til kassen
              </Link>
              
              <div className="payment-methods-icons">
                <img 
                  src="/images/icons/vipps-logo.svg" 
                  alt="Vipps" 
                  className="payment-icon"
                />
                <img 
                  src="/images/icons/bank-logo.svg" 
                  alt="Nettbank" 
                  className="payment-icon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;