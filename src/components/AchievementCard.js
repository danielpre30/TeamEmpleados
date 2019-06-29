import React, { Component } from 'react';
import deleteImg from '../resources/deleteSmall.png';
import editImg from '../resources/edit.png';
import pointSmall from '../resources/pointSmall.png';
import '../styles/AchievementCard.css'
import checked from '../resources/checked.png';

class AchievementCard extends Component {
    render() {
        const { name, points, disabled, editAchievement } = this.props;
        var changeEditImg, inputDisabled;
        if (disabled) {
            changeEditImg = <img onClick={editAchievement} className="ImgEdit" src={editImg} alt="Edit" />
            inputDisabled = <span className="SpanName"  >{name}</span>
        }
        else {
            changeEditImg = <img onClick={editAchievement} className="ImgEdit" src={checked} alt="Edit" />
            inputDisabled = <input className="InputName" defaultValue={name} />

        }
        return (
            <>
                <div className="DivList">
                    <div className="DivItems">
                        <li className="LiAchievemet">
                            {inputDisabled}
                            <img className="ImgPoints" src={pointSmall} alt="Points" />
                            <span className="SpanPoints">{points}</span>
                        </li>
                    </div>
                    <div className="DivButtons">
                        {changeEditImg}
                        <img src={deleteImg} alt="Delete" />
                    </div>
                </div>
            </>
        );
    }
}
export default AchievementCard;