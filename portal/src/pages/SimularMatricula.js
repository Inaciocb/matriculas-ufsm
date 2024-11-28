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
  const [showProfessorInput, setShowProfessorInput] = useState(false);
  const [professorMatricula, setProfessorMatricula] = useState("");

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

  let formatTurmasBySemester = (turmas) => {
    const groupedBySemester = {};
    console.log(turmas)
    turmas.forEach((turma) => {
      const { semestre_disciplina, codigo_disciplina, nome_disciplina, carga_horaria, nome_professor } = turma;

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
          professor: nome_professor,
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
      const updatedSubjects = prevSelected.filter(
        (s) => s.disciplina.codigo !== turmaSelecionada.disciplina.codigo
      );

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

  const handleConfirmMatricula = () => {
    const alunoMatricula = matriculaAluno;

    const matriculas = selectedSubjects.map((subject) => ({
      turma: subject.id_turma,
      aluno: alunoMatricula,
      situacao: "Matricula Solicitada",
    }));

    axios
      .post("http://localhost:3001/turmas-alunos", matriculas)
      .then((response) => {
        setSelectedSubjects((prevSubjects) =>
          prevSubjects.map((subject) => ({
            ...subject,
            estadoSolicitacao: "Solicitada",
          }))
        );
      })
      .catch((error) => {
        console.error("Erro ao confirmar matrícula:", error);
      });
  };

  const toggleProfessorInput = () => {
    setShowProfessorInput(!showProfessorInput);
  };

  const handleProfessorMatriculaChange = (event) => {
    if (event.target.value !== "") {
      setSubjectsBySemester({});
      axios.get(`http://localhost:3001/turmas/disponiveis/${matriculaAluno}/por-professor/${event.target.value}`)
          .then((response) => {
            const formattedData = formatTurmasBySemester(response.data);
            setSubjectsBySemester(formattedData);
          })
          .catch((error) => console.error("Erro ao buscar turmas:", error));
    } else {
      setSubjectsBySemester({});
      axios.get(`http://localhost:3001/turmas/disponiveis/${matriculaAluno}`)
          .then((response) => {
            const formattedData = formatTurmasBySemester(response.data);
            setSubjectsBySemester(formattedData);
          })
          .catch((error) => console.error("Erro ao buscar turmas:", error));
    }
  };

  return (
    <div className="App">
      <Header />
      <h1 className="nomeCurso">Bacharelado em Sistemas de Informação</h1>

      {currentStep === 1 && (
          <div style={{width: '500px', margin: '15px 0', height: '50px'}}>
            <button onClick={toggleProfessorInput}>
              Filtrar por Professor
            </button>
            {showProfessorInput && (
                <input style={{width: '200px', margin: '0 10px'}}
                    type="text"
                    value={professorMatricula}
                       onChange={(event) => setProfessorMatricula(event.target.value)}
                   onBlur={handleProfessorMatriculaChange}
                    placeholder="Matrícula do Professor"
                />
            )}
          </div>
      )}
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
                <tr key={subject.id_turma}>
                  <td>{subject.nome_disciplina}</td>
                  <td>{subject.estadoSolicitacao || "Não Solicitada"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleConfirmMatricula}>Confirmar Matrícula</button>
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
