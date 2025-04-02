import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getProductById, getRelatedProducts } from '../services/productService';
import { formatPrice } from '../utils/formatters';
import ProductCard from '../components/ProductCard';
import '../styles/pages/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Reset state when navigating between products
        setProduct(null);
        setRelatedProducts([]);
        setQuantity(1);
        setActiveImage(0);
        
        // Fetch product details
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Fetch related products
        const relatedData = await getRelatedProducts(id);
        setRelatedProducts(relatedData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Det oppstod en feil ved henting av produktinformasjon.');
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      });
      
      // Reset quantity after adding to cart
      setQuantity(1);
      
      // Show feedback to user
      alert(`${product.name} er lagt til i handlekurven!`);
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Laster produkt...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Feil</h2>
        <p>{error}</p>
        <Link to="/products" className="btn btn-primary">
          Tilbake til produkter
        </Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="error-container">
        <h2>Produktet ble ikke funnet</h2>
        <p>Vi kunne ikke finne produktet du leter etter.</p>
        <Link to="/products" className="btn btn-primary">
          Se alle produkter
        </Link>
      </div>
    );
  }
  
  // Calculate current price considering any discount
  const currentPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
    
  // Combine main image with additional images for gallery
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Hjem</Link> / <Link to="/products">Produkter</Link> / <span>{product.name}</span>
        </div>
        
        <div className="product-detail">
          <div className="product-gallery">
            <div className="main-image-container">
              <img 
                src={allImages[activeImage]} 
                alt={product.name} 
                className="product-main-image" 
              />
              {product.discount > 0 && (
                <div className="discount-badge">
                  {product.discount}% RABATT
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="product-thumbnails">
                {allImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${product.name} - bilde ${index + 1}`}
                    className={`product-thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-price-container">
              {product.discount > 0 ? (
                <>
                  <span className="product-original-price">{formatPrice(product.price)}</span>
                  <span className="product-detail-price">{formatPrice(currentPrice)}</span>
                </>
              ) : (
                <span className="product-detail-price">{formatPrice(product.price)}</span>
              )}
            </div>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            
            {product.features && product.features.length > 0 && (
              <div className="product-features">
                <h3>Egenskaper</h3>
                <ul className="feature-list">
                  {product.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="stock-status">
              <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? 'På lager' : 'Ikke på lager'}
              </span>
              {product.stock > 0 && (
                <span className="stock-count">
                  {product.stock} {product.stock === 1 ? 'stk' : 'stk'} tilgjengelig
                </span>
              )}
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <span className="quantity-label">Antall:</span>
                <div className="quantity-input">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="quantity-value" 
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="btn btn-primary add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? 'Legg i handlekurv' : 'Ikke tilgjengelig'}
              </button>
              
              <p className="shipping-info">
                {currentPrice >= 1000 ? (
                  <span className="free-shipping">Gratis frakt!</span>
                ) : (
                  <span>Frakt: {formatPrice(99)}</span>
                )}
              </p>
            </div>
            
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="product-specifications">
                <h3>Spesifikasjoner</h3>
                <div className="specifications-list">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="specification-item">
                      <span className="specification-name">{key}:</span>
                      <span className="specification-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Relaterte produkter</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;