import React from 'react';
import '../styles/Card.css'
import pointSmall from '../resources/pointSmall.png';

const Card = ({ name, srcImage, points, alt }) => {
    return (
        <div className="card">
            <h2 className="card-header">{name}</h2>
            <img src={srcImage} alt={name} className="card-image"></img>
            <h3 className="card-title">Points</h3>
            <div className="card-content">
                {points}
                <img className="img-points" src={pointSmall} alt="Points" />
            </div>
        </div>
    );
}

export default Card;