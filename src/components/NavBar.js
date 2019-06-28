import React, { Component } from 'react';
import Logo from '../resources/logo-team-international.png';
import { Link } from "react-router-dom";
import '../resources/Open_Sans/stylesheet.css';
import '../styles/NavBar.css';
import { Route } from 'react-router-dom';

class NavBar extends Component {

    componentDidMount(){
        const menuIcon = document.getElementById('menu-icon');
        const menuContent = document.getElementById('menu-content');
        menuIcon.addEventListener('click', () =>{
            menuContent.classList.toggle('active');
        });
    }
    render() {
        return (
            <nav className="nav-bar">
                <div className="logo-container">
                    <i className="fas fa-bars fa-2x" id="menu-icon"></i>
                    <img src={Logo} alt='Team Logo' className="logo"></img>
                </div>
                <ul className='nav-item-cont' id="menu-content">
                    <MenuLink label="EMPLOYEES" to="/employees" activeOnlyWhenExact={false}></MenuLink>
                    <MenuLink label="PRIZES" to="/prizes" activeOnlyWhenExact={false}></MenuLink>
                    <MenuLink label="ACHIEVEMENTS" to="/achievements" activeOnlyWhenExact={false}></MenuLink>
                </ul>
            </nav>
        );
    }
}

function MenuLink({ label, to, activeOnlyWhenExact }) {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => (
                <li className={`nav-item ${match ? "active" : ""}`}>
                    <Link to={to}>{label}</Link>
                </li>
            )}
        />
    );
}

export default NavBar;