import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/tarjeta.css';
import Header from './componentes/header';
import Tarjeta from './componentes/tarjeta';
import CrearReunion from './componentes/crearReunion';
import DetalleReunion from './componentes/detalleReunion';
import Home from './pages/Home';
import ReunionesAgendadas from './componentes/reunionesAgendadas';

function App() {

  const [reuniones, setReuniones] = useState([]);

  useEffect(() => {
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
          <Route path="/" element={<Home />} />
          <Route path="/crear-reunion" element={<CrearReunion />} />
          <Route path="/detalle-reunion/:id" element={<DetalleReunion reuniones={reuniones} />} />
          <Route path="/reuniones-agendadas" element={< ReunionesAgendadas/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
