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
          AND situacao_aluno IN ('Aprovado com nota', 'Matricula', 'Matricula Solicitada')
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Matrícula não permitida: já existe uma matrícula ou solicitação para essa disciplina.';
    END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER impedir_horario_conflitante
BEFORE INSERT ON Turma_Horarios
FOR EACH ROW
BEGIN
    
    DECLARE conflito INT;
    SELECT COUNT(*)
    INTO conflito
    FROM Turma_Horarios TH
    JOIN Turma T_EXISTENTE ON TH.id_turma = T_EXISTENTE.id_turma
    JOIN Turma T_NOVA ON NEW.id_turma = T_NOVA.id_turma
    WHERE 
        TH.dia_semana = NEW.dia_semana
        AND (
            (NEW.hora_inicio < TH.hora_fim AND NEW.hora_fim > TH.hora_inicio)
        )
        AND T_EXISTENTE.semestre_turma = T_NOVA.semestre_turma
        AND T_EXISTENTE.ano = T_NOVA.ano
        AND T_EXISTENTE.codigo_disciplina != T_NOVA.codigo_disciplina;

    IF conflito > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Conflito de horário detectado: duas disciplinas diferentes não podem ocupar o mesmo horário no mesmo semestre.';
    END IF;
END;
$$

DELIMITER ;
