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

CREATE PROCEDURE GetDisciplinasDisponiveis (IN Matricula BIGINT)
BEGIN
    SELECT 
        d.codigo_disciplina, 
        d.nome
    FROM Disciplina d
    WHERE d.codigo_disciplina NOT IN (
        SELECT t.codigo_disciplina
        FROM Turma_Aluno ta
        JOIN Turma t ON ta.id_turma = t.id_turma
        WHERE ta.Matricula_Aluno = Matricula
          AND ta.situacao_aluno not in ('Aprovado com nota', 'Matricula', 'Matricula Solicitada')
    );
END $$

CREATE PROCEDURE SalasLivres(
    IN p_centro VARCHAR(10),
    IN p_dia_semana ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'),
    IN p_hora_inicio TIME,
    IN p_hora_fim TIME
)
BEGIN
    SELECT s.numero AS numero_sala, s.capacidade_alunos, s.tipo, s.centro
    FROM Sala s
    LEFT JOIN Turma_Horarios th 
        ON s.centro = th.id_turma
        AND th.dia_semana = p_dia_semana
        AND (
            (th.hora_inicio < p_hora_fim AND th.hora_fim > p_hora_inicio) 
        )
    WHERE s.centro = p_centro
      AND th.id_turma IS NULL;  
END $$

CREATE PROCEDURE HorariosDisponiveisSemestre(
    IN p_semestre TINYINT,
    IN p_ano YEAR,
    IN p_codigo_disciplina VARCHAR(10)
)
BEGIN
    SELECT DISTINCT
        th.dia_semana AS dia,
        th.hora_fim AS horario_comeco_disponivel,
        ADDTIME(th.hora_fim, '00:30:00') AS horario_fim_disponivel
    FROM Turma t
    JOIN Turma_Horarios th ON t.id_turma = th.id_turma
    WHERE t.semestre_turma = p_semestre
      AND t.ano = p_ano
      AND NOT EXISTS (
          SELECT 1
          FROM Turma_Horarios th_conflito
          WHERE th_conflito.id_turma = th.id_turma
            AND th_conflito.dia_semana = th.dia_semana
            AND (
                (th_conflito.hora_inicio < ADDTIME(th.hora_fim, '00:30:00') 
                 AND th_conflito.hora_fim > th.hora_fim)
                OR
                (th_conflito.hora_inicio >= th.hora_fim AND th_conflito.hora_inicio < ADDTIME(th.hora_fim, '00:30:00'))
            )
            AND th_conflito.id_turma != th.id_turma
      )
    ORDER BY th.dia_semana, th.hora_fim;
END $$

DELIMITER ;
