CREATE PROCEDURE HorariosDisponiveisSemestre(
    IN p_semestre TINYINT,
    IN p_ano YEAR,
    IN p_codigo_disciplina VARCHAR(10)
)
BEGIN
    SELECT DISTINCT
        t.dia_semana AS dia,
        t.hora_fim AS horario_comeco_disponivel,
        ADDTIME(t.hora_fim, '00:30:00') AS horario_fim_disponivel
    FROM Turma t
    WHERE t.semestre_turma = p_semestre
      AND t.ano = p_ano
      AND NOT EXISTS (
          SELECT 1
          FROM Turma t_conflito
          WHERE t_conflito.semestre_turma = p_semestre
            AND t_conflito.ano = p_ano
            AND t_conflito.dia_semana = t.dia_semana
            AND (
                (t_conflito.hora_inicio < ADDTIME(t.hora_fim, '00:30:00') 
                 AND t_conflito.hora_fim > t.hora_fim)
                OR
                (t_conflito.hora_inicio >= t.hora_fim AND t_conflito.hora_inicio < ADDTIME(t.hora_fim, '00:30:00'))
            )
            AND t_conflito.codigo_disciplina != p_codigo_disciplina
      )
      AND t.codigo_disciplina != p_codigo_disciplina
    ORDER BY t.dia_semana, t.hora_fim;
END $$

DELIMITER ;