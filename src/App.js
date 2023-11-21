import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Agrega Link
import './App.css';
import './styles/tarjeta.css';
import Header from './componentes/header';
import CrearReunion from './componentes/crearReunion';
import DetalleReunion from './componentes/detalleReunion';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function App() {
  const [reuniones, setReuniones] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');

  useEffect(() => {
    // Simulación de obtención de datos
    const datosMock = [
      {
        id: '1',
        fechaCreacion: '2023-11-01',
        fechaReunion: '2023-11-20',
        cliente: 'Empresa A',
        tamanoEmpresa: 'Grande',
      },
      {
        id: '2',
        fechaCreacion: '2023-11-05',
        fechaReunion: '2023-11-22',
        cliente: 'Empresa B',
        tamanoEmpresa: 'Mediana',
      },
    ];
    setReuniones(datosMock);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 200 },
    { field: 'fechaReunion', headerName: 'Fecha de Reunión', width: 200 },
    { field: 'cliente', headerName: 'Cliente', width: 200 },
    { field: 'tamanoEmpresa', headerName: 'Tamaño de la Empresa', width: 200 },
    {
      field: 'verDetalle',
      headerName: 'Ver Detalle',
      width: 150,
      renderCell: (params) => (
        <Link to={`/detalle-reunion/${params.row.id}`}>Ver Detalle</Link>
      ),
    },
  ];

  const rows = reuniones.filter((reunion) =>
    reunion.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/crear-reunion" element={<CrearReunion />} />
          <Route
            path="/detalle-reunion/:id"
            element={<DetalleReunion reuniones={reuniones} />}
          />
          <Route
            path="/"
            element={
              <>
                <h1>Reuniones Agendadas</h1>
                <TextField
                  label="Filtrar por Cliente"
                  variant="outlined"
                  value={filtroCliente}
                  onChange={(e) => setFiltroCliente(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                  />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
