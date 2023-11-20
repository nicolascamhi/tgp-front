import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/detalleReunion.css';

const DetalleReunion = () => {
  const { id } = useParams();
  const [reunion, setReunion] = useState(null);

  useEffect(() => {

    // axios.get(`http://localhost:3001/tu-ruta-de-api/${id}`)
    //   .then(response => {
    //     setReunion(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error al obtener datos:', error);
    //   });

    // Data mock mientras el backend no esté listo
    const datosMock = [
      {
        id: "1",
        fechaCreacion: "2023-11-01",
        fechaReunion: "2023-11-20",
        cliente: "Empresa A",
        tamanoEmpresa: "Grande"
      },
      {
        id: "2",
        fechaCreacion: "2023-11-05",
        fechaReunion: "2023-11-22",
        cliente: "Empresa B",
        tamanoEmpresa: "Mediana"
      }
    ];

    const reunionEncontrada = datosMock.find(reunion => reunion.id === id);

    setReunion(reunionEncontrada);
  }, [id]);

  if (!reunion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalle-reunion">
      <h2>Detalle de la Reunión {id}</h2>
      <p>Cliente: {reunion.cliente}</p>
      <p>Fecha de Creación: {reunion.fechaCreacion}</p>
      <p>Fecha de Reunión: {reunion.fechaReunion}</p>
      <p>Tamaño de la Empresa: {reunion.tamanoEmpresa}</p>
      {/* Opciones de editar y eliminar */}
      <div>
        <Link to={`/editar-reunion/${id}`}>
          <button className="editar">Editar</button>
        </Link>
        <Link to={`/eliminar-reunion/${id}`}>
        <button className="eliminar">Eliminar</button>
        </Link>
      </div>
    </div>
  );
};

export default DetalleReunion;
