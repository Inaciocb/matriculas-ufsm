import React, { useState } from "react";
import Header from "./components/Header/Header.js";
import Accordion from "./components/accordion/Accordion";
import WeeklySchedule from "./components/WeeklySchedule/WeeklySchedule";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./App.css";

const subjectsBySemester = {
  "5º Semestre": [
    {
      name: "Custos A",
      code: "CTB1074",
      hours: 60,
      startTime: "10:30",
      endTime: "12:30",
      days: ["Ter", "Sex"],
    },
    {
      name: "Interface Humano-Computador",
      code: "ELC1072",
      hours: 60,
      startTime: "08:30",
      endTime: "10:30",
      days: ["Ter", "Qui"],
    },
    {
      name: "Projeto e Gerência de Banco de Dados",
      code: "ELC1071",
      hours: 60,
      startTime: "08:30",
      endTime: "10:30",
      days: ["Seg", "Qua"],
    },
    {
      name: "Qualidade de Software",
      code: "ELC133",
      hours: 60,
      startTime: "10:30",
      endTime: "12:30",
      days: ["Seg", "Qua"],
    },
  ],
};

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // Controla a etapa atual
  const [matriculaSolicitada, setMatriculaSolicitada] = useState(false); // Status de matrícula

  const handleSelectionChange = (subject) => {
    setSelectedSubjects((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.code === subject.code);
      if (isSelected) {
        return prevSelected.filter((s) => s.code !== subject.code);
      } else {
        return [...prevSelected, subject];
      }
    });
  };

  const handleRemoveSubject = (subjectCode) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.filter((subject) => subject.code !== subjectCode)
    );
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Confirmação da matrícula na última etapa
      setMatriculaSolicitada(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="App">
      <Header />
      <h1 className="nomeCurso">Bacharelado em Sistemas de Informação</h1>

      {currentStep === 1 && (
        <div className="container">
          <div className="dropboxes">
            {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
              <Accordion
                key={semester}
                title={semester}
                subjects={subjects.map((s) => ({
                  ...s,
                  selected: selectedSubjects.some((sel) => sel.code === s.code),
                }))}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          <div className="selected-subjects">
            <h2>Disciplinas Selecionadas</h2>
            <ul>
              {selectedSubjects.map((subject) => (
                <li key={subject.code} className="selected-subject-item">
                  🠊 {subject.name} ({subject.code}) - {subject.hours}h
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveSubject(subject.code)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="container">
          <div className="schedule-view">
            <h2>Grade de Horários</h2>
            <WeeklySchedule subjects={selectedSubjects} />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="container">
          <div className="confirmation-view">
            <h2>Confirmar Matrícula</h2>
            <table className="confirmation-table">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Estado da Solicitação</th>
                </tr>
              </thead>
              <tbody>
                {selectedSubjects.map((subject) => (
                  <tr key={subject.code}>
                    <td>{subject.name}</td>
                    <td>
                      {matriculaSolicitada
                        ? "Matrícula Solicitada"
                        : "Não Solicitada"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Botões de Navegação */}
      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button className="back-button" onClick={handlePreviousStep}>
            <FaArrowLeft /> Voltar
          </button>
        )}
        <button className="next-button" onClick={handleNextStep}>
          {currentStep === 3 ? "Confirmar Matrícula" : "Avançar"}{" "}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default App;
