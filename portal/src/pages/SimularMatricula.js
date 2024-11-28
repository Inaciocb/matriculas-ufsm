import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.js";
import Accordion from "../components/accordion/Accordion";
import WeeklySchedule from "../components/WeeklySchedule/WeeklySchedule";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import "../App.css";

function SimularMatricula() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [subjectsBySemester, setSubjectsBySemester] = useState({});
  const [availableTurmas, setAvailableTurmas] = useState([]);

  const matriculaAluno = '123';

  useEffect(() => {
    axios
      .get(`http://localhost:3001/turmas/disponiveis/${matriculaAluno}`)
      .then((response) => {
        const formattedData = formatTurmasBySemester(response.data);
        setSubjectsBySemester(formattedData);
      })
      .catch((error) => console.error("Erro ao buscar turmas:", error));
  }, []);

  const formatTurmasBySemester = (turmas) => {
    const groupedBySemester = {};
    turmas.forEach((turma) => {
      const { semestre_disciplina, codigo_disciplina, nome_disciplina, carga_horaria } = turma;

      if (!groupedBySemester[semestre_disciplina]) {
        groupedBySemester[semestre_disciplina] = [];
      }

      let disciplina = groupedBySemester[semestre_disciplina].find(
        (disciplina) => disciplina.codigo === codigo_disciplina
      );

      if (!disciplina) {
        disciplina = {
          codigo: codigo_disciplina,
          nome: nome_disciplina,
          carga_horaria: carga_horaria,
          turmas: [],
        };
        groupedBySemester[semestre_disciplina].push(disciplina);
      }

      disciplina.turmas.push(turma);
    });

    console.log(groupedBySemester)

    return groupedBySemester;
  };

  const handleSelectionChange = (turmaSelecionada) => {
    setSelectedSubjects((prevSelected) => {
      // Remove apenas turmas da mesma disciplina
      const updatedSubjects = prevSelected.filter(
        (s) => s.disciplina.codigo !== turmaSelecionada.disciplina.codigo
      );
  
      // Adiciona a nova turma selecionada
      return [...updatedSubjects, turmaSelecionada];
    });
  };

  const handleRemoveSubject = (subjectCode) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.filter((subject) => subject.id_turma !== subjectCode)
    );
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
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
                title={semester}
                subjects={subjects}
                onSelectionChange={handleSelectionChange}
                selectedSubjects={selectedSubjects}
              />
            ))}
          </div>
          <div className="selected-subjects">
            <h2>Disciplinas Selecionadas</h2>
            <ul>
              {selectedSubjects.map((subject) => (
                <li key={subject.id_turma} className="selected-subject-item">
                  {subject.nome_disciplina} ({subject.codigo_disciplina})
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveSubject(subject.id_turma)}
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
          <WeeklySchedule subjects={selectedSubjects} currentDate={currentDate} />
        </div>
      )}

      {currentStep === 3 && (
        <div className="container">
          <h2>Confirmar Matrícula</h2>
          <table>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Estado da Solicitação</th>
              </tr>
            </thead>
            <tbody>
              {selectedSubjects.map((subject) => (
                <tr key={subject.codigo}>
                  <td>{subject.nome}</td>
                  <td>Não Solicitada</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button onClick={handlePreviousStep}>
            <FaArrowLeft /> Voltar
          </button>
        )}
        <button onClick={handleNextStep}>
          {currentStep === 3 ? "Confirmar Matrícula" : "Avançar"}{" "}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default SimularMatricula;
