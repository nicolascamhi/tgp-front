import React from 'react';
import { Link } from 'react-router-dom';

function Tarjeta({ reunion }) {
    return (
        <div className="tarjeta">
            <p>Fecha de Creación: {reunion.fechaCreacion}</p>
            <p>Fecha de Reunión: {reunion.fechaReunion}</p>
            <p>Cliente: {reunion.cliente}</p>
            <p>Tamaño de la Empresa: {reunion.tamanoEmpresa}</p>
            <Link to={`/detalle-reunion/${reunion.id}`}>Ver Detalles</Link>
        </div>
    );
}

export default Tarjeta;
