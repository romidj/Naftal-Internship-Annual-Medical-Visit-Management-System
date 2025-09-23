import React, { useState } from 'react';
import Layout from '../component/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function AddConvo() {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure selectedEmployees directly from location.state
    const { selectedEmployees = [], selectedEmployeesIds = [] } = location.state || {};


    const [inputs, setInputs] = useState({
        rdv_date: "",
        rdv_hour: "",
        centre_medical: "",
        medecin: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { rdv_date, rdv_hour, centre_medical, medecin } = inputs;
        const message = `Bonjour, Je vous informe que vous aurez rendez-vous le ${rdv_date} à ${rdv_hour} dans le centre medical ${centre_medical}. Médecin : ${medecin}.`;

        const userPassword = prompt("Please enter your email password:");

        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
            alert('No JWT token found. Please log in.');
            return;
        }
        console.log("Sending request with data:", {
            selectedEmployees,
            message,
            userPassword,
            selectedEmployeesIds,
            rdv_date,
            rdv_hour,
            centre_medical,
            medecin
        });

        try {
            console.log("Sending request...");
            const response = await axios.post('http://localhost:8800/api/email/emailSend', {
                selectedEmployees,
                message,
                userPassword,
                selectedEmployeesIds,
                rdv_date,
                rdv_hour,
                centre_medical,
                medecin
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            console.log("Response:", response.data);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error.response ? error.response.data : error.message);
            alert('Failed to send email.');
        }
    };

    if (selectedEmployees.length === 0) {
        return (
            <Layout>
                <div className="error">
                    <p>No employees selected. Please go back and select employees.</p>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </Layout>
        );
    }
    const today = new Date().toISOString().split('T')[0];

    // Get today's date in YYYY-MM-DD format

    return (
        <Layout>
            <div className="add_emp">
                <div className="header">
                    <div className="title">
                        <FontAwesomeIcon className="icon" icon={faComputer} />
                        <p>Direction informatique</p>
                    </div>
                    <FontAwesomeIcon className='icon' icon={faChevronRight} />
                    <div className="title">
                        <FontAwesomeIcon className='icon' icon={faEnvelope} />
                        <p>Envoyer Messages</p>
                    </div>
                </div>
                <div className="bigContainer">
                    <div className="container">
                        <div className="sub_header">
                            <span className='span1'>Details Rendez-vous</span>
                            <button className='Submit-btn' onClick={handleSubmit}>Envoyer Message</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="info1">
                                <div className="label">
                                    <label>Date de rendez-vous</label>
                                    <input
                                        type="date"
                                        name="rdv_date"
                                        placeholder="Enter the date"
                                        onChange={handleChange}
                                        min={today}
                                        required // This should set the earliest selectable date to today
                                    />
                                </div>

                                <div className="label">
                                    <label>Heure de rendez-vous</label>
                                    <input
                                        type="time"
                                        name="rdv_hour"
                                        placeholder="Entrer l'heure de rendez-vous"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="info2">
                                <div className="label">
                                    <label>Centre Medical</label>
                                    <input
                                        type="text"
                                        name="centre_medical"
                                        placeholder="Quel centre medical ?"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="label">
                                    <label>Nom de medecin</label>
                                    <input
                                        type="text"
                                        name="medecin"
                                        placeholder='Entrer le nom de medecin'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddConvo;
