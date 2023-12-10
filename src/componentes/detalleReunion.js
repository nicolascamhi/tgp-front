import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/detalleReunion.css';
import { useAuth0 } from '@auth0/auth0-react';


const backendURL = process.env.REACT_APP_BACKEND_URL;

const DetalleReunion = () => {

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  
  const { id } = useParams();
  // const [reunion, setReunion] = useState(null);

  let roles;
  let user_metadata;

  if (user) {
      roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
      user_metadata = user['https://tgp.me/user_metadata'];
  }

  let meetingURL;
  if (roles.includes('admin')) {
      meetingURL = `${backendURL}/admin/meetings/${id}`;
  } else if (user_metadata['company'] === 'TGP') {
      meetingURL = `${backendURL}/meetings/${id}`;
  } else {
      meetingURL = `${backendURL}/client/meetings/${id}`;
  }

  const [reuniones, setReuniones] = useState([]);


  useEffect(() => {
    const fetchReuniones = async () => {
        try {
            const response = await axios.get(meetingURL, {
                headers: {
                    'userId': user.sub,
                }
            });
            setReuniones(response.data);
        } catch (error) {
            console.error('Error al obtener las reuniones:', error);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchReuniones();
  }, [isAuthenticated, user, getAccessTokenSilently, meetingURL]);

  


  // useEffect(() => {

  //   // axios.get(`http://localhost:3001/tu-ruta-de-api/${id}`)
  //   //   .then(response => {
  //   //     setReunion(response.data);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error al obtener datos:', error);
  //   //   });

  //   // Data mock mientras el backend no esté listo
  //   const datosMock = [
  //     {
  //       id: "1",
  //       fechaCreacion: "2023-11-01",
  //       fechaReunion: "2023-11-20",
  //       cliente: "Empresa A",
  //       tamanoEmpresa: "Grande"
  //     },
  //     {
  //       id: "2",
  //       fechaCreacion: "2023-11-05",
  //       fechaReunion: "2023-11-22",
  //       cliente: "Empresa B",
  //       tamanoEmpresa: "Mediana"
  //     }
  //   ];

  //   const reunionEncontrada = datosMock.find(reunion => reunion.id === id);

  //   setReunion(reunionEncontrada);
  // }, [id]);

  if (!reuniones) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    {
      isAuthenticated && (
        <>
          <div className="detalle-reunion">
          <h2>Detalle de la Reunión {id}</h2>
          {/* <p>Cliente: {reunion.cliente}</p> */}
          <p>Cliente: {user_metadata['company']}</p>
          <p>Fecha de Creación: {reuniones.createdAt}</p>
          <p>Fecha de Reunión: {reuniones.fecha}</p>
          {/* <p>Tamaño de la Empresa: {reunion.tamanoEmpresa}</p> */}
          {/* Opciones de editar y eliminar */}
          {/* <div>
            <Link to={`/editar-reunion/${id}`}>
              <button className="editar">Editar</button>
            </Link>
            <Link to={`/eliminar-reunion/${id}`}>
            <button className="eliminar">Eliminar</button>
            </Link>
          </div> */}
        </div>
        </>
      )
    } 

    {
      !isAuthenticated && (
        <div className="tarjeta-profile">
                <h1>Detalle de reunión</h1>
                <p>Tienes que iniciar sesión para ver lo detalles de una reunión</p>
            </div>
      )
    }
    </>
  );
};

export default DetalleReunion;
