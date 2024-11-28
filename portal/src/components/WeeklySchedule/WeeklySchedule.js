import React from "react";
import "./WeeklySchedule.css";

const hours = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(7 + i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const WeeklySchedule = ({ subjects }) => {
  const renderSubjects = (day, time) => {
    const filteredSubjects = subjects.filter((subject) => {
      if (!subject.horarios || subject.horarios.length === 0) return false;

      return subject.horarios.some((horario) => {
        if (!horario.dia || !horario.inicio || !horario.fim) return false;

        const [hour, minute] = time.split(":").map(Number);
        const [startHour, startMinute] = horario.inicio.split(":").map(Number);
        const [endHour, endMinute] = horario.fim.split(":").map(Number);

        const timeInMinutes = hour * 60 + minute;
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        return (
          horario.dia.toLowerCase() === day.toLowerCase() &&
          timeInMinutes >= startTimeInMinutes &&
          timeInMinutes < endTimeInMinutes
        );
      });
    });

    if (filteredSubjects.length === 0) return null;

    return (
      <div className="schedule-slot">
        {filteredSubjects.map((subject, index) => (
          <div
            key={`${subject.id}-${index}`}
            className="subject-block"
            style={{
              width: `${100 / filteredSubjects.length}%`,
            }}
            data-tooltip={`Nome: ${subject.nome}\nHorário: ${subject.horarios
              .map(
                (h) =>
                  `${h.dia || "N/A"}: ${h.inicio || "N/A"} - ${h.fim || "N/A"}`
              )
              .join("\n")}`}
          >
            {subject.nome}
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
