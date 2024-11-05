import React from 'react';
import Header from './components/Header/Header.js';
import Accordion from './components/accordion/Accordion';
import './App.css';

const subjectsBySemester = {
  1: [
    { name: 'Cálculo A', code: 'MTM1019', hours: 90 },
    { name: 'Circuitos Digitais', code: 'ELC1010', hours: 60 },
    { name: 'Introdução a Sistemas de Informação', code: 'ELC1075', hours: 30 },
    { name: 'Laboratório de Programação I', code: 'ELC1065', hours: 60 },
    { name: 'Lógica e Algoritmo', code: 'ELC1064', hours: 60 },
    { name: 'Teoria Geral da Administração', code: 'CAD1002', hours: 60 },
  ],
  2: [
    { name: 'Estruturas de Dados A', code: 'ELC1066', hours: 60 },
    { name: 'Introdução à Ciência da Informação', code: 'DCT1055', hours: 30 },
    { name: 'Laboratório de Programação II', code: 'ELC1067', hours: 60 },
    { name: 'Matemática Discreta', code: 'MTM198', hours: 60 },
    { name: 'Organização de Computadores', code: 'ELC1011', hours: 60 },
    { name: 'Teoria Econômica', code: 'CIE1002', hours: 60 },
  ],
  3: [
    { name: 'Arquiteturas de Computadores A', code: 'ELC1079', hours: 60 },
    { name: 'Engenharia de Software A', code: 'ELC1069', hours: 60 },
    { name: 'Estatística', code: 'STC303', hours: 60 },
    { name: 'Gestão de Pessoas A', code: 'CAD1042', hours: 60 },
    { name: 'Paradigmas de Programação', code: 'ELC117', hours: 60 },
    { name: 'Pesquisa e Ordenação de Dados A', code: 'ELC1068', hours: 60 },
  ],
  4: [
    { name: 'Computadores e Sociedade A', code: 'ELC1076', hours: 60 },
    { name: 'Engenharia Econômica A', code: 'DPS1057', hours: 60 },
    { name: 'Fundamentos de Banco de Dados', code: 'ELC119', hours: 60 },
    { name: 'Gerência de Projetos de Software', code: 'ELC1070', hours: 60 },
    { name: 'Marketing C', code: 'CAD1043', hours: 60 },
    { name: 'Sistemas Operacionais A', code: 'ELC1080', hours: 60 },
  ],
};

function App() {
  return (
    <div className="App">
      <Header />
      <h1 className="nomeCurso">Bacharelado em Sistemas de Informação</h1>
      <div className="dropboxes">
        {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
          <Accordion key={semester} title={`Semestre ${semester}`} subjects={subjects} />
        ))}
        <Accordion title="Qualquer Semestre" subjects={[]} />
      </div>
    </div>
  );
}

export default App;
