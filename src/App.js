import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Agrega Link
import './App.css';
import './styles/tarjeta.css';
import Header from './componentes/header';
import CrearReunion from './componentes/crearReunion';
import ReunionesAgendadas from './componentes/reunionesAgendadas';
import DetalleReunion from './componentes/detalleReunion';
import Home from './pages/Home';
import ReunionCreada from './componentes/reunionCreada';
import EditarReunion from './componentes/editarReunion';
import EliminarReunion from './componentes/eliminarReunion';
import ReunionEliminada from './componentes/reunionEliminada';
import Dashboard from './componentes/dashboard';


export default function App() {
  
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/crear-reunion" element={<CrearReunion />} />
          <Route path="/reunion-creada" element={<ReunionCreada />} />
          <Route path="/reunion-eliminada" element={<ReunionEliminada />} />
          <Route
            path="/detalle-reunion/:id"
            element={<DetalleReunion />}
            // element={<DetalleReunion reuniones={reuniones} />}
          />
          <Route
            path="/reuniones-agendadas"
            element={<ReunionesAgendadas />}
          />
          <Route
            path="/editar-reunion/:id"
            element={<EditarReunion />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/eliminar-reunion/:id"
            element={<EliminarReunion />}
          />
        </Routes>
      </div>
    </Router>
  );
}
