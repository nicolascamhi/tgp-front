import React from 'react';
import '../styles/header.css'; // Asegúrate de que la ruta sea correcta

function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="header-nav">
                    <li className="header-nav-item"><a href="/" className="header-nav-link">Inicio</a></li>
                    <li className="header-nav-item"><a href="/about" className="header-nav-link">Acerca de</a></li>
                    <li className="header-nav-item"><a href="/services" className="header-nav-link">Servicios</a></li>
                    <li className="header-nav-item"><a href="/contact" className="header-nav-link">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
