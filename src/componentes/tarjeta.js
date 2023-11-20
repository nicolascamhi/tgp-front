import React from 'react';

function Tarjeta({ reunion }) {
    return (
        <div className="tarjeta">
            <p>Fecha de Creación: {reunion.fechaCreacion}</p>
            <p>Fecha de Reunión: {reunion.fechaReunion}</p>
            <p>Cliente: {reunion.cliente}</p>
            <p>Tamaño de la Empresa: {reunion.tamanoEmpresa}</p>
        </div>
    );
}

export default Tarjeta;
