import React, { useState, useEffect } from 'react';
import Layout from '../component/layoutMedcin.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EnAttente() {
    const [rows, setRows] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8800/api/medecin/listeEmpEnAttente')
            .then(response => {
                const formattedData = response.data.map((item) => ({
                    id: `${item.convo_year}-${item.id_convo}`, 
                    employee_id: item.employee_id,
                    convoYear: item.convo_year,
                    idConvo: item.id_convo,
                    nomPrenom: item.employee_name,
                    date_rdv: item.rdv_date,
                    heure_rdv: item.rdv_hour,
                    convo_state: item.convo_state,
                    centre_medical: item.centre_medical,
                    medecin: item.medecin,
                    direction: item.direction_name
                }));
                setRows(formattedData);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);



    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'nomPrenom', headerName: 'Nom et Prenom', width: 180 },
        { field: 'date_rdv', headerName: 'Date de RDV', width: 130 },
        { field: 'heure_rdv', headerName: 'Heure de RDV', width: 130 },
        { field: 'centre_medical', headerName: 'Centre médical', width: 120 },
        { field: 'medecin', headerName: 'Médecin', width: 160 },
        {
            field: 'plus',
            headerName: 'Plus',
            width: 10,
            renderCell: (params) => {
                console.log(params.row.employee_id);
                return (
                    
                    <Link to={`/infoPatient/${params.row.employee_id}`}>
                        <FontAwesomeIcon className="icon" icon={faCircleChevronRight} />
                    </Link>
                );
            }
        },
    ];

    const rowHeight = 52;
    const headerHeight = 56;

    return (
        <Layout>
            <div className="header">
                <div className="title">
                    <FontAwesomeIcon className="icon" icon={faHome} />
                    <p>Accueil</p>
                </div>
            </div>
            <div style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                <DataGrid
                    className="data-grid"
                    rows={rows}
                    columns={columns}
                    headerHeight={headerHeight}
                    rowHeight={rowHeight}
                    pageSize={rows.length}
                    rowsPerPageOptions={[rows.length]}
                />
            </div>
        </Layout>
    );
}

export default EnAttente;
