DELIMITER $$

CREATE PROCEDURE SalasLivres(
    IN p_centro VARCHAR(10),
    IN p_dia_semana ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'),
    IN p_hora_inicio TIME,
    IN p_hora_fim TIME
)
BEGIN
    SELECT s.numero AS numero_sala, s.capacidade_alunos, s.tipo, s.centro
    FROM Sala s
    LEFT JOIN Turma t 
        ON s.centro = t.Centro_Sala 
        AND s.numero = t.Numero_Sala
        AND t.dia_semana = p_dia_semana
        AND (
            (t.hora_inicio < p_hora_fim AND t.hora_fim > p_hora_inicio) 
        )
    WHERE s.centro = p_centro
      AND t.codigo_disciplina IS NULL;  
END $$

DELIMITER ;


