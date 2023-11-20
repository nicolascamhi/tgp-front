import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reuniones, setReuniones] = useState([]);

  useEffect(() => {
    // Aquí iría el llamado a Axios para obtener los datos reales.
    // Por ahora, usaremos datos mock.
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
      <h1>Reuniones Agendadas</h1>
      <div className="reuniones-container">
        {reuniones.map(reunion => (
          <div key={reunion.id} className="tarjeta">
            <p>Fecha de Creación: {reunion.fechaCreacion}</p>
            <p>Fecha de Reunión: {reunion.fechaReunion}</p>
            <p>Cliente: {reunion.cliente}</p>
            <p>Tamaño de la Empresa: {reunion.tamanoEmpresa}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
