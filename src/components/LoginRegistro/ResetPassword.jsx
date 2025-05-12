import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://backendclinica-h33k.onrender.com/api/pacientes/reset-password/${token}`,
        { newPassword }
      );
      alert("Contraseña actualizada correctamente");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      alert(
        error.response?.data?.error || "No se pudo restablecer la contraseña."
      );
    }
  };

  return (
    <div style={styles.fullScreen}>
      <form onSubmit={handleResetPassword} style={styles.form}>
        <h2 style={styles.title}>Restablecer Contraseña</h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Restablecer
        </button>
        <button
          type="button"
          style={{ ...styles.button, backgroundColor: "#6c757d", marginTop: "10px" }}
          onClick={() => navigate("/login")}
        >
          Volver al Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  fullScreen: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ResetPassword;

