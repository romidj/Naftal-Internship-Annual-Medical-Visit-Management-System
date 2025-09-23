import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Layout from '../component/layoutMedcin';
import Logo from '../img/logo.png';
import { NavLink, useParams } from 'react-router-dom';
import Prescription from '../component/prescription';

function CreerOrdonnance() {
    const [medicament, setMedicament] = useState('');
    const [qte, setQte] = useState('');
    const [sexe, setSexe] = useState('');
    const [prescriptionItems, setPrescriptionItems] = useState([]);
    const [patientInfo, setPatientInfo] = useState({
        NomEtPrenom: '',
        dateNaissance: '',
        age: ''
    });
    const [doctorInfo, setDoctorInfo] = useState({
        doctorName: 'Dr. John Doe',
    });
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const { employeeId } = useParams();

    useEffect(() => {
        if (employeeId) {
            axios.get(`http://localhost:8800/api/user/employee/${employeeId}/info`)
                .then(response => {
                    const employee = response.data[0];
                    if (employee) {
                        const birthDate = new Date(employee.date_naissance);
                        const age = new Date().getFullYear() - birthDate.getFullYear();
                        setPatientInfo({
                            NomEtPrenom: employee.employee_name,
                            dateNaissance: birthDate.toLocaleDateString(),
                            age: age
                        });
                    } else {
                        console.log('Employee data not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the employee data:', error);
                });
        }
    }, [employeeId]);

    const handleAddMedicine = () => {
        if (medicament && qte) {
            setPrescriptionItems([...prescriptionItems, { medicament, qte }]);
            setMedicament('');
            setQte('');
        }
    };

    const handlePrintPDF = () => {
        const input = document.querySelector(".prescription-template");
        html2canvas(input, { scale: 2 })
            .then(canvas => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Ordonnance_${patientInfo.NomEtPrenom}.pdf`);
            })
            .catch(error => {
                console.error("Error generating PDF:", error);
            });
    };

    return (
        <Layout>
            <div className="add_emp">
                <div className="MedHeader">
                    <NavLink className="NavMed" to={`/infoPatient/${employeeId}`}>Details Employe</NavLink>
                    <NavLink className="NavMed" to={`/CreerOrdonnance/${employeeId}`}>Creer ordonnance</NavLink>
                    <NavLink className="NavMed" to={`/DemandeAnalyse/${employeeId}`}>Demande d'analyses</NavLink>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>

                <div className="detail">
                    <div className="presecription">
                        <div className="title">
                            <h2>Creation de l'ordonnance</h2>
                            <button onClick={handlePrintPDF}>Imprimer</button>
                        </div>
                        <div className="inputs">
                            <h3>Information sur le patient</h3>
                            <div className="label1">
                                <div className="label">
                                    <label>Nom et prénom</label>
                                    <input type="text" value={patientInfo.NomEtPrenom} readOnly />
                                </div>
                            </div>
                            <div className="label2">
                                <div className="label">
                                    <label>Date de naissance</label>
                                    <input type="text" value={patientInfo.dateNaissance} readOnly />
                                </div>
                                <div className="label">
                                    <label>Sexe</label>
                                    <input
                                        type="text"
                                        placeholder="Sexe"
                                        value={sexe}
                                        onChange={(e) => setSexe(e.target.value)}
                                    />
                                </div>
                            </div>
                            <h3>Médicaments</h3>
                            <div className="label2">
                                <div className="label">
                                    <label>Médicament</label>
                                    <input
                                        type="text"
                                        placeholder="Médicament"
                                        value={medicament}
                                        onChange={(e) => setMedicament(e.target.value)}
                                    />
                                </div>
                                <div className="label">
                                    <label>Quantité/Posologie</label>
                                    <input
                                        type="text"
                                        placeholder="Quantité/posologie"
                                        value={qte}
                                        onChange={(e) => setQte(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className='add_med' onClick={handleAddMedicine}>Ajouter Médicament</button>
                        </div>
                    </div>

                    <Prescription
                        doctorInfo={doctorInfo}
                        patientInfo={patientInfo}
                        prescriptionItems={prescriptionItems}
                        date={date}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default CreerOrdonnance;
