-- Inserir dados na tabela Centro
INSERT INTO Centro (codigo_centro) VALUES 
    ('CAL'), ('CCNE'), ('CCR'), ('CCS'),
    ('CCSH'), ('CE'), ('CEFD'), ('CT'),
    ('CTISM'), ('POLI'), ('CS'), ('FW'), ('PM');

-- Inserir dados na tabela Sala
INSERT INTO Sala (centro, numero, capacidade_alunos, tipo) VALUES
    ('CT', 161, 40, 'Sala'),
    ('CT', 334, 40, 'Sala');

-- Inserir dados na tabela Curso
INSERT INTO Curso (id, nome, campus, ementa, centro) VALUES
    (1, 'Bacharelado em Sistemas de Informação', 'Campus Principal', NULL, 'CT');

-- Inserir dados na tabela Disciplina
INSERT INTO Disciplina (codigo_disciplina, nome, semestre_disciplina, ementa, carga_horaria, id_curso) VALUES
    ('CTB1074', 'Custos A', 5, NULL, 60, 1),
    ('ELC1072', 'Interface Humano-Computador', 5, NULL, 60, 1),
    ('ELC1071', 'Projeto e Gerência de Banco de Dados', 5, NULL, 60, 1),
    ('ELC133', 'Qualidade de Software', 5, NULL, 60, 1);

-- Inserir dados na tabela Professor
INSERT INTO Professor (Matricula, nome, centro) VALUES
    (111111111, 'Luis Alvaro Silva', 'CT'),
    (222222222, 'Sergio Luis Sardi Mergen', 'CT'),
    (333333333, 'Giliane Bernardi', 'CT'),
    (444444444, 'Paulo Cesar Barbosa', 'CT');

-- Inserir dados na tabela Turma
INSERT INTO Turma (id_turma, ano, semestre_turma, N_vagas, data_inicio, data_fim, codigo_disciplina, Matricula_Professor, id_curso, Centro_Sala, Numero_Sala) VALUES
    ('TPGBD1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1071', 222222222, 1, 'CT', 334),
    ('TQUAL1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC133', 111111111, 1, 'CT', 161),
    ('TIHC1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1072', 333333333, 1, 'CT', 161),
    ('TCUST1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'CTB1074', 444444444, 1, 'CT', 161);

-- Inserir dados na tabela Turma_Horarios
INSERT INTO Turma_Horarios (id_turma, dia_semana, hora_inicio, hora_fim) VALUES
    ('TPGBD1', 'Seg', '08:30:00', '10:30:00'),
    ('TPGBD1', 'Qua', '08:30:00', '10:30:00'),
    ('TQUAL1', 'Seg', '10:30:00', '12:30:00'),
    ('TQUAL1', 'Qua', '10:30:00', '12:30:00'),
    ('TIHC1', 'Ter', '08:30:00', '10:30:00'),
    ('TIHC1', 'Qui', '08:30:00', '10:30:00'),
    ('TCUST1', 'Ter', '10:30:00', '12:30:00'),
    ('TCUST1', 'Sex', '10:30:00', '12:30:00');

-- Inserir aluno
INSERT INTO Aluno (matricula, nome, id_curso) VALUES
    (202220097, 'Inácio Camargo Buemo', 1);
