CREATE DATABASE matriculas;
USE matriculas;

CREATE TABLE Centro (
    codigo_centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (codigo_centro)
);

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
