import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../component/layout";
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHome } from '@fortawesome/free-solid-svg-icons';


function Convocation() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/api/user/direction')
            .then(response => {
                // Transform the response data if necessary to match the structure expected by DataGrid
                const formattedData = response.data.map((item, index) => ({
                    id: item.direction_id,
                    direction: item.direction_name,
                    nbr_empoyes: item.number_of_employees,
                    // Add default or calculated values for other fields if needed
                    Convo_reçu: item.number_of_sent_convocations, // Placeholder value
                    rdv_terminé: item.number_of_termine_rdv, // Placeholder value
                    bon_consultation: 0, // Placeholder value
                }));
                setRows(formattedData);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'direction', headerName: 'Direction', width: 150 },
        { field: 'nbr_empoyes', headerName: "Nombres d'employees", width: 160 },
        { field: 'Convo_reçu', headerName: 'Convocation reçu ', width: 150 },
        { field: 'rdv_terminé', headerName: 'RDV terminé ', width: 150 },
        { field: 'bon_consultation', headerName: 'Bon consultation généré ', width: 200 },
        {
            field: 'actioN',
            headerName: 'Voir plus',
            width: 70,
            renderCell: (params) => {
                return (
                    <Link to={`/direction/${params.row.id}/${encodeURIComponent(params.row.direction)}`}>
                        <FontAwesomeIcon className="icon-info" icon={faCircleInfo} />
                    </Link>
                )
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
                    <p>Acceuil</p>
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

export default Convocation;
