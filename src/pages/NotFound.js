import React from 'react';
import notFound from '../resources/404.gif'
import '../styles/NotFound.css'
const NoMatch = () => {
    return (
        <div className="not-found-container">
            <h1 className="page-title">Oops... Error 404</h1>
            <img src={notFound} alt="Page not found"/>
        </div>
    );
}

export default NoMatch;