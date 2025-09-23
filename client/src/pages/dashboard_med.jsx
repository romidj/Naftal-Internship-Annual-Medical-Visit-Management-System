import React, { useState, useEffect } from "react";
import Layout from "../component/layoutMedcin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faHourglassHalf, faCircleXmark, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const DashbordMed = () => {
    const [dashbord, setDashbord] = useState({
        total_employees: null,
        total_sent_convocations: null,
        total_rdv_en_attente: null,
        total_rdv_rate: null,
        total_rdv_termine: null,
    });

    useEffect(() => {
        axios.get('http://localhost:8800/api/user/dashbord')
            .then(response => {
                setDashbord(response.data[0]);
            })
            .catch(error => {
                console.error('The error:', error);
            });
    }, []);

    return (
        <Layout>

            <h1 className="bienvenue">Bienvenu cher Medecin ...</h1>
            <div className="d_container">
                <div className="dashbord">

                    <div className="rdv_en_attente">
                        <div className="title">
                            <FontAwesomeIcon className="icon-info" icon={faHourglassHalf} />
                            Rendez-vous en attente
                        </div>
                        <p>{dashbord.total_rdv_en_attente}/{dashbord.total_employees}</p>
                    </div>
                    <div className="rdv_termine">
                        <div className="title">
                            <FontAwesomeIcon className="icon-info" icon={faCalendarCheck} />
                            Rendez-vous Terminés
                        </div>
                        <p>{dashbord.total_rdv_termine}/{dashbord.total_employees}</p>
                    </div>

                    <div className="sent_convos">
                        <div className="title">
                            <FontAwesomeIcon className="icon-info" icon={faCircleXmark} />
                            Rendez-vous ratés
                        </div>
                        <p>{dashbord.total_rdv_rate}/{dashbord.total_employees}</p>
                    </div>

                </div>


            </div>
        </Layout >
    );
};

export default DashbordMed
    ;
