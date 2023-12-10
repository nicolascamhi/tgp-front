import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const loginURL = `${backendURL}/auth/login`;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const [userIdSent, setUserIdSent] = useState(false);
  let roles;
  let user_metadata;
  if (user) {
    roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
    user_metadata = user['https://tgp.me/user_metadata'];
    console.log('user_metadata: ', user_metadata);
  }

  useEffect(() => {
    if (isAuthenticated && user && !userIdSent) {
      // Obtener el token de acceso de forma silenciosa
      getAccessTokenSilently()
        .then((token) => {
          let userObj;
          if (roles.includes('admin')) {
            userObj = { id: user.sub, role: 'ADMIN', email: user.email, name: user_metadata['name'], company: user_metadata['company'], country: user_metadata['country']};
          } else if (user_metadata['company'] === 'TGP') {
            userObj = { id: user.sub, role: 'WORKER', email: user.email, name: user.name };
          } else {
            userObj = { id: user.sub, role: 'CLIENT', email: user.email, name: user.name };
          }
          console.log('User a enviar al backend: ', userObj);
          axios
            .post(loginURL, userObj, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('User enviado al backend');
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error al enviar user al backend', error);
            });

          setUserIdSent(true);
        })
        .catch((error) => {
          console.error('Error obteniendo el token', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, userIdSent, getAccessTokenSilently]);

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    !isAuthenticated && (
      <button className="login-button" onClick={() => loginWithRedirect()}>
        LOG IN
      </button>
    )
  );
};

export default LoginButton;
