import React from 'react';
import './SchedulePage.css';

const SchedulePreview = ({ selectedSubjects }) => {
  console.log('Selected Subjects:', selectedSubjects);
  const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  const hours = [
    '07:30 - 09:30',
    '09:30 - 11:30',
    '11:30 - 13:30',
    '13:30 - 15:30',
    '15:30 - 17:30',
    '17:30 - 19:30',
    '19:30 - 21:00'
  ];
  

  // Função para encontrar disciplinas em um determinado horário e dia
  const getSubjectForTimeSlot = (day, time) => {
    return selectedSubjects
      .filter(subject =>
        subject.selectedClass?.schedule?.some(
          slot => slot.day === day && time.includes(slot.start)
        )
      )
      .map(subject => ({
        name: subject.name,
        code: subject.code,
        teacher: subject.selectedClass?.teacher,
      }));
  };
  

  return (
    <div className="schedule-preview">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Horário</th>
            {daysOfWeek.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={index}>
              <td>{hour}</td>
              {daysOfWeek.map(day => (
                <td key={day} className="schedule-cell">
                  {getSubjectForTimeSlot(day, hour).map((subject, i) => (
                    <div key={i} className="subject-block" style={{ backgroundColor: getRandomColor() }}>
                      <strong>{subject.name}</strong>
                      <p>{subject.code}</p>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend">
        <h3>Legenda</h3>
        {selectedSubjects.map(subject => (
          <div key={subject.code} className="legend-item" style={{ borderColor: getRandomColor() }}>
            <strong>{subject.name}</strong> ({subject.code}) - {subject.selectedClass?.teacher}
          </div>
        ))}
      </div>
    </div>
  );
};

// Função para gerar uma cor aleatória (pode ser substituída por lógica de cores fixas)
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default SchedulePreview;
