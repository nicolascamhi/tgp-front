import React, { useState } from 'react';
import axios from 'axios';

function CrearReunion() {
    const [fechaReunion, setFechaReunion] = useState('');
    const [cliente, setCliente] = useState('');
    // Asegúrate de definir estados para otros campos si los necesitas

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/reuniones', {
                fechaReunion,
                cliente,
                // ... otros datos
            });
            // Manejar la respuesta o redirigir
        } catch (error) {
            console.error(error);
            // Manejar el error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="date" 
                value={fechaReunion} 
                onChange={(e) => setFechaReunion(e.target.value)} 
            />
            <input 
                type="text" 
                value={cliente} 
                onChange={(e) => setCliente(e.target.value)} 
            />
            {/* Otros campos del formulario */}
            <button type="submit">Crear Reunión</button>
        </form>
    );
}

export default CrearReunion;
