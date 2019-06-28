import React, { Component } from 'react';
import Card from '../components/Card';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import AchievementCard from '../components/AchievementCard';
import FormEmployee from '../components/FormEmployee';
import FormPrize from '../components/FormPrize';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filterText: "",
            nameEmployee: "",
            jobEmployee: "",
            areaEmployee: "",
            imgSrcEmployee: "",
            pointsEmployee: 0,
            namePrize: "",
            descriptionPrize: "",
            puntosPrize: "",
            imgSrcPrize: ""
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

    handleFilter = (e, field) => {
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

    createEmployee(e) {
        e.preventDefault();
        console.log(2);

        this.setState(prevState => {
            const oldEmployees = prevState.list;
            return {
                list: [
                    ...oldEmployees,
                    {
                        id: Math.random(),
                        name: prevState.nameEmployee,
                        job: prevState.jobEmployee,
                        area: prevState.areaEmployee,
                        imgSrc: prevState.imgSrcEmployee,
                        points: prevState.pointsEmployee
                    }
                ],
                nameEmployee: "",
                jobEmployee: "",
                areaEmployee: "",
                imgSrcEmployee: "",
                pointsEmployee: ""
            };
        });
    }

    createPrize(e) {
        e.preventDefault();

        this.setState(prevState => {
            const oldEmployees = prevState.list;
            return {
                list: [
                    ...oldEmployees,
                    {
                        id: Math.random(),
                        name: prevState.namePrize,
                        points: prevState.puntosPrize,
                        imgSrc: prevState.imgSrcPrize,
                        description: prevState.descriptionPrize
                    }
                ],
                namePrize: "",
                descriptionPrize: "",
                puntosPrize: "",
                imgSrcPrize: ""
            };
        });
    }
    render() {
        const {
            list,
            filterText,
            nameEmployee,
            jobEmployee,
            areaEmployee,
            imgSrcEmployee,
            pointsEmployee,

            namePrize,
            descriptionPrize,
            pointsPrize,
            imgSrcPrize
        } = this.state;

        const { cardType } = this.props;
        var cards;

        const filteredList = list.sort(this.sortList).filter((val, i) =>
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
                        className="input-buscar"
                        type="search"
                        placeholder="Buscar"
                        onChange={e => {
                            this.handleFilter(e, "filterText");
                        }} />
                    <i className="fa fa-search"></i>
                </form>
                {/* <FormEmployee
                    name={nameEmployee}
                    job={jobEmployee}
                    area={areaEmployee}
                    points={pointsEmployee}
                    onSubmit={e => this.createEmployee(e)}
                    handleChange={this.handleFilter}
                    imgSrc={imgSrcEmployee}
                /> */}
                {/* <FormPrize
                    name={namePrize}
                    description={descriptionPrize}
                    points={pointsPrize}
                    imgSrc={imgSrcPrize}
                    onSubmit={e => this.createPrize(e)}
                    handleChange={this.handleFilter}
                /> */}
                
                {cards}
            </>
        );
    }

}

export default CardContainer;