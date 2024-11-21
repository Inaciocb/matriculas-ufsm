DELIMITER $$

CREATE PROCEDURE DisciplinasConcluidas (IN Matricula BIGINT)
BEGIN
    SELECT DISTINCT 
        d.codigo_disciplina, 
        d.nome
    FROM Turma_Aluno ta
    JOIN Turma t ON ta.id_turma = t.id_turma
    JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
    WHERE ta.Matricula_Aluno = Matricula
      AND ta.situacao_aluno = 'Aprovado com nota';
END $$

DELIMITER ;
-- CALL GetDisciplinasAprovadas([matricula do aluno]);
