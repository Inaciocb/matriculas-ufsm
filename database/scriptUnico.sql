CREATE DATABASE matriculas;
USE matriculas;

CREATE TABLE Centro (
    codigo_centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (codigo_centro)
);

INSERT INTO Centro (codigo_centro) VALUES 
    ('CAL'), ('CCNE'), ('CCR'), ('CCS'),
    ('CCSH'), ('CE'), ('CEFD'), ('CT'),
    ('CTISM'), ('POLI'), ('CS'), ('FW'), ('PM');

CREATE TABLE Sala (
    centro VARCHAR(10) NOT NULL,
    numero INT NOT NULL,
    capacidade_alunos TINYINT NOT NULL,
    tipo ENUM('Laboratório', 'Sala'),
    PRIMARY KEY (centro, numero),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);

CREATE TABLE Curso (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    campus VARCHAR(100) NOT NULL,
    ementa VARCHAR(220),
    centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);

CREATE TABLE Disciplina (
    codigo_disciplina VARCHAR(10) NOT NULL, 
    nome VARCHAR(100) NOT NULL,
    semestre_disciplina TINYINT NOT NULL,
    ementa VARCHAR(220),
    carga_horaria INT,
    id_curso INT NOT NULL,
    PRIMARY KEY (codigo_disciplina),
    FOREIGN KEY (id_curso) REFERENCES Curso(id)
);

CREATE TABLE Professor (
    Matricula BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (Matricula),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);

CREATE TABLE Aluno (
    matricula BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_curso INT NOT NULL,  
    PRIMARY KEY (matricula),
    FOREIGN KEY (id_curso) REFERENCES Curso(id)
);

CREATE TABLE Turma (
    id_turma VARCHAR(7) NOT NULL,
    ano YEAR NOT NULL,
    semestre_turma ENUM('1','2') NOT NULL,
    N_vagas INT,
    data_inicio DATE,
    data_fim DATE,
    codigo_disciplina VARCHAR(10) NOT NULL,
    Matricula_Professor BIGINT NOT NULL,
    id_curso INT NOT NULL,
    Centro_Sala VARCHAR(10) NOT NULL,
    Numero_Sala INT NOT NULL,
    PRIMARY KEY (id_turma),
    FOREIGN KEY (codigo_disciplina) REFERENCES Disciplina(codigo_disciplina),
    FOREIGN KEY (Matricula_Professor) REFERENCES Professor(Matricula),
    FOREIGN KEY (id_curso) REFERENCES Curso(id),
    FOREIGN KEY (Centro_Sala, Numero_Sala) REFERENCES Sala(centro, numero)
);

CREATE TABLE Turma_Horarios (
    id_turma VARCHAR(7) NOT NULL,
    dia_semana ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    PRIMARY KEY (id_turma, dia_semana, hora_inicio),
    FOREIGN KEY (id_turma) REFERENCES Turma(id_turma),
    CHECK (hora_inicio >= '07:30:00' AND hora_inicio <= '20:00:00'),
    CHECK (hora_fim >= ADDTIME(hora_inicio, '01:00:00') AND hora_fim <= ADDTIME(hora_inicio, '04:00:00')),
    CHECK (hora_fim <= '23:00:00')
);

CREATE TABLE Turma_Aluno (
    id_turma VARCHAR(7) NOT NULL,
    Matricula_Aluno BIGINT NOT NULL,
    situacao_aluno ENUM('Matricula', 'Matricula Solicitada', 'Matricula Rejeitada', 'Aprovado com nota', 'Reprovado por Frequência', 'Reprovado com Nota'),
    PRIMARY KEY (id_turma, Matricula_Aluno),
    FOREIGN KEY (id_turma) REFERENCES Turma(id_turma),
    FOREIGN KEY (Matricula_Aluno) REFERENCES Aluno(matricula)
);

