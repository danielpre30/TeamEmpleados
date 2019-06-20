import React from 'react';
import Logo from '../resources/logo-team-international.png'
import { Link } from "react-router-dom";
import '../resources/Open_Sans/stylesheet.css'
import '../styles/NavBar.css'

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <img src={Logo} alt='Team Logo' className="logo"></img>
            <ul className='nav-item-cont'>
                <li className="nav-item"><Link to="/employees">EMPLOYEES</Link></li>
                <li className="nav-item"><Link to="/prizes">PRIZES</Link></li>
                <li className="nav-item"><Link to="/achievements">ACHIEVEMENTS</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;