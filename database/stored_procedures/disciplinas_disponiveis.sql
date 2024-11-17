DELIMITER //

CREATE PROCEDURE GetDisciplinasDisponiveis (IN Matricula BIGINT)
BEGIN
    SELECT 
        d.codigo_disciplina, 
        d.nome
    FROM Disciplina d
    WHERE d.codigo_disciplina NOT IN (
        SELECT ta.codigo_disciplina
        FROM Turma_Aluno ta
        WHERE ta.Matricula_Aluno = Matricula
          AND ta.situacao_aluno = 'Aprovado com nota'
    );
END //

DELIMITER ;

-- CALL GetDisciplinasDisponiveis([matricula do aluno]);
