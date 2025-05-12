import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SolicitarTurno = () => {
  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [pdf, setPdf] = useState(null);
  const [turnosOcupados, setTurnosOcupados] = useState([]);

  const token = localStorage.getItem('token');
  const horarios = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
  const motivos = ["Clínico", "Cardiología", "Dermatología"];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurnosOcupados = async () => {
      try {
        const response = await axios.get('https://backendclinica-h33k.onrender.com/api/turnos/disponibles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const turnos = response.data.filter(t => {
          const fechaTurno = new Date(t.fecha_hora);
          const fechaStr = fechaTurno.toISOString().split('T')[0];
          const horaStr = fechaTurno.toISOString().split('T')[1].slice(0, 5);
          return fechaStr === fecha && t.motivo === motivo;
        });

        const horasOcupadas = turnos.map(t => new Date(t.fecha_hora).toISOString().split('T')[1].slice(0, 5));
        setTurnosOcupados(horasOcupadas);
      } catch (error) {
        console.error('Error al obtener los turnos ocupados:', error);
      }
    };

    if (fecha && motivo) {
      fetchTurnosOcupados();
    }
  }, [fecha, motivo, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaSeleccionada = new Date(`${fecha}T${hora}:00`);
    const dia = fechaSeleccionada.getDay(); // 0 = domingo, 6 = sábado

    if (dia === 0 || dia === 6) {
      alert("No se pueden solicitar turnos para sábados o domingos.");
      return;
    }

    const fechaHoraFormateada = fechaSeleccionada.toISOString();

    const formData = new FormData();
    formData.append('fecha_hora', fechaHoraFormateada);
    formData.append('motivo', motivo);

    if (motivo !== 'Clínico' && pdf) {
      formData.append('pdf', pdf);
    }

    try {
      await axios.post(
        'https://backendclinica-h33k.onrender.com/api/turnos/turnos',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Turno solicitado con éxito');
    } catch (err) {
      alert("Turno ya solicitado");
      console.error('Error al solicitar turno:', err.response || err);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('https://medicusclinica.vercel.app/dashboard')} style={styles.backButton}>← Volver al Dashboard</button>
      <h2 style={styles.title}>Solicitar Turno</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Motivo:</label>
        <select style={styles.input} value={motivo} onChange={(e) => setMotivo(e.target.value)} required>
          <option value="">Seleccionar</option>
          {motivos.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <label style={styles.label}>Fecha:</label>
        <input style={styles.input} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

        <label style={styles.label}>Hora:</label>
        <select style={styles.input} value={hora} onChange={(e) => setHora(e.target.value)} required>
          <option value="">Seleccionar</option>
          {horarios.map(h => (
            <option key={h} value={h} disabled={turnosOcupados.includes(h)}>
              {h} {turnosOcupados.includes(h) ? '(Ocupado)' : ''}
            </option>
          ))}
        </select>

        {motivo !== 'Clínico' && (
          <>
            <label style={styles.label}>Subir PDF:</label>
            <input style={styles.input} type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} required />
          </>
        )}

        <button type="submit" style={styles.submitButton}>Confirmar Turno</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#212529',
  },
  backButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default SolicitarTurno;

