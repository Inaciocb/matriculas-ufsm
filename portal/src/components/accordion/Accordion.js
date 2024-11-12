import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Accordion.css';

const Accordion = ({ title, subjects, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (subject) => {
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
          <div
            key={subject.code}
            className={`subject-item ${index % 2 === 0 ? 'even' : 'odd'}`}
            onClick={() => handleCheckboxChange(subject)}
          >
            <input
              type="checkbox"
              checked={!!subject.selected}
              onChange={() => handleCheckboxChange(subject)}
            />
            <label>
              {subject.name} ({subject.code}) - {subject.hours}h
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
