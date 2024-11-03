CREATE VIEW TurmasDoAluno AS
SELECT a.matricula AS matricula_aluno, a.nome AS aluno, d.nome AS disciplina, t.hora_inicio, t.hora_fim
FROM Aluno a
JOIN Turma_Aluno ta ON a.matricula = ta.Matricula_Aluno
JOIN Turma t ON ta.ano_turma = t.ano AND ta.semestre_turma = t.semestre_turma 
              AND ta.codigo_disciplina = t.codigo_disciplina AND ta.Matricula_Professor = t.Matricula_Professor
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;


CREATE VIEW TurmasDoProfessor AS
SELECT p.Matricula AS matricula_professor, p.nome AS professor, d.nome AS disciplina, t.hora_inicio, t.hora_fim
FROM Professor p
JOIN Turma t ON p.Matricula = t.Matricula_Professor
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;



-- para consultar por um dia específico -> SELECT * FROM DisciplinasDoDia WHERE dia_semana = 'Seg';
CREATE VIEW DisciplinasDoDia AS
SELECT d.nome AS disciplina, t.dia_semana, t.hora_inicio, t.hora_fim
FROM Turma t
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;
