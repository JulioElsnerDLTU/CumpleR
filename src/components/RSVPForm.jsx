import React, { useState } from 'react';
import './RSVPForm.css';

export default function RSVPForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName })
      });
      
      if (!response.ok) {
        throw new Error('Fallback to local');
      }
      
      setStatus('success');
      setFirstName('');
      setLastName('');
    } catch (err) {
      console.error('No se pudo enviar la confirmación.', err);
      setStatus('error');
      setErrorMessage('Hubo un problema al enviar tu confirmación.');
    }
  };

  return (
    <section className="rsvp-section text-center animate-fade-in delay-300">
      <div className="rsvp-card">
        <h2 className="rsvp-title">Confirma tu Asistencia</h2>
        <p className="rsvp-description">Por favor, ingresa tus datos para agregarte a la lista de invitados.</p>
        
        {status === 'success' ? (
          <div className="rsvp-success">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <h3>¡Gracias por confirmar!</h3>
            <p>Te esperamos en la celebración.</p>
            <button className="btn btn-outline mt-4" onClick={() => setStatus('idle')}>Confirmar otro invitado</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">Nombre</label>
              <input 
                type="text" 
                id="firstName" 
                className="input-field" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Ej. Juan"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">Apellido</label>
              <input 
                type="text" 
                id="lastName" 
                className="input-field" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Ej. Pérez"
              />
            </div>
            
            {status === 'error' && (
              <p className="rsvp-error">{errorMessage}</p>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary rsvp-submit" 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Sí, asistiré'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
