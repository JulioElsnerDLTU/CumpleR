import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-subtitle">Estás invitado al</h2>
        <h1 className="hero-title">Cumpleaños de<br/>Rubén Matto</h1>
        <div className="hero-divider"></div>
        <p className="hero-date">18 de Julio • Únete a la celebración</p>
      </div>
    </section>
  );
}
