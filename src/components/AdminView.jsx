import React, { useState, useEffect } from 'react';
import './AdminView.css';

export default function AdminView({ onBack }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/attendees', {
        headers: {
          'Authorization': `Bearer ${pin}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('PIN incorrecto');
        }

        throw new Error('No se pudo cargar la lista de invitados');
      }

      const data = await response.json();
      setAttendees(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('No se pudo iniciar sesión en admin.', err);
      setError(err.message || 'No se pudo cargar la lista de invitados');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (attendeeId) => {
    if (!window.confirm('¿Seguro que deseas eliminar este invitado?')) return;

    try {
      const response = await fetch('/api/attendees', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${pin}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attendeeId })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado');
        }

        throw new Error('No se pudo eliminar el invitado');
      }

      setAttendees(attendees.filter(att => att.id !== attendeeId));
    } catch (err) {
      console.error('No se pudo eliminar el invitado.', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container animate-fade-in">
        <button onClick={onBack} className="btn-back">← Volver</button>
        <div className="admin-login glass">
          <h2>Acceso Administrador</h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="input-group">
              <label htmlFor="pin" className="input-label">PIN Secreto</label>
              <input
                type="password"
                id="pin"
                className="input-field text-center"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                maxLength={6}
                placeholder="••••"
              />
            </div>
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container animate-fade-in">
      <button onClick={onBack} className="btn-back">← Volver e invitar más</button>
      <div className="admin-dashboard">
        <h2>Lista de Asistentes</h2>
        <div className="hero-divider" style={{ margin: '1rem 0 2rem 0' }}></div>

        <div className="attendees-stats">
          Total Confirmados: <strong>{attendees.length}</strong>
        </div>

        {attendees.length === 0 ? (
          <p className="no-attendees">Aún no hay confirmaciones.</p>
        ) : (
          <ul className="attendees-list">
            {attendees.map((att, index) => (
              <li key={att.id || index} className="attendee-item">
                <div className="attendee-info">
                  <span className="attendee-name">{att.firstName} {att.lastName}</span>
                  <span className="attendee-date">{new Date(att.timestamp).toLocaleString()}</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(att.id)}
                  title="Eliminar invitado"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
