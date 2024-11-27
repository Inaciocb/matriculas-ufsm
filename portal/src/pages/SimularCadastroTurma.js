import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import Header from "../components/Header/Header";
import "../App.css";

const CadastroTurma = () => {
  const [codigo, setCodigo] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("1");
  const [vagas, setVagas] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [centro, setCentro] = useState("");
  const [numeroSala, setNumeroSala] = useState("");
  const [diaSemana, setDiaSemana] = useState("Seg");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [curso, setCurso] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/disciplinas").then((response) => setDisciplinas(response.data));
    axios.get("http://localhost:3001/professores").then((response) => setProfessores(response.data));
    axios.get("http://localhost:3001/cursos").then((response) => setCursos(response.data));
    axios.get("http://localhost:3001/centros").then((response) => setCentros(response.data));
  }, []);

  const buscarSalasDisponiveis = () => {
    if (!centro || !diaSemana || !horaInicio || !horaFim) {
      alert("Preencha o Centro, Dia da Semana, Horário de Início e Horário de Fim para buscar salas!");
      return;
    }

    const payload = {
      centro,
      dia: diaSemana,
      inicio: horaInicio,
      fim: horaFim,
    };

    axios
      .post("http://localhost:3001/salas/disponiveis", payload)
      .then((response) => {
        setSalasDisponiveis(response.data);
        if (response.data.length === 0) {
          alert("Nenhuma sala disponível encontrada para os parâmetros informados!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar salas disponíveis:", error);
        alert("Erro ao buscar salas disponíveis!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTurma = {
      id_turma: codigo,
      ano: parseInt(ano),
      semestre_turma: semestre,
      N_vagas: vagas ? parseInt(vagas) : null,
      data_inicio: dataInicio,
      data_fim: dataFim,
      codigo_disciplina: disciplina,
      Matricula_Professor: professor,
      Centro: centro,
      Numero_Sala: parseInt(numeroSala),
      dia_semana: diaSemana,
      hora_inicio: horaInicio,
      hora_fim: horaFim,
      id_curso: parseInt(curso),
    };

    axios
      .post("http://localhost:3001/turmas", novaTurma)
      .then(() => alert("Turma cadastrada com sucesso!"))
      .catch((error) => console.error("Erro ao cadastrar turma:", error));
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-column">
            <label>Código:</label>
            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />

            <label>Ano:</label>
            <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />

            <label>Semestre:</label>
            <select value={semestre} onChange={(e) => setSemestre(e.target.value)} required>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>

            <label>Vagas:</label>
            <input type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} />

            <label>Data de Início:</label>
            <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />

            <label>Data de Fim:</label>
            <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
          </div>

          <div className="form-column">
            <label>Disciplina:</label>
            <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {disciplinas.map((d) => (
                <option key={d.codigo_disciplina} value={d.codigo_disciplina}>
                  {d.nome}
                </option>
              ))}
            </select>

            <label>Professor:</label>
            <select value={professor} onChange={(e) => setProfessor(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {professores.map((p) => (
                <option key={p.Matricula} value={p.Matricula}>
                  {p.nome}
                </option>
              ))}
            </select>

            <label>Centro:</label>
            <select value={centro} onChange={(e) => setCentro(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {centros.map((c) => (
                <option key={c.nome} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>

            <label>Dia da Semana:</label>
            <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} required>
              <option value="Seg">Segunda-feira</option>
              <option value="Ter">Terça-feira</option>
              <option value="Qua">Quarta-feira</option>
              <option value="Qui">Quinta-feira</option>
              <option value="Sex">Sexta-feira</option>
              <option value="Sab">Sábado</option>
              <option value="Dom">Domingo</option>
            </select>

            <label>Horário de Início:</label>
            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />

            <label>Horário de Fim:</label>
            <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} required />
          </div>

          <div className="form-column">
            <label>Salas Disponíveis:</label>
            <button type="button" onClick={buscarSalasDisponiveis}>
              Buscar Salas Disponíveis
            </button>
            <select value={numeroSala} onChange={(e) => setNumeroSala(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {salasDisponiveis.map((sala) => (
                <option key={sala.numero} value={sala.numero}>
                  {sala.numero_sala} - {sala.centro}
                </option>
              ))}
            </select>

            <label>Curso:</label>
            <select value={curso} onChange={(e) => setCurso(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <button type="submit" className="next-button">
              Cadastrar <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroTurma;
