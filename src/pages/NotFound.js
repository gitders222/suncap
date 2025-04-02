import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">404</div>
          <h1>Siden ble ikke funnet</h1>
          <p>Beklager, men siden du leter etter eksisterer ikke.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Gå til forsiden
            </Link>
            <Link to="/products" className="btn btn-outline">
              Se våre produkter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;