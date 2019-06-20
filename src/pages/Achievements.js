import React, { Component } from 'react';
import styled from 'styled-components';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import axios from 'axios';
import AchievementCard from '../components/AchievementCard';



const DivPpal=styled.div`
    padding:5%;
`;

const UlAchievements=styled.ul`
    margin: 0;
    padding: 0;
`;



class Achievements extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            achievements: {
                content:[],
                error:false
            },
            newAchievementFrom: {
                name: "",
                points: "",
                
            },
            createAchievementError: false
        }
    }
    componentDidMount=()=>{
        this.getAchievements();
    }
    getAchievements=()=>{
        const axios = require('axios');
        axios.get(`${BASE_LOCAL_ENDPOINT}/avhievements`)        
        .then(response=> {
            // handle success
            console.log(response.data);
            this.setState({
                achievements:{
                    content:response.data,
                    error:''
                },
                createAchievementError: false

            })
        })
        .catch(function (error) {
            this.setState({
                achievements: {
                    error: error.message
                }
            })
        })        
    }
    render() {
        const {
            achievements: { content, error }}=this.state;
        return (
            <>
                <DivPpal>
                    <UlAchievements>
                        {content.map(({id,name,points})=>(
                            <AchievementCard name={name} points={points} key={id} />
                        ))}
                    </UlAchievements>
                </DivPpal>

            </>
        );
    } 
}

export default Achievements;