import React, { Component } from 'react';
import '../styles/CardContainer.css'
import CardContainer from '../containers/CardContainer';

class Achievements extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            // achievements: {
            //     content:[],
            //     error:false
            // },
            // newAchievementFrom: {
            //     name: "",
            //     points: "",
                
            // },
            // createAchievementError: false
        };
    }
    
    render() {
        return (
            <>
                <div className='achievementsCont'>
                    <ul className='achievement'>
                        <CardContainer cardType="achievements"/>
                    </ul>
                </div>
            </>
        );
    } 
}

export default Achievements;