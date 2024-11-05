import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Accordion.css';

const Accordion = ({ title, subjects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (code) => {
    setSelectedSubjects((prevState) => ({
      ...prevState,
      [code]: !prevState[code],
    }));
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="accordion-content">
          {subjects.map((subject, index) => (
            <div
              key={subject.code}
              className={`subject-item ${index % 2 === 0 ? 'even' : 'odd'}`}
              onClick={() => handleCheckboxChange(subject.code)}
            >
              <input
                type="checkbox"
                checked={!!selectedSubjects[subject.code]}
                onChange={() => handleCheckboxChange(subject.code)}
              />
              <label>
                {subject.name} ({subject.code}) - {subject.hours}h
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
