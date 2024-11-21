DELIMITER $$

CREATE TRIGGER impedir_matricula_duplicada
BEFORE INSERT ON Turma_Aluno
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Turma_Aluno
        WHERE Matricula_Aluno = NEW.Matricula_Aluno
          AND id_turma = NEW.id_turma
          AND situacao_aluno = 'Aprovado com nota'
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Matrícula não permitida: o aluno já foi aprovado nessa disciplina';
    END IF;
END $$

DELIMITER ;