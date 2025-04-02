import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import '../styles/components/cart.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(item._id, newQuantity);
  };
  
  const handleRemove = () => {
    removeFromCart(item._id);
  };
  
  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="cart-item-image" 
        />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.name}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <label htmlFor={`quantity-${item._id}`} className="sr-only">Antall</label>
        <select 
          id={`quantity-${item._id}`}
          value={item.quantity} 
          onChange={handleQuantityChange}
          className="quantity-select"
        >
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      
      <div className="cart-item-subtotal">
        {formatPrice(item.price * item.quantity)}
      </div>
      
      <button 
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label={`Fjern ${item.name} fra handlekurven`}
      >
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
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default CartItem;