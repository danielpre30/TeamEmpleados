import React from 'react';

const Card = ({name, srcImage, points, alt}) => {
    return (
        <div>
            <h1>{name}</h1>
            <img src={srcImage} alt={name}></img>
            <p>{points}</p>
        </div>
    );
}

export default Card;