import React from "react";
import { render, screen } from '@testing-library/react';
import LandingPage from "../componentes/Landing";


describe("LandingPage", () => {
    test("renders LandingPage component", () => {
        render(<LandingPage />);
        const element = screen.getByText("¡Gestionar las reuniones nunca fue más fácil!");
        expect(element).toBeTruthy();
        // screen.debug();
    });
});