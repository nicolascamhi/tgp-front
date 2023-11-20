import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import '../styles/crearReunion.css';

function CrearReunion() {
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaReunion, setFechaReunion] = useState('');
  const [cliente, setCliente] = useState('');
  const [tamanoEmpresa, setTamanoEmpresa] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al backend
      await axios.post('http://localhost:3001/reuniones', {
        fechaCreacion,
        fechaReunion,
        cliente,
        tamanoEmpresa,
        // Agrega más atributos aquí
      });
      // Manejar la respuesta o redirigir
    } catch (error) {
      console.error(error);
      // Manejar el error
    }
  };

  return (
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
        <button type="submit" className="form-button">
          Crear Reunión
        </button>
      </form>
    </div>
  );
}

export default CrearReunion;
