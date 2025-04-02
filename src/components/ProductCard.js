import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import '../styles/components/product.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product._id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-image" 
          />
        </Link>
      </div>
      
      <div className="product-info">
        <Link to={`/products/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        
        <p className="product-price">{formatPrice(product.price)}</p>
        
        <button 
          className="btn btn-primary add-to-cart-btn" 
          onClick={handleAddToCart}
        >
          Legg i handlekurv
        </button>
      </div>
    </div>
  );
};

export default ProductCard;