import React, { useState } from 'react';
import Hero from './components/Hero';
import RSVPForm from './components/RSVPForm';
import LocationMap from './components/LocationMap';
import AdminView from './components/AdminView';
import './App.css';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  // Secret entry: Double click on the copyright year
  const handleSecretDoubleClick = () => {
    setIsAdminView(true);
  };

  if (isAdminView) {
    return <AdminView onBack={() => setIsAdminView(false)} />;
  }

  return (
    <div className="app-background">
      <div className="letter-wrapper animate-fade-in">
        <div className="letter-card glass">
          <Hero />
          
          <div style={{ padding: '0 1rem' }}>
            <RSVPForm />
            <LocationMap />
          </div>
          
          <footer style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
            <p>
              &copy; <span onDoubleClick={handleSecretDoubleClick} style={{ cursor: 'text' }}>2026</span> Invitación Rubén Matto. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
