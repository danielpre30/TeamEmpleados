import React, { Component } from 'react';
import Logo from '../resources/logo-team-international.png';
import { Link } from "react-router-dom";
import '../resources/Open_Sans/stylesheet.css';
import '../styles/NavBar.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class NavBar extends Component {

    render() {
        const { label, to, activeOnlyWhenExact } = this.props;

        return (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => (
                    <nav className="nav-bar">
                        <img src={Logo} alt='Team Logo' className="logo"></img>
                        <ul className='nav-item-cont'>
                            <li className="nav-item"><MenuLink label="EMPLOYEES" to="/employees" activeOnlyWhenExact={false}></MenuLink></li>
                            <li className="nav-item"><MenuLink label="PRIZES" to="/prizes" activeOnlyWhenExact={false}></MenuLink></li>
                            <li className="nav-item"><MenuLink label="ACHIEVEMENTS" to="/achievements" activeOnlyWhenExact={false}></MenuLink></li>
                        </ul>
                    </nav>
                )}
            />

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