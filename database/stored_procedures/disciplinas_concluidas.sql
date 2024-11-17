DELIMITER //

CREATE PROCEDURE DisciplinasConcluidas (IN Matricula BIGINT)
BEGIN
    SELECT DISTINCT 
        d.codigo_disciplina, 
        d.nome
    FROM Turma_Aluno ta
    JOIN Disciplina d ON ta.codigo_disciplina = d.codigo_disciplina
    WHERE ta.Matricula_Aluno = Matricula
      AND ta.situacao_aluno = 'Aprovado com nota';
END //

DELIMITER ;

-- CALL GetDisciplinasAprovadas([matricula do aluno]);
