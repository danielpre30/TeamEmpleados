import React, { Component } from 'react';
import Card from '../components/Card';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import AchievementCard from '../components/AchievementCard';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardType: props.cardType,
            list: []
        };
    }

    componentDidMount() {
        const {
            cardType
        } = this.state;

        this.getObjects(cardType);
    }

    getObjects(parameter) {
        const axios = require('axios');

        axios.get(`${BASE_LOCAL_ENDPOINT}/${parameter}`)
            .then((response) => {
                // handle success
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
            cardType,
            list
        } = this.state;

        var cards;

        if (cardType === "achievements") {
            cards = list.map(({ id, name, points }) => (
                <AchievementCard name={name} points={points} key={id} />
            ));
        }
        else {
            cards = list.map((current) =>
                <Card name={current.name} srcImage={current.imgSrc} points={current.points} key={current.id}></Card>
            );
        }

        return (
            <>
                {cards}
            </>
        );
    }

}

export default CardContainer;