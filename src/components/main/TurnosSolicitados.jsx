import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TurnosSolicitados = () => {
  const [turnos, setTurnos] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTurnos = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        'https://backendclinica-h33k.onrender.com/api/turnos/mis-turnos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const turnosActivos = response.data.filter(
        (turno) => turno.estado !== 'cancelado'
      );

      setTurnos(turnosActivos);
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const cancelarTurno = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que querés cancelar este turno?');
    if (!confirmar) return;

    try {
      await axios.put(
        `https://backendclinica-h33k.onrender.com/api/turnos/cancelar/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTurnos();
    } catch (error) {
      console.error('Error al cancelar el turno:', error);
      alert('No se pudo cancelar el turno');
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => window.location.href = '/dashboard'}>
        ← Volver al Dashboard
      </button>
      <h2 style={styles.title}>Mis Turnos Activos</h2>
      {turnos.length === 0 ? (
        <p style={styles.noTurnos}>No tenés turnos activos.</p>
      ) : (
        <div style={styles.turnoList}>
          {turnos.map((turno) => (
            <div key={turno.id} style={styles.card}>
              <p><strong>Motivo:</strong> {turno.motivo}</p>
              <p><strong>Fecha:</strong> {new Date(turno.fecha_hora).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {new Date(turno.fecha_hora).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
              {turno.pdf_url && (
                <p>
                  <strong>Estudio:</strong>{' '}
                  <a href={turno.pdf_url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    Ver PDF
                  </a>
                </p>
              )}
              <button
                style={styles.cancelButton}
                onClick={() => cancelarTurno(turno.id)}
              >
                Cancelar turno
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '0 auto',
    color: '#212529',
  },
  backButton: {
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  title: {
    textAlign: 'center',
    color: '#212529',
    marginBottom: '30px',
  },
  noTurnos: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6c757d',
  },
  turnoList: {
    display: 'grid',
    gridTemplateColumns: '1fr', // cada turno ocupa todo el ancho disponible
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    color: '#212529',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginTop: '15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};


export default TurnosSolicitados;

