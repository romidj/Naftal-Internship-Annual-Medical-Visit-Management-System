import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../component/layout';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faUser, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function InfoEmployee() {
  const { employeeId } = useParams(); // Correctly destructure employeeId from useParams
  const [inputs, setInputs] = useState({
    NomEtPrenom: "",
    dateNaissance: "",
    Adresse: "",
    Poste: "",
    telephone: "",
    outlook: "",
    direction: "",
    rdv_date: "",
    rdv_hour: "",
    centre_medical: "",
    medecin: "",
    rdv_state: "",
    convo_state:"",
    address: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:8800/api/user/employee/${employeeId}/info`)
      .then(response => {
        const employee = response.data[0]; // Assuming response.data is an array and you need the first item
        setInputs({
          NomEtPrenom: employee.employee_name,
          dateNaissance: employee.date_naissance,
          Adresse: employee.address, // Adjust if needed
          Poste: employee.poste,
          telephone: employee.phone_nbr,
          outlook: employee.outlook,
          address: employee.address,
          direction: employee.direction_name,
          rdv_date: employee.rdv_date,
          rdv_hour: employee.rdv_hour,
          centre_medical: employee.centre_medical,
          medecin: employee.medecin,
          rdv_state: employee.rdv_state,
          convo_state: employee.convo_state
        });
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, [employeeId]);

  const handleRdvStateChange = () => {
    if (inputs.rdv_state === 'en_attente') {
      axios.post(`http://localhost:8800/api/user/employees/${employeeId}/update-rdv-state`, { rdv_state: 'termine' })
        .then(response => {
          setInputs(prevInputs => ({
            ...prevInputs,
            rdv_state: 'termine'
          }));
        })
        .catch(error => {
          console.error('Failed to update RDV state', error);
        });
    }
  };

  return (
    <Layout>
      <div className="add_emp">
        <div className="header">
          <div className="title">
            <FontAwesomeIcon className="icon" icon={faComputer} />
            <p>Direction {inputs.direction}</p>
          </div>
          <FontAwesomeIcon className='icon' icon={faChevronRight} />
          <div className="title">
            <FontAwesomeIcon className='icon' icon={faUser} />
            <p>Détails employé</p>
          </div>
        </div>

        <div className="bigContainer">
          <div className="container">
            <div className="sub_header">
              <span className='span1'>Details Rendez-vous</span>
              {inputs.convo_state === 'sent' ? (
                inputs.rdv_state === 'en_attente' ? (
                  <button className="terminer" onClick={() => handleRdvStateChange(inputs.id)}>
                    Terminer
                  </button>
                ) : (
                  <span>{inputs.rdv_state === 'termine' ? 'Terminé' : 'En attente'}</span>
                )
              ) : (
                <span className='span4'>En attente</span>
              )}


            </div>
            <form>
              <div className="info1">
                <div className="label">
                  <label>Date de rendez-vous</label>
                  <input
                    value={inputs.rdv_date}
                    type="date"
                    name="rdv_date"
                    readOnly
                  />
                </div>
                <div className="label">
                  <label>Heure de rendez-vous</label>
                  <input
                    value={inputs.rdv_hour}
                    type="time"
                    name="rdv_hour"
                    readOnly
                  />
                </div>
              </div>
              <div className="info2">
                <div className="label">
                  <label>Centre Medical</label>
                  <input
                    value={inputs.centre_medical}
                    type="text"
                    name="centre_medical"
                    readOnly
                  />
                </div>
                <div className="label">
                  <label>Nom de medecin</label>
                  <input
                    value={inputs.medecin}
                    type="text"
                    name="medecin"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="container">
            <div className="sub_header">
              <span className='span1'>INFORMATION PERSONNELLES</span>
              <span className='span3'>Direction {inputs.direction}</span>
            </div>
            <form>
              <div className="info1">
                <div className="label">
                  <label>Nom et Prénom</label>
                  <input type="text" value={inputs.NomEtPrenom} readOnly />
                </div>
                <div className="label">
                  <label>Date de naissance</label>
                  <input type="date" value={inputs.dateNaissance} readOnly />
                </div>
              </div>
              <div className="info2">
                <div className="label">
                  <label>Adresse</label>
                  <input type="text" value={inputs.address} readOnly />
                </div>
                <div className="label">
                  <label>Poste occupé</label>
                  <input type="text" value={inputs.Poste} readOnly />
                </div>
              </div>
              <div className="info3">
                <div className="label">
                  <label>N° de téléphone</label>
                  <input type="text" value={inputs.telephone} readOnly />
                </div>
                <div className="label">
                  <label>Adresse mail</label>
                  <input type="email" value={inputs.outlook} readOnly />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default InfoEmployee;
