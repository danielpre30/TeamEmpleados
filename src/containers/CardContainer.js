import React, { Component } from 'react';
import Card from '../components/Card';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import AchievementCard from '../components/AchievementCard';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filterText: ""
        };
    }

    componentDidMount() {
        const {
            cardType
        } = this.props;

        this.getObjects(cardType);
    }

    sortList = (a, b) => {
        const { cardType } = this.props;
        if (cardType === "employees") return b.points - a.points;
        else return a.points - b.points;
    }

    handleFilter(e, field) {
        const value = e.target.value;
        this.setState({
            [field]: value  //Los corchetes son para hacer referencia a la clave a partir de un string
        });
    }

    getObjects(url) {
        const axios = require('axios');

        axios.get(`${BASE_LOCAL_ENDPOINT}/${url}`)
            .then((response) => {
                // handle success
                response.data.sort(this.sortList);
                this.setState({
                    list: response.data
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                this.setState({
                    achievements: {
                        error: error.message
                    }
                });
            })
    }

    render() {
        const {
            list,
            filterText
        } = this.state;
        const { cardType } = this.props;
        var cards;

        const filteredList = list.filter((val, i) =>
            val.name.toLowerCase().includes(filterText)
        );

        if (cardType === "achievements") {
            cards = (
                <div className='achievementsCont'>
                    <ul className='achievement'>
                        {filteredList.map(({ id, name, points }) => (
                            <AchievementCard name={name} points={points} key={id} />
                        ))}
                    </ul>
                </div>
            );

        }
        else {
            cards = (
                <div className="card-container">
                    {filteredList.map(({ name, imgSrc, points, id }) =>
                        <Card name={name} srcImage={imgSrc} points={points} key={id} id={id} cardType={cardType}></Card>
                    )}
                </div>
            );
        }

        return (
            <>
                <form action="" className="buscar">
                    <input
                    type="search"
                    placeholder="Buscar"
                    onChange={e => {
                        this.handleFilter(e, "filterText");
                    }}/>
                    <i className="fa fa-search"></i>
                </form>
                {cards}
            </>
        );
    }

}

export default CardContainer;