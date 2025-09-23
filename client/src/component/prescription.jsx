import React from 'react';
import Logo from '../img/logo.png';
import signature from '../img/signature.png';
import { QRCodeSVG } from "qrcode.react";

function Prescription({ doctorInfo, patientInfo, prescriptionItems, date }) {
    // Prepare the prescription data in a simple JSON format
    const prescriptionData = {
        doctorName: doctorInfo.doctorName,
        patientName: patientInfo.NomEtPrenom,
        patientAge: patientInfo.age,
        date,
        prescriptionItems,
    };

    // Serialize the data into a JSON string
    const qrValue = JSON.stringify(prescriptionData);

    return (
        <div className="preview">
            <div className="prescription-template">
                <div className="prescription-container">
                    <div className="pres-head">
                        <div className="pres-head-top">
                            <div className="pres-head-top-left text-start">
                                <img src={Logo} alt="Logo" />
                            </div>
                            <div className="pres-head-top-right text-end">
                                <ul>
                                    <li><span className='text-bold'>Date</span>: {date}</li>
                                    <li><span className='text-bold'>Ordonnance N°</span>: 0001</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pres-head-bottom">
                            <div className="pres-head-bottom-left">
                                <ul className='text-start'>
                                    <li className='text-bold'>Centre médical</li>
                                    <li>Dr. <span className='text-bold'>{doctorInfo.doctorName}</span></li>
                                    <li><span className='text-bold'>medecin@naftal.dz</span></li>
                                </ul>
                            </div>
                            <div className="pres-head-bottom-right text-end">
                                <ul className='text-end'>
                                    <li className='text-bold'>Nom et prénom</li>
                                    <li>{patientInfo.NomEtPrenom}</li>
                                    <li><span className='text-bold'>Âge </span>: {patientInfo.age} ans</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="hr"></div>
                    <h3>Ordonnance</h3>
                    <div className="overflow_view">
                        <div className="pres-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-bold'>Médicament</th>
                                        <th className='text-bold'>Qté/Posologie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptionItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.medicament}</td>
                                            <td>{item.qte}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                
                </div>
            </div>
        </div>
    );
}

export default Prescription;
