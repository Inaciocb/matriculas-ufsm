import React, { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Accordion.css";

const Accordion = ({
  title,
  subjects,
  onSelectionChange,
  selectedSubjects = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const isTurmaSelected = (turma, subject) => {
    return selectedSubjects.some(
      (s) => s.id_turma === turma.id_turma && s.disciplina.codigo === subject.codigo
    );
  };

  const handleCheckboxChange = (turma, subject) => {
    onSelectionChange({ ...turma, disciplina: subject });
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}° Semestre</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
      >
        {subjects.map((subject) => (
          <div key={subject.codigo} className="subject-group">
            <h4 className="subject-name">{subject.nome}</h4>
            <div className="turmas-list">
              {subject.turmas.map((turma) => (
                <label key={turma.id_turma} className="turma-item">
                  <input
                    type="checkbox"
                    checked={isTurmaSelected(turma, subject)}
                    onChange={() => handleCheckboxChange(turma, subject)}
                  />
                  Turma: {turma.id_turma} | {turma.dia_semana} {turma.hora_inicio} -{" "}
                  {turma.hora_fim} | Sala: {turma.Numero_Sala}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
