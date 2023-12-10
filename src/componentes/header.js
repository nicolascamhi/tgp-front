import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userObj, setUserObj] = useState({});



  let roles;
  let user_metadata;
  if (user) {
    roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
    user_metadata = user['https://tgp.me/user_metadata'];
    // console.log('user_metadata: ', user_metadata);
  }

  useEffect(() => {
    if (isAuthenticated && user) {

      getAccessTokenSilently()
        // .then((token) => {
        .then(() => {
          let userObj;
          if (roles.includes('admin')) {
            userObj = { id: user.sub, role: 'ADMIN', email: user.email, name: user_metadata['name'], company: user_metadata['company'], country: user_metadata['country']};
            setUserObj(userObj);
          } else if (user_metadata['company'] === 'TGP') {
            userObj = { id: user.sub, role: 'WORKER', email: user.email, name: user.name };
            setUserObj(userObj);
          } else {
            userObj = { id: user.sub, role: 'CLIENT', email: user.email, name: user.name };
            setUserObj(userObj);
          }
          // console.log('Info del usuario: ', userObj);
        })
        .catch((error) => {
          console.error('Error obteniendo el token', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-links">
          <Link to="/" className="header-nav-link">Inicio</Link>
          {
            isAuthenticated && (
              <>
              <Link to="/reuniones-agendadas" className="header-nav-link">Reuniones Agendadas</Link>
              {
                (userObj.role === "WORKER" || userObj.role === "ADMIN") && (
                  <Link to="/crear-reunion" className="header-nav-link">Crear Reunión</Link>
                )
              }
              
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
