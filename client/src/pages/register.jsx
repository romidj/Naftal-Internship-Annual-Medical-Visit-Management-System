import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);  // Declare the error state

  const navigate = useNavigate()


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(inputs);  // Commented out to avoid confusion due to asynchronous state update
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      console.log(res.data);
      navigate("/login")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="authContainer">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input required type="text" name="username" placeholder="UserName" onChange={handleChange} />
            <FontAwesomeIcon className="icon" icon={faUser} />
          </div>
          <div className="input-box">
            <input required type="text" name="email" placeholder="Email" onChange={handleChange} />
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
          </div>
          <div className="input-box">
            <input required type="password" name="password" placeholder="Password" onChange={handleChange} />
            <FontAwesomeIcon className="icon" icon={faLock} />
          </div>
          {err && <div className="error"> {err}</div>}
          <div className="btn-container">  {/* Changed the class name to avoid conflict */}
            <button type="submit" className="btn">Register</button>
          </div>
          <div className="register">
            <p>Don't you have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
