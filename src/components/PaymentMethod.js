import React, { useState } from 'react';
import '../styles/components/payment.css';

const PaymentMethod = ({ onSelectPayment, onProceedToPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState('vipps');
  
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    onSelectPayment(method);
  };
  
  return (
    <div className="payment-methods">
      <h3 className="payment-title">Velg betalingsmetode</h3>
      
      <div className="payment-options">
        <div 
          className={`payment-option ${selectedMethod === 'vipps' ? 'selected' : ''}`}
          onClick={() => handleMethodSelect('vipps')}
        >
          <div className="payment-option-icon vipps-icon">
            <img 
              src="/images/icons/vipps-logo.svg" 
              alt="Vipps" 
              className="payment-icon"
            />
          </div>
          <div className="payment-option-info">
            <h4 className="payment-option-title">Vipps</h4>
            <p className="payment-option-description">
              Betal enkelt med Vipps på mobilen
            </p>
          </div>
        </div>
        
        <div 
          className={`payment-option ${selectedMethod === 'bank' ? 'selected' : ''}`}
          onClick={() => handleMethodSelect('bank')}
        >
          <div className="payment-option-icon bank-icon">
            <img 
              src="/images/icons/bank-logo.svg" 
              alt="Nettbank" 
              className="payment-icon"
            />
          </div>
          <div className="payment-option-info">
            <h4 className="payment-option-title">Nettbank</h4>
            <p className="payment-option-description">
              Betal med din norske nettbank
            </p>
          </div>
        </div>
      </div>
      
      <button 
        className={`btn ${selectedMethod === 'vipps' ? 'btn-vipps' : 'btn-bank'}`}
        onClick={() => onProceedToPayment(selectedMethod)}
      >
        {selectedMethod === 'vipps' 
          ? 'Betal med Vipps' 
          : 'Fortsett til nettbank'
        }
      </button>
      
      <div className="payment-security-info">
        <div className="security-icon">
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <p className="security-text">
          Sikker betaling med SSL-kryptering
        </p>
      </div>
    </div>
  );
};

export default PaymentMethod;