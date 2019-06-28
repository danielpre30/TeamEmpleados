import React from 'react';
import '../styles/Card.css'
import point from '../resources/point.png';
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css'
import { Link } from 'react-router-dom';

const Card = ({ name, srcImage, points, id, cardType }) => {
    return (
        // <div className="card">
        //     <div className="card-header">
        //         <h2>{name}</h2>
        //     </div>
        //     <div className="image-container">
        //         <img src={srcImage} alt={name} className="card-image"></img>
        //     </div>
        //     <div className="card-content">
        //         <h3 className="card-title">Points</h3>
        //         {points}
        //         <img className="img-points" src={point} alt="Points" />
        //     </div>
        // </div>
        <div className="card">
            <div className="card__thumb"><span className="close-modal"><i className="fas fa-times fa-xs"></i></span>
                <img src={srcImage} alt="Strawberry Waffle" />
            </div>
            <div className="card__content">
                <header className="content__header">
                    <div className="row-wrapper">
                        <h2 className="card-title">{name}</h2>
                    </div>
                </header>
                <p className="description">
                    <b>Points </b>{points}
                    <img className="img-points" src={point} alt="Points" />
                </p>
                <footer className="content__footer">
                    <Link key={id} to={`/${cardType}/${id}`}>More</Link>
                </footer>
            </div>
        </div>
    );
}

export default Card;