DELIMITER $$

CREATE TRIGGER impedir_matricula_duplicada
BEFORE INSERT ON Turma_Aluno
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Turma_Aluno
        WHERE Matricula_Aluno = NEW.Matricula_Aluno
          AND codigo_disciplina = NEW.codigo_disciplina
          AND situacao_aluno = 'Aprovado com nota'
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Matrícula não permitida: o aluno já foi aprovado nessa disciplina';
    END IF;
END $$

DELIMITER ;



DELIMITER $$

CREATE TRIGGER validar_conflito_sala
BEFORE INSERT ON Turma
FOR EACH ROW
BEGIN
    DECLARE capacidade_sala INT;
    DECLARE total_vagas INT;

    -- Obter a capacidade da sala
    SELECT capacidade_alunos INTO capacidade_sala
    FROM Sala
    WHERE centro = NEW.Centro_Sala
      AND numero = NEW.Numero_Sala;

    -- Calcular o total de vagas para turmas que já ocupam a mesma sala no mesmo horário
    SELECT SUM(N_vagas) INTO total_vagas
    FROM Turma
    WHERE Centro_Sala = NEW.Centro_Sala
      AND Numero_Sala = NEW.Numero_Sala
      AND dia_semana = NEW.dia_semana
      AND ((hora_inicio < NEW.hora_fim AND hora_fim > NEW.hora_inicio))
      AND (
          codigo_disciplina != NEW.codigo_disciplina
          OR (codigo_disciplina = NEW.codigo_disciplina AND Matricula_Professor != NEW.Matricula_Professor)
      );

    -- Verificar se há conflito de capacidade
    IF total_vagas + NEW.N_vagas > capacidade_sala THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Conflito de sala: capacidade total excedida para este horário.';
    END IF;
END $$

DELIMITER ;