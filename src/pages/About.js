import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/about.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Om Oss</h1>
          <p className="page-subtitle">
            Lær mer om Nordisk Butikk og vår historie
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <div className="about-text">
              <h2>Vår Historie</h2>
              <p>
                Nordisk Butikk ble grunnlagt i 2020 med en enkel visjon: å skape en online handleopplevelse som 
                kombinerer det beste fra norsk design og tradisjon med moderne teknologi.
              </p>
              <p>
                Vi startet som en liten familiebedrift med fokus på håndverksprodukter fra norske produsenter. 
                I dag har vi vokst til å bli en av Norges ledende nettbutikker for kvalitetsprodukter 
                med skandinavisk design og særpreg.
              </p>
              <p>
                Gjennom hele vår reise har vi holdt fast ved våre kjerneverdier: kvalitet, bærekraft og 
                kundetilfredshet. Vi tror på å tilby produkter som varer lenge og er produsert på en 
                ansvarlig måte.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder" aria-label="Bilde av vårt team"></div>
            </div>
          </div>
          
          <div className="about-section reverse">
            <div className="about-text">
              <h2>Våre Verdier</h2>
              <p>
                <strong>Kvalitet:</strong> Vi velger hver eneste produkt med omhu og sørger for at det oppfyller 
                våre strenge krav til kvalitet og holdbarhet.
              </p>
              <p>
                <strong>Bærekraft:</strong> Vi jobber aktivt for å redusere vårt miljøavtrykk gjennom 
                ansvarlig innkjøp, minimal emballasje og karbonnøytral frakt.
              </p>
              <p>
                <strong>Kundeservice:</strong> Vi er stolte av vår raske og personlige kundeservice. 
                Din tilfredshet er vår høyeste prioritet.
              </p>
              <p>
                <strong>Lokal støtte:</strong> Vi samarbeider hovedsakelig med norske og skandinaviske 
                produsenter for å støtte lokalt håndverk og næringsliv.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder" aria-label="Bilde av vår butikk"></div>
            </div>
          </div>
          
          <div className="team-section">
            <h2>Møt Teamet</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Anders Johansen</h3>
                <p className="member-title">Daglig Leder</p>
                <p className="member-bio">
                  Anders har over 15 års erfaring fra retail og e-handel.
                </p>
              </div>
              
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Marte Pedersen</h3>
                <p className="member-title">Produktsjef</p>
                <p className="member-bio">
                  Marte har en lidenskap for norsk design og kvalitetsprodukter.
                </p>
              </div>
              
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Erik Larsen</h3>
                <p className="member-title">Teknisk Leder</p>
                <p className="member-bio">
                  Erik sørger for at nettbutikken alltid fungerer optimalt.
                </p>
              </div>
              
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Sofie Berg</h3>
                <p className="member-title">Kundeservicesjef</p>
                <p className="member-bio">
                  Sofie og hennes team er alltid klare til å hjelpe våre kunder.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h2>Bli en del av vår historie</h2>
          <p>
            Vi er alltid på utkikk etter nye produkter og samarbeidspartnere som deler våre verdier.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              Kontakt oss
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

export default About;