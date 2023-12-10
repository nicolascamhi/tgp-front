import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/detalleReunion.css';
import { useAuth0 } from '@auth0/auth0-react';
// import ReunionesAgendadas from './reunionesAgendadas';



const backendURL = process.env.REACT_APP_BACKEND_URL;

const EditarReunion = () => {

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();


  const [fechaReunion, setfechaReunion] = useState(new Date());
  const [description, setDescription] = useState();
  const { id } = useParams();
  

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

  const [userObj, setUserObj] = useState({});

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



  useEffect(() => {
    const fetchReuniones = async () => {
        try {
            const response = await axios.get(meetingURL, {
              headers: {
                Authorization: user.sub,
              },
            });
            setReuniones(response.data);
        } catch (error) {
            console.error('Error al obtener las reuniones:', error);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchReuniones();
  }, [isAuthenticated, user, getAccessTokenSilently, meetingURL]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
      var route = `${backendURL}/meetings/${id}`;
       if (userObj.role === 'ADMIN') {
         route = `${backendURL}/admin/meetings/${id}`;
       }

       const response = await axios.put(route, {
        headers: {
          Authorization: user.sub,
        },
         description: description,
         fechaReunion: fechaReunion,

       });
       // console.log(response.data);
       if (response.status === 200) {
         alert('Reunión editada');
         navigate("/reuniones-agendadas");
       }
       // Manejar la respuesta o redirigir
     } catch (error) {
       console.error(error);
       // Manejar el error
     }
   };


  if (!reuniones) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    {
      isAuthenticated && (userObj.role === "WORKER" || userObj.role === "ADMIN") && (
        <>
          <div className="detalle-reunion">
          <h2>Detalle de la Reunión {id}</h2>
          <p>Cliente: {reuniones.clientName}</p>
          {/* <p>Cliente: {user_metadata['company']}</p> */}          
          <div>
              <label htmlFor="fechaReunion" className="form-label">
                Nueva fecha de Reunión:
                <p>Fecha de Reunión actual: {reuniones.fechaReunion}</p>
              </label>
              <DatePicker
                selected={fechaReunion}
                onChange={(date) => setfechaReunion(date)}
                id="fechaReunion"
                className="form-input"
              />
            </div>
          <div>
              <label htmlFor="cliente" className="form-label">
              Descripción:
              <p>Descripción actual: {reuniones.description}</p>
              </label>
              <input
                type="text"
                id="cliente"
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
              />
            </div>

            <button className="editar" onClick={handleSubmit}>Editar</button>
            

        </div>
        </>
      )
    } 

    {
      !isAuthenticated && (
        <div className="tarjeta-profile">
                <h1>Editar Reunion</h1>
                <p>Tienes que iniciar sesión para ver lo detalles de una reunión</p>
            </div>
      )
    }
    </>
  );
};

export default EditarReunion;