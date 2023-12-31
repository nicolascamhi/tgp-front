import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import '../styles/crearReunion.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';



function CrearReunion() {

  const navigate = useNavigate();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const [userObj, setUserObj] = useState({});
  const [fechaCreacion, setFechaCreacion] = useState(new Date());
  const [fechaReunion, setFechaReunion] = useState(new Date());
  const [cliente, setCliente] = useState('');
  const [tamanoEmpresa, setTamanoEmpresa] = useState(null);
  const [empresaExterna, setEmpresaExterna] = useState(null);
  const [correoContacto, setCorreoContacto] = useState('');
  const [correoValido, setCorreoValido] = useState(true);
  const [inputTouched, setInputTouched] = useState(false);
  const [description, setDescription] = useState('Reunión creada desde el frontend');


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



  const validarCorreo = (correo) => {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexCorreo.test(correo);
  };

  const handleCorreoChange = (e) => {
    const correo = e.target.value;
    setCorreoContacto(correo);
    setInputTouched(true);
    setCorreoValido(validarCorreo(correo));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fechaCreacion || !fechaReunion || !cliente || !tamanoEmpresa || !correoContacto) {
      // Puedes mostrar un mensaje de error o realizar alguna otra acción aquí
      alert('Por favor llena todos los campos');
      return;
    }
    try {
      var route = 'http://localhost:3001/meetings';
      if (userObj.role === 'ADMIN') {
        route = 'http://localhost:3001/admin/meetings';
      }

      const response = await axios.post(route, {
        description: description,
        fechaCreacion: fechaCreacion,
        fechaReunion: fechaReunion,
        tamanoEmpresa: tamanoEmpresa.value,
        clientMail: correoContacto,
        userId: userObj.id,
        clientName: cliente,
        externalName: empresaExterna
      });
      // console.log(response.data);
      if (response.status === 200) {
        alert('Reunión creada exitosamente');
        navigate("/reuniones-agendadas");
      }
      // Manejar la respuesta o redirigir
    } catch (error) {
      console.error(error);
      // Manejar el error
    }
  };

  


  return (
    <>
    {
      isAuthenticated && (userObj.role === "WORKER" || userObj.role === "ADMIN") && (
        <div className="form-container">
          <h2 className="text-2xl font-semibold mb-4">Crear Reunión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fechaCreacion" className="form-label">
                Fecha de Creación:
              </label>
              <DatePicker
                selected={fechaCreacion}
                onChange={(date) => setFechaCreacion(date)}
                id="fechaCreacion"
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="fechaReunion" className="form-label">
                Fecha de Reunión:
              </label>
              <DatePicker
                selected={fechaReunion}
                onChange={(date) => setFechaReunion(date)}
                id="fechaReunion"
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="cliente" className="form-label">
                Cliente:
              </label>
              <input
                type="text"
                id="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
            <div>
              <label htmlFor="empresaExterna" className="form-label">
                Empresa Externa:
              </label>
              <input
                type="text"
                id="empresaExterna"
                onChange={(e) => setEmpresaExterna(e.target.value)}
                className="form-input"
              />
            </div>
              <label htmlFor="tamanoEmpresa" className="form-label">
                Tamaño de la Empresa:
              </label>
              <Select
                id="tamanoEmpresa"
                value={tamanoEmpresa}
                onChange={(selectedOption) => setTamanoEmpresa(selectedOption)}
                options={[
                  { value: 'Pequeña', label: 'Pequeña' },
                  { value: 'Mediana', label: 'Mediana' },
                  { value: 'Grande', label: 'Grande' },
                ]}
              />
            </div>
            <div>
              <label htmlFor="correoContacto" className="form-label">
                Correo de Contacto:
              </label>
              <input
                type="email"
                id="correoContacto"
                value={correoContacto}
                onChange={handleCorreoChange}
                className={`form-input ${inputTouched && !correoValido ? 'invalid' : ''}`}
              />
              {inputTouched && !correoValido && (
                <p className="text-red-300">El correo ingresado no es válido.</p>
              )}
            </div>
            <div>
              <label htmlFor="cliente" className="form-label">
                Descripción:
              </label>
              <input
                type="text"
                id="cliente"
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button">
              Crear Reunión
            </button>
          </form>
        </div>
      )
    }
    {
      isAuthenticated && userObj.role !== "WORKER" && (
        <div className="tarjeta-profile">
            <h1>Crear reunión</h1>
            <p>Tienes que ser un trabajador para crear una reunión</p>
        </div>
      )
    }
    {
      !isAuthenticated && (
        <div className="tarjeta-profile">
                <h1>Crear reunión</h1>
                <p>Tienes que iniciar sesión para crear una reunión</p>
            </div>
      )
    }
    </>
    
  );
}

export default CrearReunion;
