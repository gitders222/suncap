import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              Nordisk<span>Butikk</span>
            </div>
            <p className="footer-description">
              Norsk nettbutikk med fokus på kvalitet og bærekraft. Vi tilbyr enkle og trygge betalingsløsninger med Vipps og norske banker.
            </p>
            <div className="payment-methods">
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
          
          <div className="footer-column">
            <h3 className="footer-title">Kundeservice</h3>
            <ul className="footer-links">
              <li>
                <Link to="/kontakt">Kontakt oss</Link>
              </li>
              <li>
                <Link to="/faq">Spørsmål og svar</Link>
              </li>
              <li>
                <Link to="/frakt">Frakt og levering</Link>
              </li>
              <li>
                <Link to="/retur">Retur og bytte</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Om oss</h3>
            <ul className="footer-links">
              <li>
                <Link to="/om-oss">Vår historie</Link>
              </li>
              <li>
                <Link to="/vilkar">Vilkår</Link>
              </li>
              <li>
                <Link to="/personvern">Personvern</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Kontakt oss</h3>
            <ul className="contact-info">
              <li>
                <span className="contact-icon">📍</span> 
                Storgata 1, 0155 Oslo
              </li>
              <li>
                <span className="contact-icon">📞</span> 
                +47 22 33 44 55
              </li>
              <li>
                <span className="contact-icon">✉️</span> 
                post@nordiskbutikk.no
              </li>
              <li>
                <span className="contact-icon">⏰</span> 
                Man-Fre: 09:00-16:00
              </li>
            </ul>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Nordisk Butikk. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;