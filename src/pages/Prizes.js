import React from 'react';
import NavBar from '../components/NavBar'
import CardContainer from '../containers/CardContainer'

const Prizes = () => {
    return (
        <div>
            <NavBar />
            <h1>Prizes</h1>
            <CardContainer cardType="prizes" />
        </div>
    );
}

export default Prizes;