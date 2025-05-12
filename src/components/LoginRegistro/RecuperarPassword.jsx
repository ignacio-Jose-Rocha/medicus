import React, { useState } from "react";
import axios from "axios";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backendclinica-h33k.onrender.com/api/pacientes/recuperar-password",
        { email }
      );
      alert("Te hemos enviado un enlace para recuperar tu contraseña");
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar el enlace. Verificá el correo ingresado.");
    }
  };

  return (
    <div style={styles.fullScreen}>
      <form onSubmit={handleRecuperar} style={styles.form}>
        <h2 style={styles.title}>Recuperar Contraseña</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Recuperar</button>

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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RecuperarPassword;

