import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const loginURL = `${backendURL}/users/login`;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const [userIdSent, setUserIdSent] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user && !userIdSent) {
      // Obtener el token de acceso de forma silenciosa
      getAccessTokenSilently()
        .then((token) => {
          const userObj = { userId: user.sub, email: user.email, firstName: user.nickname};
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
