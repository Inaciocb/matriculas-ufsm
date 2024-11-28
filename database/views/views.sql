CREATE VIEW TurmasDoAluno AS
SELECT 
    a.matricula AS matricula_aluno, 
    a.nome AS aluno, 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Aluno a
JOIN Turma_Aluno ta ON a.matricula = ta.Matricula_Aluno
JOIN Turma t ON ta.id_turma = t.id_turma
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;

CREATE VIEW TurmasDoProfessor AS
SELECT 
    p.Matricula AS matricula_professor, 
    p.nome AS professor, 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Professor p
JOIN Turma t ON p.Matricula = t.Matricula_Professor
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;

CREATE VIEW DisciplinasDoDia AS
SELECT 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Turma t
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;
