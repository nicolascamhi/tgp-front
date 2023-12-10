import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/tarjeta.css';
// import Tarjeta from './tarjeta.js';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const backendURL = process.env.REACT_APP_BACKEND_URL;
// const auth0Namespace = process.env.REACT_APP_AUTH0_NAMESPACE;


const ReunionesAgendadas = () => {	


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
    const [filtroCliente, setFiltroCliente] = useState('');

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

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 200 },
        { field: 'fechaReunion', headerName: 'Fecha de Reunión', width: 200 },
        // { field: 'cliente', headerName: 'Cliente', width: 200 },
        {
            field: 'cliente',
            headerName: 'Cliente',
            width: 200,
            valueGetter: (params) => params.row.clientName || 'Sin Cliente',
          },
          { field: 'externalName', headerName: 'Empresa externa', width: 200 },
        { field: 'tamanoEmpresa', headerName: 'Tamaño de la Empresa', width: 200 },
        {
        field: 'verDetalle',
        headerName: 'Ver Detalle',
        width: 150,
        renderCell: (params) => (
            <Link to={`/detalle-reunion/${params.row.id}`}>Ver Detalle</Link>
        ),
        },
    ];

    // console.log('reuniones: ', reuniones);
    // const rows = reuniones.filter((reunion) =>
    //     reunion.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
    // );
    const rows = reuniones.filter((reunion) => {
        // Convertir todo a minúsculas para hacer la comparación insensible a mayúsculas
        const filtroMinuscula = filtroCliente.toLowerCase();
        const clientNameMinuscula = reunion.clientName.toLowerCase();
        const externalNameMinuscula = reunion.externalName ? reunion.externalName.toLowerCase() : '';
    
        // Comprobar si el filtroCliente coincide con clientName o externalName
        return clientNameMinuscula.includes(filtroMinuscula) || externalNameMinuscula.includes(filtroMinuscula);
    });
    

    return (
        <>
        {
            isAuthenticated && (
                <> 
                <br></br>
                <TextField
                    label="Filtrar por nombre empresa"
                    variant="outlined"
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    />
                </div>
                </>
                
            )
        } {(!isAuthenticated && (
            <div className="tarjeta-profile">
                <h1>Reuniones Agendadas</h1>
                <p>Para ver las reuniones agendadas, por favor inicia sesión.</p>
            </div>
            )
        )
        }   
        
        </>
    )

}; 

export default ReunionesAgendadas;