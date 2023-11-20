import React from 'react';

const DetalleTarjeta = ({ match }) => {
  // Aquí puedes obtener el ID de la tarjeta desde el objeto 'match' si lo necesitas
  return (
    <div>
      <h2>Detalle de la Tarjeta {match.params.id}</h2>
      {/* Más detalles de la tarjeta aquí */}
    </div>
  );
};

export default DetalleTarjeta;
