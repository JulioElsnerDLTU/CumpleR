import React from 'react';
import './LocationMap.css';

export default function LocationMap() {
  const gmapsLink = "https://maps.app.goo.gl/NrPvQUsk37zz1CzY6?g_st=iw";
  const wazeLink = "https://waze.com/ul?ll=-12.1687471,-76.8452940&navigate=yes"; 
  
  // Mapa incrustado con el pin exacto usando las coordenadas de la redirección
  const mapEmbedUrl = "https://maps.google.com/maps?q=-12.1687471,-76.8452940&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="location-section text-center animate-fade-in delay-400">
      <h2 className="location-title">Ubicación</h2>
      <div className="hero-divider"></div>
      <p className="location-description">
        Elige tu aplicación favorita para llegar fácilmente al lugar.
      </p>
      
      <div className="map-container">
        <iframe 
          src={mapEmbedUrl} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Ubicación"
        ></iframe>
      </div>
      
      <div className="location-actions">
        <a href={gmapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary location-btn">
          <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Google Maps
        </a>
        <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline location-btn">
          <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          Waze
        </a>
      </div>
    </section>
  );
}
