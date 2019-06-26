import React from 'react';
import '../styles/Card.css'
import pointSmall from '../resources/pointSmall.png';
import { Link } from 'react-router-dom';

const Card = ({ name, srcImage, points, id, cardType }) => {
    return (
        <div className="card">
            <h2 className="card-header">{name}</h2>
            <Link to={`/${cardType}/${id}`}>
                <img src={srcImage} alt={name} className="card-image"></img>
            </Link >
            <div className="card-content">
                <h3 className="card-title">Points</h3>
                {points}
                <img className="img-points" src={pointSmall} alt="Points" />
            </div>
        </div>
    );
}

export default Card;