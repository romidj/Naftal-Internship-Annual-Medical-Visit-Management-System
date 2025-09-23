import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../component/layout";
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faComputer } from '@fortawesome/free-solid-svg-icons';

const Employe = () => {
    const { directionId, directionName } = useParams();
    const [rows, setRows] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:8800/api/user/direction/${directionId}/employees`)
            .then(response => {
                const formattedData = response.data.map((employee) => ({
                    id: employee.employee_id,
                    Username: employee.employee_name,
                    Outlook: employee.outlook,
                    Telephone: employee.phone_nbr,
                    convo_state: employee.convo_state,
                    rdvState: employee.rdv_state,
                }));

                // Remove duplicates based on 'id'
                const uniqueRows = Array.from(new Set(formattedData.map(row => row.id)))
                    .map(id => formattedData.find(row => row.id === id));

                setRows(uniqueRows);
            })
            .catch(error => {
                console.error('There was an error fetching the employee data!', error);
            });
    }, [directionId]);


    const handleRdvStateChange = (id) => {
        axios.post(`http://localhost:8800/api/user/employees/${id}/update-rdv-state`, { rdv_state: 'termine' })
            .then(response => {
                setRows(rows.map(row => {
                    if (row.id === id) {
                        return { ...row, rdvState: 'termine' };
                    }
                    return row;
                }));
            })
            .catch(error => {
                console.error('Failed to update RDV state', error);
            });
    };

    const handleSelectionModelChange = (newSelection) => {
        setSelectedEmployees(newSelection);
    };

    console.log(selectedEmployees)

    const handleGenerateConvo = () => {
        if (selectedEmployees.length > 0) {
            navigate('/add_convo', {
                state: {
                    selectedEmployees: selectedEmployees.map(id => rows.find(row => row.id === id)?.Outlook || ''), selectedEmployeesIds: selectedEmployees.map(id => rows.find(row => row.id === id)?.id)
                        .filter(id => id)
                }
            });
        } else {
            alert('Please select at least one employee before generating the convocation.');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'Username', headerName: 'Nom et prénom', width: 180 },
        { field: 'Outlook', headerName: 'Outlook', width: 150 },
        { field: 'Telephone', headerName: 'Téléphone', width: 120 },
        { field: 'convo_state', headerName: 'État de convocation', width: 180 },
        {
            field: 'rdvState', headerName: 'État  RDV', width: 140,
            renderCell: (params) => {
                // Check if convo_state is 'sent'
                if (params.row.convo_state === 'sent') {
                    // Allow clicking on "Terminer" only if rdvState is 'en_attente'
                    return params.value === 'en_attente' ? (
                        <button className="terminer" onClick={() => handleRdvStateChange(params.row.id)}>
                            Terminer
                        </button>
                    ) : (
                        <span>{params.value}</span>
                    );
                } else {
                    // If convo_state is not 'sent', just display 'en attente'
                    return <span>En attente</span>;
                }
            },
        },
        {
            field: 'plus',
            headerName: '',
            width: 10,
            renderCell: (params) => {
                return (
                    <Link to={`/Employees/${params.row.id}`}>
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
                    <FontAwesomeIcon className="icon" icon={faComputer} />
                    <p>Direction {directionName}</p>
                </div>
                <div className="buttons">
                    <button onClick={handleGenerateConvo} className="select">Générer convocation</button>
                </div>
            </div>
            <div style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    headerHeight={headerHeight}
                    rowHeight={rowHeight}
                    pageSize={rows.length}
                    rowsPerPageOptions={[rows.length]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionModelChange}
                    isRowSelectable={(params) => params.row.convo_state === 'not_sent'}
                />
            </div>
        </Layout>
    );
};

export default Employe;
