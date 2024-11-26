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
    
INSERT INTO Turma (id_turma, ano, semestre_turma, N_vagas, data_inicio, data_fim, codigo_disciplina, Matricula_Professor, id_curso, Centro_Sala, Numero_Sala, dia_semana, hora_inicio, hora_fim) VALUES
    ('TPGBD1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1071', 222222222, 1, 'CT', 334, 'Seg', '08:30:00', '10:30:00'),
    ('TPGBD2', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1071', 222222222, 1, 'CT', 334, 'Qua', '08:30:00', '10:30:00'),
    ('TQUAL1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC133', 111111111, 1, 'CT', 161, 'Seg', '10:30:00', '12:30:00'),
    ('TQUAL2', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC133', 111111111, 1, 'CT', 161, 'Qua', '10:30:00', '12:30:00'),
    ('TIHC1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1072', 333333333, 1, 'CT', 161, 'Ter', '08:30:00', '10:30:00'),
    ('TIHC2', 2024, '2', 40, '2024-09-01', '2024-12-15', 'ELC1072', 333333333, 1, 'CT', 161, 'Qui', '08:30:00', '10:30:00'),
    ('TCUST1', 2024, '2', 40, '2024-09-01', '2024-12-15', 'CTB1074', 444444444, 1, 'CT', 161, 'Ter', '10:30:00', '12:30:00'),
    ('TCUST2', 2024, '2', 40, '2024-09-01', '2024-12-15', 'CTB1074', 444444444, 1, 'CT', 161, 'Sex', '10:30:00', '12:30:00');


