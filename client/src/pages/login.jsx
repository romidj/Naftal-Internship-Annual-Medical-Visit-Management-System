import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
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
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
            const { token, role } = res.data;
            console.log(res.data);
    
            localStorage.setItem('token', token);
    
            if (role === 'M') {
                navigate('/dashbord_med');
            } else if (role === 'G') {
                navigate('/bon_consultation');
            } else if (role === 'I') {
                navigate('/');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response ? err.response.data : "An unexpected error occurred");
        }
    };

    return (
        <div className="authContainer">

            <div className="auth">


                <form>
                    <h1>Login</h1>
                    <div className="input-box"><input required type="text" placeholder="UserName" name="username" onChange={handleChange} autoComplete="username" />
                        <FontAwesomeIcon className="icon" icon={faUser} />
                    </div>
                    <div className="input-box"><input required type="password" placeholder="Passwod" name="password" onChange={handleChange} autoComplete="current-password" />
                        <FontAwesomeIcon className="icon" icon={faLock} />
                    </div>
                    <div className="error">
                        {err && <div className="error"> {err}</div>}
                    </div>
                    <div className="btn">
                        <button onClick={handleSubmit} type="submit" className="btn">Login</button></div>
                    <div className="register">
                        <p>
                            Don't you have an account
                        </p>
                        <Link to="/register">Register</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Login