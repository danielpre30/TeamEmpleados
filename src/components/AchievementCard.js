import React, { Component } from 'react';
import styled from 'styled-components';
import deleteImg from '../resources/deleteSmall.png';
import editImg from '../resources/edit.png';
import pointSmall from '../resources/pointSmall.png';

const DivList = styled.div`
    display: grid;
    grid-template-columns: 2;
    grid-template-rows: repeat(1, auto);
    
`;

const LiAchievement = styled.li`
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
const DivItems = styled.div`
    display:flex;
    width:100%;
    @media (max-width: 768px) {
        width:90%
    }
    @media (max-width: 475px) {
        width:80%
    }
`;
const SpanPoints = styled.span`
    float:right;
`;
const SpanName = styled.span`
`;
const ImgDelete = styled.img`

`;
const ImgEdit = styled.img`
    margin-right: 10px;
`;
const DivButtons = styled.div`
    grid-template-columns: (auto-fill, 20px);
    padding-top:8px;
    position:absolute;
    right:0;
    padding-right:5%;
`;
const ImgPoints = styled.img`
    float:right;
    padding-top:4px;
    margin-left:3px;
    
`;


class AchievementCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : props.name,
            points : props.points
        }
    }
    render() {
        const { name, points } = this.state;
        return (
            <>
                <DivList>
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
            </>
        );
    }
}

export default AchievementCard;