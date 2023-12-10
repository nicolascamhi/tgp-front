import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/tarjeta.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { DataGrid } from '@mui/x-data-grid';
// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
// import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// import Tarjeta from './tarjeta.js';


const backendURL = process.env.REACT_APP_BACKEND_URL;
// const auth0Namespace = process.env.REACT_APP_AUTH0_NAMESPACE;



const Dashboard = () => {	

    const obtenerDatosPorMes = () => {
        const conteoPorMes = new Array(12).fill(0); // Inicializa un array para cada mes del año
    
        reuniones.forEach(reunion => {
            const fecha = new Date(reunion.fechaCreacion);
            const mes = fecha.getMonth(); // Obtén el mes (0-11)
            conteoPorMes[mes] += 1; // Incrementa el conteo para ese mes
        });
    
        return conteoPorMes;
    };
    
    
    
    const obtenerDatosPorCliente = () => {
        const conteoPorCliente = {}; // Objeto para almacenar el conteo
        reuniones.forEach(reunion => {
            const cliente = reunion.clientName;
            conteoPorCliente[cliente] = (conteoPorCliente[cliente] || 0) + 1; // Incrementa el conteo para ese cliente
        });
        return {
            clientNames: Object.keys(conteoPorCliente), // Nombres de los clientes
            conteos: Object.values(conteoPorCliente) // Conteos por cliente
        };
    };
    

    
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    let roles;
    let user_metadata;

    if (user) {
        roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
        user_metadata = user['https://tgp.me/user_metadata'];
    }

    let meetingURL;
    if (roles.includes('admin')) {
        meetingURL = `${backendURL}/admin/meetings`;
    } else if (user_metadata['company'] === 'TGP') {
        meetingURL = `${backendURL}/meetings`;
    } else {
        meetingURL = `${backendURL}/client/meetings`;
    }

    // console.log('meetingURL: ', meetingURL);


    const [reuniones, setReuniones] = useState([]);
    // const [filtroCliente, setFiltroCliente] = useState('');

    useEffect(() => {
        const fetchReuniones = async () => {
            try {
                const response = await axios.get(meetingURL, {
                    headers: {
                Authorization: user.sub,
              },
                });
                setReuniones(response.data);
            } catch (error) {
                console.error('Error al obtener las reuniones:', error);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchReuniones();
    }, [isAuthenticated, user, getAccessTokenSilently, meetingURL]);

    console.log('reuniones: ', reuniones);
    // const rows = reuniones.filter((reunion) =>
    //     reunion.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
    // );
    const datosClientes = obtenerDatosPorCliente();

    return (
        <>
            <div className="grafico-container">
                <Bar
                    data={{
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        datasets: [{
                            label: 'Reuniones por Mes',
                            data: obtenerDatosPorMes(),
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        }],
                    }}
                />
            </div>

            <div className="grafico-container">
                <Bar
                    data={{
                        labels: datosClientes.clientNames,
                        datasets: [{
                            label: 'Reuniones por Cliente',
                            data: datosClientes.conteos,
                            backgroundColor: 'rgba(255, 193, 7, 0.5)',
                        }],
                    }}
                />
            </div>
        </>
    );
};

export default Dashboard;