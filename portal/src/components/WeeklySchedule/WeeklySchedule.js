import React from "react";
import "./WeeklySchedule.css";

const hours = Array.from({ length: 16 }, (_, i) => `${7 + i}:00`); // 7h às 22h
const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const WeeklySchedule = ({ subjects }) => {
  const renderSubjects = (day, time) => {
    const filteredSubjects = subjects.filter((subject) =>
      subject.days.includes(day) &&
      time >= subject.startTime &&
      time < subject.endTime
    );

    if (filteredSubjects.length === 0) return null;

    return (
      <div className="schedule-slot">
        {filteredSubjects.map((subject, index) => (
          <div
            key={`${subject.code}-${index}`}
            className="subject-block"
            style={{
              width: `${100 / filteredSubjects.length}%`,
            }}
            data-tooltip={`Nome: ${subject.name}\nHorário: ${subject.startTime}-${subject.endTime}\nDias: ${subject.days.join(", ")}`}
          >
            {subject.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="weekly-schedule">
      <div className="schedule-header">
        <div className="time-header" />
        {days.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>
      <div className="schedule-grid">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="time-label">{hour}</div>
            {days.map((day) => (
              <div key={`${day}-${hour}`} className="schedule-cell">
                {renderSubjects(day, hour)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
