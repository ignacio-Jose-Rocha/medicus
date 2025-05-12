import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendclinica-h33k.onrender.com/api/pacientes/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nombre", response.data.paciente.nombre);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el login:", error);
      alert(error.response?.data?.error || "Error al iniciar sesión.");
    }
  };

  return (
    <div style={styles.fullScreen}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Iniciar sesión</button>

        <button
          type="button"
          onClick={() => navigate("/recuperar-password")}
          style={styles.forgotButton}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <button
          type="button"
          onClick={() => navigate("/registro")}
          style={styles.linkButton}
        >
          Regresar a registrarse
        </button>
      </form>
    </div>
  );
};

const styles = {
  fullScreen: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f4f7",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginBottom: "10px",
  },
  forgotButton: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "10px",
    textDecoration: "underline",
  },
  linkButton: {
    padding: "10px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default Login;

