import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="header-nav">
          <li className="header-nav-item"><Link to="/" className="header-nav-link">Inicio</Link></li>
          <li className="header-nav-item"><Link to="/crear-reunion" className="header-nav-link">Crear Reunión</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
