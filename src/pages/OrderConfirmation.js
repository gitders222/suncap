import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getPaymentStatus } from '../services/paymentService';
import { formatPrice, formatDate } from '../utils/formatters';
import '../styles/pages/orderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { clearCart } = useContext(CartContext);
  
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setLoading(true);
        const data = await getPaymentStatus(orderId);
        setOrderStatus(data);
        
        // Clear cart if payment was successful
        if (data.status === 'paid') {
          clearCart();
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order status:', err);
        setError('Det oppstod en feil ved henting av ordrestatus.');
        setLoading(false);
      }
    };
    
    fetchOrderStatus();
    
    // Poll for status updates every 5 seconds if payment is pending
    const statusInterval = setInterval(async () => {
      if (orderStatus && orderStatus.status === 'pending') {
        try {
          const data = await getPaymentStatus(orderId);
          setOrderStatus(data);
          
          // Clear interval if status is no longer pending
          if (data.status !== 'pending') {
            clearInterval(statusInterval);
            
            // Clear cart if payment was successful
            if (data.status === 'paid') {
              clearCart();
            }
          }
        } catch (err) {
          console.error('Error polling order status:', err);
        }
      }
    }, 5000);
    
    // Clean up interval on unmount
    return () => clearInterval(statusInterval);
  }, [orderId, clearCart, orderStatus]);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verifiserer bestillingen...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Feil</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Gå til forsiden
        </Link>
      </div>
    );
  }
  
  if (!orderStatus) {
    return (
      <div className="error-container">
        <h2>Ordren ble ikke funnet</h2>
        <p>Vi kunne ikke finne ordren du leter etter.</p>
        <Link to="/" className="btn btn-primary">
          Gå til forsiden
        </Link>
      </div>
    );
  }
  
  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="order-confirmation-content">
          {orderStatus.status === 'paid' ? (
            <div className="success-message">
              <div className="success-icon">
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
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1>Takk for din bestilling!</h1>
              <p>Din bestilling er bekreftet og betalt.</p>
            </div>
          ) : orderStatus.status === 'pending' ? (
            <div className="pending-message">
              <div className="pending-icon">
                <div className="large-spinner"></div>
              </div>
              <h1>Betalingen behandles</h1>
              <p>Vi venter på bekreftelse fra betalingstjenesten. Dette kan ta noen minutter.</p>
            </div>
          ) : (
            <div className="failure-message">
              <div className="failure-icon">
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
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h1>Det oppsto et problem</h1>
              <p>
                {orderStatus.status === 'cancelled' 
                  ? 'Betalingen ble avbrutt.'
                  : 'Det oppsto en feil ved behandling av betalingen.'
                }
              </p>
              <Link to="/checkout" className="btn btn-primary">
                Prøv igjen
              </Link>
            </div>
          )}
          
          <div className="order-details">
            <h2>Ordredetaljer</h2>
            
            <div className="order-info-row">
              <span className="order-info-label">Ordrenummer:</span>
              <span className="order-info-value">{orderStatus.orderId}</span>
            </div>
            
            <div className="order-info-row">
              <span className="order-info-label">Dato:</span>
              <span className="order-info-value">{formatDate(orderStatus.createdAt)}</span>
            </div>
            
            <div className="order-info-row">
              <span className="order-info-label">Betalingsmetode:</span>
              <span className="order-info-value">
                {orderStatus.paymentMethod === 'vipps' ? 'Vipps' : 'Nettbank'}
              </span>
            </div>
            
            <div className="order-info-row">
              <span className="order-info-label">Status:</span>
              <span className={`order-status ${orderStatus.status}`}>
                {orderStatus.status === 'paid' ? 'Betalt' : 
                 orderStatus.status === 'pending' ? 'Venter på betaling' : 
                 orderStatus.status === 'cancelled' ? 'Avbrutt' : 'Feilet'}
              </span>
            </div>
            
            <div className="order-info-row">
              <span className="order-info-label">Total:</span>
              <span className="order-info-value order-total">{formatPrice(orderStatus.total)}</span>
            </div>
            
            {orderStatus.status === 'paid' && (
              <div className="order-confirmation-message">
                <p>
                  En bekreftelse er sendt til {orderStatus.customer.email}. 
                  Du vil motta en oppdatering når bestillingen din sendes.
                </p>
              </div>
            )}
            
            <div className="order-actions">
              <Link to="/" className="btn btn-primary">
                Fortsett å handle
              </Link>
              
              {orderStatus.status === 'paid' && (
                <button 
                  className="btn btn-outline"
                  onClick={() => window.print()}
                >
                  Skriv ut kvittering
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;