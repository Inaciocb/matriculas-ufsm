// src/Header.js
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        UFSM
      </div>
      <div className="header-right">
        <FaUserCircle className="user-icon" />
        <span>Inácio Camargo Buemo</span>
        <MdArrowDropDown className="dropdown-icon" />
      </div>
    </header>
  );
};

export default Header;
