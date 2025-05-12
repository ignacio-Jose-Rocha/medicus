import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombre');
  const token = localStorage.getItem('token');

  const handleTurnosSolicitados = () => {
    navigate('/turnos-solicitados');
  };

  const handleSolicitarTurno = () => {
    navigate('/solicitar-turno');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  return (
    <div style={styles.page}>
      {token && (
        <header style={styles.header}>
          <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Cerrar sesión
            </button>
          </nav>
        </header>
      )}
      <div style={styles.container}>
        <h2 style={styles.title}>
          Bienvenido{nombreUsuario ? `, ${nombreUsuario}` : ''}
        </h2>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handleTurnosSolicitados}>
            Turnos Solicitados
          </button>
          <button style={styles.button} onClick={handleSolicitarTurno}>
            Solicitar Turno
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '800px',
    margin: '0 auto',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  logoutButton: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '24px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    minWidth: '180px',
  },
};

export default Dashboard;

