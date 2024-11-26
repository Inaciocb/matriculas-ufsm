import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import Header from "../components/Header/Header.js"; 
import "../App.css"; 

const CadastroDisciplina = () => {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [semestre, setSemestre] = useState('');
  const [ementa, setEmenta] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState('');

  // Carregar os cursos e disciplinas disponíveis
  useEffect(() => {
    axios
      .get('http://localhost:3001/cursos') // Endpoint para obter os cursos
      .then((response) => setCursos(response.data))
      .catch((error) => console.error('Erro ao carregar cursos:', error));

    axios
      .get('http://localhost:3001/disciplinas') // Endpoint para obter as disciplinas cadastradas
      .then((response) => setDisciplinas(response.data))
      .catch((error) => console.error('Erro ao carregar disciplinas:', error));
  }, []);

  // Manipular o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const novaDisciplina = {
      codigo_disciplina: codigo,
      nome,
      semestre_disciplina: parseInt(semestre, 10),
      ementa,
      carga_horaria: parseInt(cargaHoraria, 10),
      id_curso: parseInt(cursoSelecionado, 10),
    };

    axios
      .post('http://localhost:3001/disciplinas', novaDisciplina) // Endpoint para salvar a disciplina
      .then(() => {
        alert('Disciplina cadastrada com sucesso!');
        // Resetar o formulário
        setNome('');
        setCodigo('');
        setSemestre('');
        setEmenta('');
        setCargaHoraria('');
        setCursoSelecionado('');

        // Recarregar as disciplinas cadastradas
        axios
          .get('http://localhost:3001/disciplinas')
          .then((response) => setDisciplinas(response.data))
          .catch((error) => console.error('Erro ao carregar disciplinas:', error));
      })
      .catch((error) => {
        console.error('Erro ao cadastrar disciplina:', error);
        alert('Erro ao cadastrar disciplina!');
      });
  };

  // Função para excluir disciplina
  const handleDelete = (codigo) => {
    axios
      .delete(`http://localhost:3001/disciplinas/${codigo}`) // Endpoint para deletar a disciplina
      .then(() => {
        alert('Disciplina excluída com sucesso!');
        // Remover a disciplina do estado
        setDisciplinas(disciplinas.filter(disciplina => disciplina.codigo_disciplina !== codigo));
      })
      .catch((error) => {
        console.error('Erro ao excluir disciplina:', error);
        alert('Erro ao excluir disciplina!');
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        {/* Seção de Cadastro */}
        <div className="dropboxes">
          <h2>Cadastro de Disciplinas</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="disciplina">Nome da Disciplina:</label>
            <input 
              type="text" 
              id="disciplina" 
              placeholder="Digite o nome da disciplina" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />

            <label htmlFor="codigo">Código da Disciplina:</label>
            <input 
              type="text" 
              id="codigo" 
              placeholder="Digite o código da disciplina" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value)} 
            />

            <label htmlFor="semestre">Semestre:</label>
            <input 
              type="number" 
              id="semestre" 
              placeholder="Digite o semestre" 
              value={semestre} 
              onChange={(e) => setSemestre(e.target.value)} 
            />

            <label htmlFor="curso">Curso:</label>
            <select 
              id="curso" 
              value={cursoSelecionado} 
              onChange={(e) => setCursoSelecionado(e.target.value)}
            >
              <option value="" disabled>Selecione um curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </select>

            <label htmlFor="ementa">Ementa:</label>
            <textarea 
              id="ementa" 
              placeholder="Digite a ementa" 
              value={ementa} 
              onChange={(e) => setEmenta(e.target.value)} 
            />

            <label htmlFor="cargaHoraria">Carga Horária:</label>
            <input 
              type="number" 
              id="cargaHoraria" 
              placeholder="Digite a carga horária" 
              value={cargaHoraria} 
              onChange={(e) => setCargaHoraria(e.target.value)} 
            />

            <button type="submit" className="next-button">
              Adicionar Disciplina <FaArrowRight />
            </button>
          </form>
        </div>

        {/* Disciplinas Cadastradas */}
        <div className="selected-subjects">
          <h2>Disciplinas Cadastradas</h2>
          {disciplinas.length > 0 ? (
            <div className="selected-subject-list">
              {disciplinas.map((disciplina) => (
                <div key={disciplina.codigo_disciplina} className="selected-subject-item">
                  <span>{disciplina.nome} ({disciplina.codigo_disciplina}) - {disciplina.carga_horaria}h</span>
                  <button 
                    className="remove-button" 
                    onClick={() => handleDelete(disciplina.codigo_disciplina)} 
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Não há disciplinas cadastradas.</p>
          )}
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="navigation-buttons">
        <button className="back-button">
          <FaArrowLeft /> Voltar
        </button>
        <button className="next-button">
          Próximo <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CadastroDisciplina;
