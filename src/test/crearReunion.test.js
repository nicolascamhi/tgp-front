import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CrearReunion from '../componentes/crearReunion';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

describe('CrearReunion Component', () => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    it('renders the form and allows submission with valid data', async () => {
        const { getByLabelText, getByText } = render(
            <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
                <Router>
                    <CrearReunion />
                </Router>
            </Auth0Provider>
        );

        // Simula la entrada de datos en el formulario
        fireEvent.change(getByLabelText('Cliente:'), { target: { value: 'Cliente de Prueba' } });
        fireEvent.change(getByLabelText('Correo de Contacto:'), { target: { value: 'cliente@ejemplo.com' } });
        // Añade más campos según sea necesario

        // Simula el envío del formulario
        fireEvent.click(getByText('Crear Reunión'));

        // Espera a que se muestre un mensaje de éxito o redirección
        await waitFor(() => {
            expect(getByText('Reunión creada exitosamente')).toBeInTheDocument();
        });
    });

    // Puedes añadir más pruebas para validar la entrada incorrecta, manejo de errores, etc.
});