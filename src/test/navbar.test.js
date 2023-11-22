import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Header from '../componentes/header';

describe('Header Component', () => {

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    it('renders correctly when authenticated', () => {
        const { getByText } = render(
        <Auth0Provider
            domain={domain} 
            clientId={clientId}
            redirectUri={window.location.origin}
        >
            <Router>
            <Header />
            </Router>
        </Auth0Provider>
        );

        const linkElement = getByText('Reuniones Agendadas');
        expect(linkElement).toBeInTheDocument();
    });

    it('renders correctly when not authenticated', () => {
        const { queryByText } = render(
        <Auth0Provider
            domain={domain} 
            clientId={clientId}
            redirectUri={window.location.origin}
        >
            <Router>
            <Header />
            </Router>
        </Auth0Provider>
        );

        const linkElement = queryByText('Reuniones Agendadas');
        expect(linkElement).toBeNull();
    });

});