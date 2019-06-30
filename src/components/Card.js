import React from 'react';
import '../styles/Card.css'
import point from '../resources/point.png';
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css'
import { Link } from 'react-router-dom';

const Card = ({ name, srcImage, points, id, cardType }) => {
    return (
        <div className="card">
            <div className="card__thumb">
                <img src={srcImage} alt="Profile" />
            </div>
            <div className="card__content">
                <header className="content__header">
                    <div className="row-wrapper">
                        <h2 className="card-title">{name}</h2>
                    </div>
                </header>
                <p className="description">
                    <span><b>Points: </b>{points}</span>
                    
                    <img className="img-points" src={point} alt="Points" />
                </p>
                <footer className="content__footer">
                    <Link key={id} to={`/${cardType}/${id}`}>View</Link>
                </footer>
            </div>
        </div>
    );
}

export default Card;