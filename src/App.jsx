import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/LoginRegistro/Login";
import Registro from "./components/LoginRegistro/Registro";
import RecuperarPassword from "./components/LoginRegistro/RecuperarPassword";
import ResetPassword from "./components/LoginRegistro/ResetPassword";
import Dashboard from "./components/main/Dashboard";
import SolicitarTurno from './components/main/SolicitarTurno';
import TurnosSolicitados from './components/main/TurnosSolicitados';
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protegidas */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/turnos-solicitados" element={<PrivateRoute element={<TurnosSolicitados />} />} />
        <Route path="/cancelar-turno" element={<PrivateRoute element={<div>Cancelar Turno</div>} />} />
<Route path="/solicitar-turno" element={<PrivateRoute element={<SolicitarTurno />} />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

