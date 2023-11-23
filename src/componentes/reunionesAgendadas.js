import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../styles/tarjeta.css';
// import Tarjeta from './tarjeta.js';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const ReunionesAgendadas = () => {	


    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const [reuniones, setReuniones] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [userObj, setUserObj] = useState({});

    let roles;
    let user_metadata;
    if (user) {
        roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
        user_metadata = user['https://tgp.me/user_metadata'];
        console.log('user_metadata: ', user_metadata);
    }

    useEffect(() => {
        if (isAuthenticated && user) {

            getAccessTokenSilently()
            //   .then((token) => {
            .then(() => {
                let userObj;
                if (roles.includes('admin')) {
                  userObj = { id: user.sub, role: 'ADMIN', email: user.email, name: user_metadata['name'], company: user_metadata['company'], country: user_metadata['country']};
                  setUserObj(userObj);
                } else if (user_metadata['company'] === 'TGP') {
                  userObj = { id: user.sub, role: 'WORKER', email: user.email, name: user.name };
                  setUserObj(userObj);
                } else {
                  userObj = { id: user.sub, role: 'CLIENT', email: user.email, name: user.name };
                  setUserObj(userObj);
                }
                console.log('Info del usuario: ', userObj);
              })
              .catch((error) => {
                console.error('Error obteniendo el token', error);
              });
          }

        console.log('userObj: ', userObj);

        // const data = axios.post('http://localhost:3001/reuniones'); 
        // Simulación de obtención de datos
        const datosMock = [
        {
            id: '1',
            fechaCreacion: '2023-11-01',
            fechaReunion: '2023-11-20',
            cliente: 'Empresa A',
            tamanoEmpresa: 'Grande',
        },
        {
            id: '2',
            fechaCreacion: '2023-11-05',
            fechaReunion: '2023-11-22',
            cliente: 'Empresa B',
            tamanoEmpresa: 'Mediana',
        },
        ];
        setReuniones(datosMock);
    }, [isAuthenticated, user, getAccessTokenSilently, roles, user_metadata, userObj]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 200 },
        { field: 'fechaReunion', headerName: 'Fecha de Reunión', width: 200 },
        { field: 'cliente', headerName: 'Cliente', width: 200 },
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

    const rows = reuniones.filter((reunion) =>
        reunion.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
    );

    return (
        <>
        {
            isAuthenticated && (
                <> 
                <h1>Reuniones Agendadas</h1>
                <TextField
                    label="Filtrar por Cliente"
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