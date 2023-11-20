import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/tarjeta.css';
import Header from './componentes/header';
import Tarjeta from './componentes/tarjeta';
import CrearReunion from './componentes/crearReunion';
import DetalleReunion from './componentes/detalleReunion';

function App() {
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
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/crear-reunion" element={<CrearReunion />} />
          <Route path="/detalle-reunion/:id" element={<DetalleReunion reuniones={reuniones} />} />
          <Route path="/" element={
            <>
              <h1>Reuniones Agendadas</h1>
              <div className="reuniones-container">
                {reuniones.map(reunion => (
                  <Tarjeta key={reunion.id} reunion={reunion} />
                ))}
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
