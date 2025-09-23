import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../component/layout';

function Settings() {
  const [input, setInput] = useState({
    message: "",
  });

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/convocation/Message", input);
      console.log(res.data);
      setError(null);  // Clear previous errors on success
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleConvoAnnuaire = async (e) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm('Etes vous sur de vouloir générer une convocation vierge pour tous les employes?');
  
    if (userConfirmed) {
      try {
        const response = await axios.post('http://localhost:8800/api/convocation/settings');
        alert(response.data.message);
      } catch (error) {
        alert('Erreur dans la génération de convocations, veuillez réessayer ulterieurement!.');
      }
    } else {
      alert('Generation de convocation annulée');
    }
  }
  
  return (
    <Layout>
      {/*<input name='message' type="text" onChange={handleChange} />
      <button onClick={handleAdd}>ADD</button>
      {err && <div className="error">{typeof err === 'string' ? err : JSON.stringify(err)}</div>}*/}
      <div className="generete_btn">
        <label>Generer la convocation annuaire pour tous les employes</label>
        <button onClick={handleConvoAnnuaire}>Generer les convocations</button>
      </div>
    </Layout>
  );
  
}

export default Settings;
