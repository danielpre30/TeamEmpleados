import React from 'react';
import Logo from '../resources/logo-team-international.png'
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div>
            <img src={Logo} alt='Team Logo'></img>
            <ul>
                <li><Link to="/employees">Employees</Link></li>
                <li><Link to="/prizes">Prizes</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;