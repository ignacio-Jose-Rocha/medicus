import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    telefono: "",
    direccion: "",
    localidad: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backendclinica-h33k.onrender.com/api/pacientes",
        formData
      );
      alert("Registro exitoso");
      setFormData({
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        telefono: "",
        direccion: "",
        localidad: "",
        password: "",
      });
    } catch (error) {
      alert(
        "Error al registrarse: " +
          (error.response?.data?.msg || "intente nuevamente")
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Registro</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <input
              style={styles.input}
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="localidad"
              placeholder="Localidad"
              value={formData.localidad}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div style={styles.buttonsContainer}>
            <button style={styles.submitButton} type="submit">
              Registrarse
            </button>
            <button
              type="button"
              style={styles.backButton}
              onClick={() => navigate("/login")}
            >
              Regresar a login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    marginTop: "20px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  backButton: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Registro;

