import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Agrega Link
import './App.css';
import './styles/tarjeta.css';
import Header from './componentes/header';
import CrearReunion from './componentes/crearReunion';
import ReunionesAgendadas from './componentes/reunionesAgendadas';
import DetalleReunion from './componentes/detalleReunion';
import Home from './pages/Home';


export default function App() {
  
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/crear-reunion" element={<CrearReunion />} />
          <Route
            path="/detalle-reunion/:id"
            element={<DetalleReunion />}
            // element={<DetalleReunion reuniones={reuniones} />}
          />
          <Route
            path="/reuniones-agendadas"
            element={<ReunionesAgendadas />}
          />
        </Routes>
      </div>
    </Router>
  );
}
