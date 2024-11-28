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
      return subject.horarios.some((horario) => {
        const [startHour, startMinute] = horario.hora_inicio.split(":").map(Number);
        const [endHour, endMinute] = horario.hora_fim.split(":").map(Number);

        const [currentHour, currentMinute] = time.split(":").map(Number);
        const currentMinutes = currentHour * 60 + currentMinute;
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        return (
          horario.dia_semana.toLowerCase() === day.toLowerCase() &&
          currentMinutes >= startMinutes &&
          currentMinutes < endMinutes
        );
      });
    });

    if (filteredSubjects.length === 0) return null;

    return (
      <div className="schedule-slot">
        {filteredSubjects.map((subject, index) => (
          <div
            key={`${subject.id_turma}-${index}`}
            className="subject-block"
            title={`Disciplina: ${subject.nome_disciplina}\nTurma: ${subject.id_turma}\nSala: ${subject.Numero_Sala}\nHorário: ${subject.horarios
              .map(
                (h) =>
                  `${h.dia_semana}: ${h.hora_inicio} - ${h.hora_fim}`
              )
              .join("\n")}`}
          >
            {subject.nome_disciplina}
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
                <div className="schedule-slot">
                  {renderSubjects(day, hour)}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
