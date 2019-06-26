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

    getObjects(url) {
        const axios = require('axios');

        axios.get(`${BASE_LOCAL_ENDPOINT}/${url}`)
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
            cards = list.map(({name, imgSrc, points, id}) =>
                <Card name={name} srcImage={imgSrc} points={points} key={id} id={id} cardType={cardType}></Card>
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