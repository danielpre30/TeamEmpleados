import React, { Component } from 'react';
import deleteImg from '../resources/deleteSmall.png';
import editImg from '../resources/edit.png';
import pointSmall from '../resources/pointSmall.png';
import '../styles/AchievementCard.css'
import checked from '../resources/checked.png';

class AchievementCard extends Component {
    render() {
        const { id, name, points, disabled, editAchievement, editChecked, deleteAchievement,
            onChangeName, onChangePoints } = this.props;
        var changeEditImg, achievementName, achivementPoints;
        if (disabled) {
            changeEditImg = <img onClick={editAchievement} className="ImgEdit" src={editImg} alt="Edit" />;
            achievementName = <span className="SpanName"  >{name}</span>;
            achivementPoints = <span className="SpanPoints">{points}</span>
        }
        else {
            changeEditImg = <img onClick={editChecked} className="ImgEdit" src={checked} alt="Edit" />
            achievementName = <input type="text" className="InputName" defaultValue={name} name={id} onChange={onChangeName} />
            achivementPoints = <input type="number" className="InputPoints" defaultValue={points} name={id} onChange={onChangePoints} />
        }
        return (
            <>
                <div className="DivList">
                    <div className="DivItems">
                        <li className="LiAchievemet">
                            {achievementName}
                            <div className="points-content">
                                <img className="ImgPoints" src={pointSmall} alt="Points" />
                                {achivementPoints}
                            </div>

                        </li>
                    </div>
                    <div className="DivButtons">
                        {changeEditImg}
                        <img src={deleteImg} onClick={deleteAchievement} alt="Delete" />
                    </div>
                </div>
            </>
        );
    }
}
export default AchievementCard;