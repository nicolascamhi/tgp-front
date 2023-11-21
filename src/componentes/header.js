import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {

  const { isAuthenticated } = useAuth0();

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-links">
          <Link to="/" className="header-nav-link">Inicio</Link>
          {
            isAuthenticated && (
              <>
              <Link to="/reuniones-agendadas" className="header-nav-link">Reuniones Agendadas</Link>
              <Link to="/crear-reunion" className="header-nav-link">Crear Reunión</Link>
              </>
            )
          }
          
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
