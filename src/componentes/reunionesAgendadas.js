import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/tarjeta.css';
import Tarjeta from './tarjeta.js';


const ReunionesAgendadas = () => {	
  const [reuniones, setReuniones] = useState([]);

  useEffect(() => {

    // axios.get('http://localhost:3001/ruta')
    //   .then(response => {
    //     setReuniones(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error al obtener datos:', error);
    //   });

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
    setReuniones(datosMock);
  }, []);

  return (
      <div className="app">

            <>
              <h1>Reuniones Agendadas</h1>
              <div className="reuniones-container">
                {reuniones.map(reunion => (
                  <Tarjeta key={reunion.id} reunion={reunion} />
                ))}
              </div>
            </>

      </div>

  );
}

export default ReunionesAgendadas;
