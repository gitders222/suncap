import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PaymentMethod from '../components/PaymentMethod';
import { formatPrice } from '../utils/formatters';
import { initiateVippsPayment, initiateBankPayment } from '../services/paymentService';
import '../styles/pages/checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('vipps');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: ''
  });
  
  // Redirect to products if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
  };
  
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode', 'city'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError('Vennligst fyll ut alle påkrevde felt.');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Vennligst oppgi en gyldig e-postadresse.');
      return false;
    }
    
    // Simple Norwegian phone number validation
    const phoneRegex = /^(\+47|0047|47)?[2-9]\d{7}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Vennligst oppgi et gyldig norsk telefonnummer.');
      return false;
    }
    
    // Simple Norwegian postal code validation
    const postalCodeRegex = /^\d{4}$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      setError('Vennligst oppgi et gyldig postnummer (4 siffer).');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleProceedToPayment = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const orderData = {
        customer: formData,
        items: cartItems,
        total: cartTotal,
        shippingCost: cartTotal >= 1000 ? 0 : 99,
        totalWithShipping: cartTotal >= 1000 ? cartTotal : cartTotal + 99
      };
      
      let paymentResponse;
      
      if (paymentMethod === 'vipps') {
        paymentResponse = await initiateVippsPayment(orderData);
        
        // Redirect to Vipps payment page
        window.location.href = paymentResponse.redirectUrl;
      } else {
        paymentResponse = await initiateBankPayment(orderData);
        
        // Redirect to bank payment page
        window.location.href = paymentResponse.redirectUrl;
      }
      
      // Clear cart after successful order creation
      clearCart();
      
    } catch (err) {
      setError('Det oppstod en feil under behandling av betalingen. Vennligst prøv igjen.');
      console.error('Payment error:', err);
      setLoading(false);
    }
  };
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Kasse</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        <div className="checkout-content">
          <div className="customer-info">
            <h2 className="section-title">Dine opplysninger</h2>
            
            <form className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">Fornavn *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Etternavn *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-post *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Telefonnummer *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">Adresse *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postalCode" className="form-label">Postnummer *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="form-control"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    maxLength="4"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city" className="form-label">Sted *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2 className="section-title">Din bestilling</h2>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item._id} className="order-item">
                    <div className="order-item-info">
                      <p className="order-item-name">
                        {item.name} <span className="order-item-quantity">x{item.quantity}</span>
                      </p>
                    </div>
                    <div className="order-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="order-total-row">
                  <span>Frakt:</span>
                  <span>
                    {cartTotal >= 1000 ? 'Gratis' : formatPrice(99)}
                  </span>
                </div>
                
                <div className="order-total-row grand-total">
                  <span>Total:</span>
                  <span>
                    {formatPrice(cartTotal >= 1000 ? cartTotal : cartTotal + 99)}
                  </span>
                </div>
              </div>
            </div>
            
            <PaymentMethod 
              onSelectPayment={handleSelectPayment}
              onProceedToPayment={handleProceedToPayment}
            />
            
            <div className="payment-button-container">
              <button 
                className={`btn ${paymentMethod === 'vipps' ? 'btn-vipps' : 'btn-bank'} checkout-btn`}
                onClick={handleProceedToPayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Behandler...
                  </>
                ) : paymentMethod === 'vipps' ? (
                  'Betal med Vipps'
                ) : (
                  'Fortsett til nettbank'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;