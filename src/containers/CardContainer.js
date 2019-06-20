import React, { Component } from 'react';
import Card from '../components/Card';
import { BASE_LOCAL_ENDPOINT } from '../constants';
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
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        const {
            list
        } = this.state;

        return (
            <div>
                {list.map((current) =>
                    <Card name={current.name} srcImage={current.imgSrc} points={current.points} key={current.id}></Card>
                )}
            </div>
        );
    }

}

export default CardContainer;