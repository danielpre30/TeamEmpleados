import React from 'react';
import CardContainer from '../containers/CardContainer'

const Prizes = () => {
    return (
        <>
            <h1 className="page-title">Prizes</h1>
            <div className="card-container">
                <CardContainer cardType="prizes" />
            </div>
        </>
    );
}

export default Prizes;