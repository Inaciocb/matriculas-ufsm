import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SimularMatricula from "./pages/SimularMatricula"; // Importando o arquivo de simulação de matrícula
import SimularCadastro from "./pages/SimularCadastro"; // Componente de placeholder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matricula" element={<SimularMatricula />} />
        <Route path="/cadastro" element={<SimularCadastro />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vindo ao Sistema de Simulação</h1>
      <p>Escolha uma opção abaixo:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/matricula">
          <button style={buttonStyle}>Simular Matrícula</button>
        </Link>
        <Link to="/cadastro">
          <button style={buttonStyle}>Simular Cadastro de Turmas</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "15px 30px",
  fontSize: "18px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default App;
