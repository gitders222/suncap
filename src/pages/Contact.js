import React, { useState } from 'react';
import '../styles/pages/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Navn er påkrevd';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-post er påkrevd';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'E-postadressen er ugyldig';
    }
    
    if (formData.phone && !/^(\+47|0047|47)?[2-9]\d{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Telefonnummer er ugyldig';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Emne er påkrevd';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Melding er påkrevd';
    } else if (formData.message.length < 10) {
      errors.message = 'Meldingen må være minst 10 tegn';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setFormSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Kontakt Oss</h1>
          <p className="page-subtitle">
            Vi er her for å hjelpe deg med alle spørsmål
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="info-content">
                <h3>Adresse</h3>
                <p>Storgata 1</p>
                <p>0155 Oslo, Norge</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="info-content">
                <h3>Telefon</h3>
                <p>+47 22 33 44 55</p>
                <p className="info-subtitle">Man-Fre: 09:00-16:00</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="info-content">
                <h3>E-post</h3>
                <p>post@nordiskbutikk.no</p>
                <p className="info-subtitle">Vi svarer innen 24 timer</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formSubmitted ? (
              <div className="form-success">
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
                <h2>Takk for din henvendelse!</h2>
                <p>
                  Vi har mottatt din melding og vil ta kontakt med deg så snart som mulig.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send en ny melding
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send oss en melding</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Navn *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${formErrors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-post *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${formErrors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${formErrors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Emne *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${formErrors.subject ? 'error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {formErrors.subject && <p className="error-message">{formErrors.subject}</p>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Melding *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-control ${formErrors.message ? 'error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner"></span>
                      Sender...
                    </>
                  ) : 'Send melding'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="map-container">
          <div className="map-placeholder">
            <p>Kart over vår lokasjon vil vises her</p>
          </div>
        </div>
        
        <div className="faq-section">
          <h2>Vanlige spørsmål</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Hvor lang er leveringstiden?</h3>
              <p>
                Vanligvis sender vi alle bestillinger innen 24 timer, og leveringstiden er 2-4 virkedager 
                innenfor Norge.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Hvordan kan jeg returnere et produkt?</h3>
              <p>
                Du har 14 dagers angrerett. Kontakt vår kundeservice for å starte returprosessen, og 
                vi vil guide deg gjennom trinnene.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Hvilke betalingsmetoder aksepterer dere?</h3>
              <p>
                Vi aksepterer Vipps og alle større norske banker for rask og sikker betaling.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Kan jeg endre eller kansellere min bestilling?</h3>
              <p>
                Ja, hvis bestillingen ikke er sendt ennå. Kontakt oss så snart som mulig for å gjøre endringer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;