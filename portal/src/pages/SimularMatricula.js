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
  const [subjects, setSubjects] = useState([]); 

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const turmasResponse = await axios.get("http://localhost:3001/turmas");
        const disciplinasResponse = await axios.get("http://localhost:3001/disciplinas");
  
        const turmas = turmasResponse.data;
        const disciplinas = disciplinasResponse.data;
  
        
        const subjects = turmas.map((turma) => {
          const disciplina = disciplinas.find(
            (d) => d.codigo_disciplina === turma.disciplina
          );
  
          return {
            id: turma.id,
            nome: disciplina ? disciplina.nome : turma.disciplina,
            code: turma.disciplina,
            semestre: disciplina ? disciplina.semestre_disciplina : "N/A",
            horarios: [], 
          };
        });
  
        
        const groupedBySemester = subjects.reduce((acc, subject) => {
          const semesterKey = `${subject.semestre}º Semestre`;
          if (!acc[semesterKey]) {
            acc[semesterKey] = [];
          }
          acc[semesterKey].push(subject);
          return acc;
        }, {});
  
        setSubjectsBySemester(groupedBySemester);
      } catch (error) {
        console.error("Erro ao buscar disciplinas e turmas:", error);
      }
    };
  
    fetchSubjects();
  }, []);
  

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

  const handleNextStep = async () => {
    if (currentStep === 1) {
      try {
        
        const selectedSubjectsWithSchedules = await Promise.all(
          selectedSubjects.map(async (subject) => {
            const horariosResponse = await axios.get(
              `http://localhost:3001/turmas/${subject.id}/horarios`
            );
            const horarios = horariosResponse.data;

            return {
              ...subject,
              horarios, 
            };
          })
        );

        setSubjects(selectedSubjectsWithSchedules); 
        setCurrentStep(2); 
      } catch (error) {
        console.error("Erro ao buscar horários das turmas:", error);
      }
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); 
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const nextWeek = new Date(prevDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    });
  };

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const previousWeek = new Date(prevDate);
      previousWeek.setDate(previousWeek.getDate() - 7);
      return previousWeek;
    });
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
                  🢊 {subject.nome} ({subject.code})
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
            <div className="week-navigation">
              <button onClick={handlePreviousWeek}>
                <FaArrowLeft /> Semana Anterior
              </button>
              <span>
                Semana de{" "}
                {new Intl.DateTimeFormat("pt-BR").format(currentDate)}
              </span>
              <button onClick={handleNextWeek}>
                Próxima Semana <FaArrowRight />
              </button>
            </div>
            <WeeklySchedule subjects={subjects} currentDate={currentDate} />
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
                    <td>{subject.nome}</td>
                    <td>Não Solicitada</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

export default SimularMatricula;
