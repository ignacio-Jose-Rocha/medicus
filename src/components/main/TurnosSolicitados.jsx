import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Agregado

const TurnosSolicitados = () => {
  const [turnos, setTurnos] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // ✅ Agregado

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
      <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
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

