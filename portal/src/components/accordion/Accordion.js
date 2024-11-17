import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Accordion.css';

const Accordion = ({ title, subjects, onSelectionChange, onClassSelection, selectedClasses = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (subject) => {
    console.log('Checkbox clicada para:', subject); // Verificação de chamada
    onSelectionChange(subject);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px',
        }}
      >
        {subjects.map((subject, index) => (
  <div key={subject.code} className={`subject-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
    <input
      type="checkbox"
      checked={!!subject.selected}
      onChange={() => handleCheckboxChange(subject)}
    />
    <label>
      {subject.name} ({subject.code}) - {subject.hours}h
    </label>

    {/* Mostrar opções de turmas se a disciplina estiver selecionada */}
    {subject.selected && subject.classes && subject.classes.length > 0 && (
      <div className="class-options-container">
        <p>Opções de Turmas para {subject.name}:</p>
        <div className="class-options">
          {subject.classes.map((classItem) => (
            <div
              key={classItem.name}
              className={`class-option ${selectedClasses[subject.code]?.name === classItem.name ? 'selected' : ''} additional-class`}
              onClick={() => onClassSelection(subject.code, classItem)}
            >
              <p>Turma: {classItem.name}</p>
              <p>Docente: {classItem.teacher}</p>
              <p>
                Horários:{' '}
                {classItem.schedule
                  .map(
                    (schedule) => `${schedule.day} ${schedule.start} - ${schedule.end}`
                  )
                  .join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default Accordion;
