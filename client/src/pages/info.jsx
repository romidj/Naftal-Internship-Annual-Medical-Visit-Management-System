import React from 'react'

function info() {

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
    <div>
        <H2>Nom</H2>
        <h2>Prenom</h2>
      
    </div>
  )
}

export default info
