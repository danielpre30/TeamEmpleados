import React, { Component } from 'react';
import deleteImg from '../resources/deleteSmall.png';
import editImg from '../resources/edit.png';
import pointSmall from '../resources/pointSmall.png';
import '../styles/AchievementCard.css'

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
                <div className="DivList">
                    <div className="DivItems">
                        <li className="LiAchievemet">
                            <span className="SpanName">{name}</span>
                            <img className="ImgPoints" src={pointSmall} alt="Points"/>
                            <span className="SpanPoints">{points}</span>
                        </li>
                    </div>
                    <div className="DivButtons">
                        <img className="ImgEdit" src={editImg} alt="Edit"/>
                        <img src={deleteImg} alt="Delete"/>
                    </div>
                </div>
            </>
        );
    }
}

export default AchievementCard;