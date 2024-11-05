import React from 'react';
import Header from './components/Header/Header.js';
import Accordion from './components/accordion/Accordion';
import './App.css';

const subjectsBySemester = {
  "1º Semestre": [
    { name: 'Cálculo A', code: 'MTM1019', hours: 90 },
    { name: 'Circuitos Digitais', code: 'ELC1010', hours: 60 },
    { name: 'Introdução a Sistemas de Informação', code: 'ELC1075', hours: 30 },
    { name: 'Laboratório de Programação I', code: 'ELC1065', hours: 60 },
    { name: 'Lógica e Algoritmo', code: 'ELC1064', hours: 60 },
    { name: 'Teoria Geral da Administração', code: 'CAD1002', hours: 60 },
  ],
  "2º Semestre": [
    { name: 'Estruturas de Dados A', code: 'ELC1066', hours: 60 },
    { name: 'Introdução à Ciência da Informação', code: 'DCT1055', hours: 30 },
    { name: 'Laboratório de Programação II', code: 'ELC1067', hours: 60 },
    { name: 'Matemática Discreta', code: 'MTM198', hours: 60 },
    { name: 'Organização de Computadores', code: 'ELC1011', hours: 60 },
    { name: 'Teoria Econômica', code: 'CIE1002', hours: 60 },
  ],
  "3º Semestre": [
    { name: 'Arquiteturas de Computadores A', code: 'ELC1079', hours: 60 },
    { name: 'Engenharia de Software A', code: 'ELC1069', hours: 60 },
    { name: 'Estatística', code: 'STC303', hours: 60 },
    { name: 'Gestão de Pessoas A', code: 'CAD1042', hours: 60 },
    { name: 'Paradigmas de Programação', code: 'ELC117', hours: 60 },
    { name: 'Pesquisa e Ordenação de Dados A', code: 'ELC1068', hours: 60 },
  ],
  "4º Semestre": [
    { name: 'Computadores e Sociedade A', code: 'ELC1076', hours: 60 },
    { name: 'Engenharia Econômica A', code: 'DPS1057', hours: 60 },
    { name: 'Fundamentos de Banco de Dados', code: 'ELC119', hours: 60 },
    { name: 'Gerência de Projetos de Software', code: 'ELC1070', hours: 60 },
    { name: 'Marketing C', code: 'CAD1043', hours: 60 },
    { name: 'Sistemas Operacionais A', code: 'ELC1080', hours: 60 },
  ],
  "5º Semestre": [
    { name: 'Custos A', code: 'CTB1074', hours: 60 },
    { name: 'Interface Humano-Computador', code: 'ELC1072', hours: 60 },
    { name: 'Projeto e Gerência de Banco de Dados', code: 'ELC1071', hours: 60 },
    { name: 'Qualidade de Software', code: 'ELC133', hours: 60 },
  ],
  "6º Semestre": [
    { name: 'Empreendedorismo B', code: 'CAD1044', hours: 60 },
    { name: 'Projeto de Software I', code: 'ELC1073', hours: 120 },
    { name: 'Redes de Computadores', code: 'ELC1017', hours: 75 },
  ],
  "7º Semestre": [
    { name: 'Metodologia de Pesquisa em Sistemas de Informação', code: 'ELC1077', hours: 60 },
    { name: 'Projeto de Software II', code: 'ELC1074', hours: 120 },
    { name: 'Sistemas de Informação Distribuídos A', code: 'ELC137', hours: 60 },
  ],
  "8º Semestre": [
    { name: 'Trabalho de Graduação em Sistemas de Informação', code: 'ELC1078', hours: 180 },
  ],
  "Qualquer Semestre": [
    { name: 'Análise e Projeto de Sistemas Orientados a Objetos', code: 'ELC1108', hours: 60 },
    { name: 'Bases da Gestão Eletrônica de Documento e Suas Linhas de Pesquisa', code: 'DCT1051', hours: 60 },
    { name: 'Computação em Nuvem', code: 'UFSM00516', hours: 60 },
    { name: 'Desenvolvimento de Software Educacional', code: 'DLSC817', hours: 60 },
    { name: 'Desenvolvimento de Software Para a Web', code: 'ELC1090', hours: 60 },
    { name: 'Engenharia de Ontologias', code: 'DLSC815', hours: 60 },
    { name: 'Gerência de Redes', code: 'ELC616', hours: 60 },
    { name: 'Internet das Coisas', code: 'DLSC808', hours: 60 },
    { name: 'Libras: Bacharelado', code: 'EDE1131', hours: 60 },
    { name: 'Linguagens de Marcação Extensíveis', code: 'ELC1092', hours: 60 },
    { name: 'Middleware Para Sistemas Distribuídos', code: 'ELC1089', hours: 60 },
    { name: 'Mineração de Dados', code: 'ELC1098', hours: 60 },
    { name: 'Modelagem de Processos de Negócios', code: 'ELC1093', hours: 60 },
    { name: 'Preparação Para Maratona de Programação I', code: 'ELC1096', hours: 30 },
    { name: 'Processamento Digital de Imagens', code: 'DCOM3105', hours: 60 },
    { name: 'Sistemas Colaborativos', code: 'ELC1097', hours: 60 },
    { name: 'Sistemas de Computação Móvel', code: 'ELC1001', hours: 60 },
    { name: 'Sistemas Inteligentes', code: 'ELC1104', hours: 60 },
    { name: 'Tecnologias de Informação e Computação Aplicada em Saúde', code: 'CLM1035', hours: 45 },
    { name: 'Tópicos em Computação Avançada', code: 'DCG2065', hours: 60 },
    { name: 'Tópicos em Formação Complementar e Humanística', code: 'DCG2063', hours: 60 },
    { name: 'Tópicos em Fundamentos da Computação', code: 'DCG2066', hours: 60 },
    { name: 'Tópicos em Gestão Empresarial', code: 'DCG2064', hours: 60 },
    { name: 'Tópicos em Sistemas de Informação', code: 'DCG1165', hours: 60 },
    { name: 'Criptografia Para Segurança de Dados', code: 'DLSC811', hours: 60 },
    { name: 'Laboratório de Orientação a Objetos', code: 'DLSC813', hours: 60 },
    { name: 'Lógica Para Inteligência Artificial e Games', code: 'DLSC810', hours: 60 },
    { name: 'Tópicos Especiais em Linguagens Formais', code: 'DLSC812', hours: 15 },
  ],
};

function App() {
  return (
    <div className="App">
      <Header />
      <h1 className="nomeCurso">Bacharelado em Sistemas de Informação</h1>
      <div className="dropboxes">
        {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
          <Accordion key={semester} title={semester} subjects={subjects} />
        ))}
      </div>
    </div>
  );
}

export default App;
