import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ImagePro from "../img/logo.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faRightFromBracket, faChartPie, faEnvelope, faFileLines,faCalendarCheck ,faHourglassHalf} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [profile, setProfile] = useState({ username: "", email: "" });
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

    useEffect(() => {
        axios.get('http://localhost:8800/api/auth/userProfile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [token]);

    return (
        <div className="navbar">
            <div className="card">
                <div className="picture">
                    <img src={ImagePro} alt="" />
                </div>
                <div className="infos">
                    <div className="username">{profile.username}</div>
                    <div className="email">{profile.email}</div>
                </div>
            </div>
            <div className="container">
                <div className="links">
                    <NavLink to="/dashbord_med" className="Link" activeClassName="active">
                        <FontAwesomeIcon className="icon" icon={faChartPie} />
                        <div className="txt">Dashboard</div>
                    </NavLink>

                    <NavLink to="/rdv_en_attente" className="Link" activeClassName="active">
                        <FontAwesomeIcon className="icon" icon={faHourglassHalf} />
                        <div className="txt">Rendez-vous en attente</div>
                    </NavLink>

                    
                    <NavLink to="/rdv_termine" className="Link" activeClassName="active">
                        <FontAwesomeIcon className="icon" icon={faCalendarCheck} />
                        <div className="txt">Rendez-vous terminés</div>
                    </NavLink>

                    
                </div>
                <div className="more">
                    <Link to="/settings" className="settings">
                        <FontAwesomeIcon className="icon" icon={faGears} />
                    </Link>
                    <Link to="/logout" className="logout">
                        <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
