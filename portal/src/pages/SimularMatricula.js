import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.js"; 
import Accordion from "../components/accordion/Accordion"; 
import WeeklySchedule from "../components/WeeklySchedule/WeeklySchedule"; 
import "../App.css"; 
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import axios from 'axios';  // Usaremos axios para facilitar as requisições à API

function SimularMatricula() {
  const [availableTurmas, setAvailableTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); 
  const [matriculasSolicitadas, setMatriculasSolicitadas] = useState([]);

  const matriculaAluno = 202220097; // Ajuste conforme a matrícula do aluno

  // Buscar turmas e disciplinas disponíveis na API
  useEffect(() => {
    async function fetchData() {
      try {
        const turmasResponse = await axios.get('http://localhost:3000/turmas');
        const disciplinasResponse = await axios.get('http://localhost:3000/disciplinas');
        
        const turmas = Array.isArray(turmasResponse.data) ? turmasResponse.data : [];
        const disciplinas = Array.isArray(disciplinasResponse.data) ? disciplinasResponse.data : [];

        // Juntar informações de turmas e disciplinas
        const turmasComDisciplina = turmas.map((turma) => {
          const disciplina = disciplinas.find(d => d.codigo_disciplina === turma.codigo_disciplina);
          return {
            ...turma,
            nome_disciplina: disciplina ? disciplina.nome : "Disciplina Desconhecida",
            semestre_disciplina: disciplina ? disciplina.semestre_disciplina : "Semestre Desconhecido",
            carga_horaria: disciplina ? disciplina.carga_horaria : "0",
            horarios: turma.horarios || [] // Novo campo que armazena os horários da turma
          };
        });

        // Remover turmas duplicadas
        const turmasUnicas = turmasComDisciplina.filter((turma, index, self) =>
          index === self.findIndex((t) => (
            t.id_turma === turma.id_turma && t.nome_disciplina === turma.nome_disciplina
          ))
        );

        setAvailableTurmas(turmasUnicas);
      } catch (error) {
        console.error('Erro ao buscar as turmas ou disciplinas:', error);
      }
    }
    fetchData();
  }, []);

  // Buscar disciplinas em que o aluno já tem matrícula solicitada
  useEffect(() => {
    if (currentStep === 3) {
      async function fetchMatriculasSolicitadas() {
        try {
          const response = await axios.get(`http://localhost:3000/turmas-alunos/${matriculaAluno}`);
          setMatriculasSolicitadas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as matrículas solicitadas:', error);
        }
      }
      fetchMatriculasSolicitadas();
    }
  }, [currentStep]);

  // Lida com a seleção/deseleção de disciplinas
  const handleSelectionChange = (subject) => {
    setSelectedSubjects((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.id_turma === subject.id_turma);
      if (isSelected) {
        return prevSelected.filter((s) => s.id_turma !== subject.id_turma);
      } else {
        return [...prevSelected, subject];
      }
    });
  };

  const handleRemoveSubject = (subjectId) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.filter((subject) => subject.id_turma !== subjectId)
    );
  };
  
  const handleNextStep = async () => {
    if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
    } else {
        // Enviar a solicitação de matrícula para as disciplinas ainda não solicitadas
        try {
            const requests = selectedSubjects
                .filter(subject => !matriculasSolicitadas.some(ms => ms.id_turma === subject.id_turma))
                .map(subject =>
                    axios.post(`http://localhost:3000/turmas-alunos`, {
                        turma: subject.id_turma,
                        aluno: matriculaAluno,
                        situacao: "Matricula Solicitada"
                    })
                );

            await Promise.all(requests);
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.error('Erro ao solicitar matrícula:', error);
            if (error.response) {
                console.error('Detalhes do erro:', error.response.data);
            }
        }
    }
  };

  const handleConfirmarMatricula = async () => {
    try {
      const requests = selectedSubjects.map(subject => {
        const jaSolicitada = matriculasSolicitadas.find(ms => ms.id_turma === subject.id_turma);
        if (!jaSolicitada) {
          return axios.post(`http://localhost:3000/turmas-alunos`, {
            turma: subject.id_turma,
            aluno: matriculaAluno,
            situacao: "Matricula Solicitada"
          });
        }
        return null; // Se já foi solicitada, não faz a requisição
      }).filter(request => request !== null);

      await Promise.all(requests);
      setMatriculasSolicitadas(selectedSubjects);
    } catch (error) {
      console.error('Erro ao confirmar matrícula:', error);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Agrupar as turmas por semestre
  const turmasPorSemestre = availableTurmas.reduce((acc, turma) => {
    const semestre = `${turma.semestre_disciplina}º Semestre`;
    if (!acc[semestre]) {
      acc[semestre] = [];
    }
    acc[semestre].push(turma);
    return acc;
  }, {});

  return (
    <div className="App">
      <Header />
      <h1 className="nomeCurso">Bacharelado em Sistemas de Informação</h1>

      {currentStep === 1 && (
        <div className="container">
          <div className="dropboxes">
            {Object.entries(turmasPorSemestre).map(([semestre, turmas]) => (
              <Accordion
                key={semestre}
                title={semestre}
                subjects={turmas.map((turma) => ({
                  ...turma,
                  name: turma.nome_disciplina,
                  code: turma.codigo_disciplina,
                  hours: turma.carga_horaria,
                  selected: selectedSubjects.some((sel) => sel.id_turma === turma.id_turma),
                }))}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          <div className="selected-subjects">
            <h2>Disciplinas Selecionadas</h2>
            <ul>
              {selectedSubjects.map((subject) => (
                <li key={subject.id_turma} className="selected-subject-item">
                  🠊 {subject.nome_disciplina} ({subject.carga_horaria}h) - {subject.ano}/{subject.semestre_turma}
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
          <div className="schedule-view">
            <h2>Grade de Horários</h2>
            <WeeklySchedule subjects={selectedSubjects.map((subject) => ({
              ...subject,
              horarios: subject.horarios || []
            }))} />
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
                {selectedSubjects.map((subject) => {
                  const jaSolicitada = matriculasSolicitadas.some(ms => ms.id_turma === subject.id_turma);
                  return (
                    <tr key={subject.id_turma}>
                      <td>{subject.nome_disciplina}</td>
                      <td>{jaSolicitada ? "Matrícula Solicitada" : "Não Solicitada"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="confirm-button" onClick={handleConfirmarMatricula}>
              Confirmar Matrícula
            </button>
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
        {currentStep < 3 && (
          <button className="next-button" onClick={handleNextStep}>
            {currentStep === 2 ? "Confirmar Matrícula" : "Avançar"} {" "}
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default SimularMatricula;
