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
  const [curso, setCurso] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [centros, setCentros] = useState([]);
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [horarios, setHorarios] = useState([{ dia: "Seg", horaInicio: "", horaFim: "" }]); // Inicializa com um horário

  useEffect(() => {
    axios.get("http://localhost:3001/disciplinas").then((response) => setDisciplinas(response.data));
    axios.get("http://localhost:3001/professores").then((response) => setProfessores(response.data));
    axios.get("http://localhost:3001/cursos").then((response) => setCursos(response.data));
    axios.get("http://localhost:3001/centros").then((response) => setCentros(response.data));
  }, []);

  const buscarSalasDisponiveis = () => {
    // Verificar se o centro e os horários estão preenchidos
    if (!centro || horarios.some(h => !h.horaInicio || !h.horaFim || !h.dia)) {
      alert("Preencha o Centro e todos os horários para buscar salas!");
      return;
    }
  
    // Construir o payload com todos os horários
    const payload = horarios.map(horario => ({
      centro,
      dia: horario.dia,
      horaInicio : horario.horaInicio,
      horaFim: horario.horaFim,
    }));
  
    // Realizar a requisição para o backend
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
  
  const addHorario = () => {
    setHorarios([
      ...horarios,
      { dia_semana: "Seg", hora_inicio: "", hora_fim: "" }
    ]);
  };

  const removeHorario = (index) => {
    const newHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(newHorarios);
  }
  
  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][field] = value;
    setHorarios(newHorarios);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Corrigir os nomes dos campos de horário para corresponder ao esperado pelo backend
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
      id_curso: parseInt(curso),
      // Corrigindo os campos dos horários
      horarios: horarios.map(horario => ({
        dia_semana: horario.dia,  // Mapeando para 'dia_semana'
        hora_inicio: horario.horaInicio,  // Corrigindo o nome do campo
        hora_fim: horario.horaFim  // Corrigindo o nome do campo
      }))
    };
    axios
      .post("http://localhost:3001/turmas", novaTurma)
      .then(() => alert("Turma cadastrada com sucesso!"))
      .catch((error) => alert("Erro ao cadastrar turma:", error));
  };
  

  return (
    <div>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
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

              <label>Curso:</label>
              <select value={curso} onChange={(e) => setCurso(e.target.value)} required>
                <option value="" disabled>Selecione</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Horários */}
          <div className="form-column">
            <label>Horários:</label>
            {horarios.map((horario, index) => (
              <div key={index} className="horario-item">
                <select
                  value={horario.dia}
                  onChange={(e) => handleHorarioChange(index, "dia", e.target.value)} // 'dia' deve ser 'dia_semana' no backend
                >
                  <option value="Seg">Segunda-feira</option>
                  <option value="Ter">Terça-feira</option>
                  <option value="Qua">Quarta-feira</option>
                  <option value="Qui">Quinta-feira</option>
                  <option value="Sex">Sexta-feira</option>
                  <option value="Sab">Sábado</option>
                  <option value="Dom">Domingo</option>
                </select>

                <input
                  type="time"
                  value={horario.horaInicio}  // Deve ser 'hora_inicio'
                  onChange={(e) => handleHorarioChange(index, "horaInicio", e.target.value)}  // 'horaInicio' deve ser 'hora_inicio'
                  required
                />

                <input
                  type="time"
                  value={horario.horaFim}  // Deve ser 'hora_fim'
                  onChange={(e) => handleHorarioChange(index, "horaFim", e.target.value)}  // 'horaFim' deve ser 'hora_fim'
                  required
                />

                {horarios.length > 1 && (
                  <button type="button" onClick={() => removeHorario(index)} className="remove-button">
                    Remover
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addHorario} className="add-button">
              Adicionar Horário
            </button>
          </div>

          {/* Salas Disponíveis */}
          <div className="form-column">
            <label>Salas Disponíveis:</label>
            <button type="button" onClick={buscarSalasDisponiveis} className="next-button">
              Buscar Salas
            </button>
            <select value={numeroSala} onChange={(e) => setNumeroSala(e.target.value)} required>
              <option value="" disabled>Selecione</option>
              {salasDisponiveis.map((sala) => (
                <option key={sala.numero} value={sala.numero}>
                  {sala.numero_sala} - {sala.centro}
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Cadastro */}
          <button type="submit" className="submit-button">
            Cadastrar <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroTurma;
