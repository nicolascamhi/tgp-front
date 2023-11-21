import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-links">
          <Link to="/" className="header-nav-link">Inicio</Link>
          <Link to="/crear-reunion" className="header-nav-link">Crear Reunión</Link>
        </div>
        <div className="header-nav-auth">
          <LoginButton />
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}

export default Header;
