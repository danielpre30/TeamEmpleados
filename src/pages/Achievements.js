import React, { Component } from 'react';
import styled from 'styled-components';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import axios from 'axios';
import { Link } from 'react-router-dom';
import  deleteImg from '../resources/deleteSmall.png';
import  editImg from '../resources/edit.png';
import deleteImgSmaller from '../resources/deleteSmaller.png'
import editImgSmaller from '../resources/editSmaller.png'
import pointSmall from '../resources/pointSmall.png'



const DivList=styled.div`
    display: grid;
    grid-template-columns: 2;
    grid-template-rows: repeat(1, auto);
    
`;
const DivPpal=styled.div`
padding:5%;
`;

const UlAchievements=styled.ul`
    margin: 0;
    padding: 0;
`;
const LiAchievement=styled.li`
    padding:5px;
    padding-right:10px;
    list-style-type: none;

    border-radius:5px;
    border-color: #abc1d3;
    border-style: solid;
    border-width:1px;

    margin-bottom:3%;
    text-align:left;
    margin-right:6%;
    width:100%;
    @media (max-width: 768px) {
        width:90%
    }
    @media (max-width: 475px) {
        width:80%
    }
`;
const DivItems=styled.div`
    display:flex;
    width:100%;
    @media (max-width: 768px) {
        width:90%
    }
    @media (max-width: 475px) {
        width:80%
    }
`;
const SpanPoints=styled.span`
    float:right;
`;
const SpanName=styled.span`
`;
const ImgDelete=styled.img`

`;
const ImgEdit=styled.img`
    margin-right: 10px;
`;
const DivButtons=styled.div`
    grid-template-columns: (auto-fill, 20px);
    padding-top:8px;
    position:absolute;
    right:0;
    padding-right:5%;
`;
const ImgPoints=styled.img`
    float:right;
    padding-top:4px;
    margin-left:3px;
    
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
                {/* <header>
                    <h1>Achievements</h1>
                </header> */}
                <DivPpal>
                    <UlAchievements>
                        {content.map(({id,name,points})=>(
                            <DivList  key={id}>
                                <DivItems>
                                    <LiAchievement >
                                        <SpanName>{name}</SpanName>
                                        <ImgPoints src={pointSmall}></ImgPoints>
                                        <SpanPoints>{points}</SpanPoints>
                                    </LiAchievement>
                                </DivItems>
                                <DivButtons>
                                    <ImgEdit src={editImg}></ImgEdit>
                                    <ImgDelete src={deleteImg}></ImgDelete>
                                </DivButtons>
                                
                            </DivList>
                        ))}
                    </UlAchievements>
                </DivPpal>

            </>
        );
    } 
}

export default Achievements;