INSERT INTO Professor (Matricula, nome, centro) VALUES
    (111111111, 'Luis Alvaro Silva', 'CT'),
    (222222222, 'Sergio Luis Sardi Mergen', 'CT'),
    (333333333, 'Giliane Bernardi', 'CT'),
    (444444444, 'Paulo Cesar Barbosa', 'CT');
    
INSERT INTO Curso (id, nome, campus, ementa, centro) VALUES
    (1, 'Bacharelado em Sistemas de Informação', 'Campus Principal', NULL, 'CT');
   
INSERT INTO Disciplina (codigo_disciplina, nome, semestre_disciplina, ementa, carga_horaria, id_curso) VALUES
    ('CTB1074', 'Custos A', 5, NULL, 60, 1),
    ('ELC1072', 'Interface Humano-Computador', 5, NULL, 60, 1),
    ('ELC1071', 'Projeto e Gerência de Banco de Dados', 5, NULL, 60, 1),
    ('ELC133', 'Qualidade de Software', 5, NULL, 60, 1);

INSERT INTO Sala (centro, numero, capacidade_alunos, tipo) VALUES
    ('CT', 161, 40, 'Sala'),
    ('CT', 334, 40, 'Sala');
    
INSERT INTO Turma (id_turma, ano, semestre_turma, N_vagas, data_inicio, data_fim, codigo_disciplina, Matricula_Professor, id_curso, Centro_Sala, Numero_Sala) VALUES
    ('TPGBD1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1071', 222222222, 1, 'CT', 334),
    ('TQUAL1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC133', 111111111, 1, 'CT', 161),
    ('TIHC1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1072', 333333333, 1, 'CT', 161),
    ('TCUST1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'CTB1074', 444444444, 1, 'CT', 161);

INSERT INTO Turma_Horarios (id_turma, dia_semana, hora_inicio, hora_fim) VALUES
    ('TPGBD1', 'Seg', '08:30:00', '10:30:00'),
    ('TPGBD1', 'Qua', '08:30:00', '10:30:00'),
    ('TQUAL1', 'Seg', '10:30:00', '12:30:00'),
    ('TQUAL1', 'Qua', '10:30:00', '12:30:00'),
    ('TIHC1', 'Ter', '08:30:00', '10:30:00'),
    ('TIHC1', 'Qui', '08:30:00', '10:30:00'),
    ('TCUST1', 'Ter', '10:30:00', '12:30:00'),
    ('TCUST1', 'Sex', '10:30:00', '12:30:00');

-- Inserindo o aluno Inácio Camargo Buemo
INSERT INTO Aluno (matricula, nome, id_curso) VALUES
    (202220097, 'Inácio Camargo Buemo', 1);

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

DELIMITER $$

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
          AND ta.situacao_aluno = 'Aprovado com nota'
    );
END $$

DELIMITER ;

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
    LEFT JOIN Turma_Horarios th 
        ON s.centro = th.id_turma
        AND th.dia_semana = p_dia_semana
        AND (
            (th.hora_inicio < p_hora_fim AND th.hora_fim > p_hora_inicio) 
        )
    WHERE s.centro = p_centro
      AND th.id_turma IS NULL;  
END $$

DELIMITER ;

DELIMITER $$

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

CREATE VIEW TurmasDoAluno AS
SELECT 
    a.matricula AS matricula_aluno, 
    a.nome AS aluno, 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Aluno a
JOIN Turma_Aluno ta ON a.matricula = ta.Matricula_Aluno
JOIN Turma t ON ta.id_turma = t.id_turma
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;

CREATE VIEW TurmasDoProfessor AS
SELECT 
    p.Matricula AS matricula_professor, 
    p.nome AS professor, 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Professor p
JOIN Turma t ON p.Matricula = t.Matricula_Professor
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;

CREATE VIEW DisciplinasDoDia AS
SELECT 
    d.nome AS disciplina, 
    th.dia_semana, 
    th.hora_inicio, 
    th.hora_fim
FROM Turma t
JOIN Disciplina d ON t.codigo_disciplina = d.codigo_disciplina
JOIN Turma_Horarios th ON t.id_turma = th.id_turma;
