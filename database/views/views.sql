-- Para usar a view abaixo: SELECT * FROM TurmasDoAluno WHERE matricula_aluno = ?;
CREATE VIEW TurmasDoAluno AS
SELECT 
    a.matricula AS matricula_aluno, 
    a.nome AS aluno, 
    d.nome AS disciplina, 
    t.hora_inicio, 
    t.hora_fim
FROM Aluno a
JOIN Turma_Aluno ta ON a.matricula = ta.Matricula_Aluno
JOIN Turma t ON ta.id_turma = t.id_turma
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;

-- Para usar a view abaixo: SELECT * FROM TurmasDoProfessor WHERE matricula_professor = ?;
CREATE VIEW TurmasDoProfessor AS
SELECT 
    p.Matricula AS matricula_professor, 
    p.nome AS professor, 
    d.nome AS disciplina, 
    t.hora_inicio, 
    t.hora_fim
FROM Professor p
JOIN Turma t ON p.Matricula = t.Matricula_Professor
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;

-- Para consultar por um dia específico: SELECT * FROM DisciplinasDoDia WHERE dia_semana = ?;
CREATE VIEW DisciplinasDoDia AS
SELECT 
    d.nome AS disciplina, 
    t.dia_semana, 
    t.hora_inicio, 
    t.hora_fim
FROM Turma t
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina;
