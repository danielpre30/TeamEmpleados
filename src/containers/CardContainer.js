import React, { Component } from "react";
import Card from "../components/Card";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import AchievementCard from "../components/AchievementCard";
import FormEmployee from "../components/FormEmployee";
import FormPrize from "../components/FormPrize";
import axios from "axios";

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
            pointsPrize: "",
            imgSrcPrize: "",
            error: ""
        };
    }

    componentDidMount() {
        const { cardType } = this.props;
        this.getObjects(cardType);
    }

    sortList = (a, b) => {
        const { cardType } = this.props;
        return (cardType === "employees") ? b.points - a.points : a.points - b.points;
    };

    handleChange = (e, field) => {
        const value = e.target.value;
        this.setState({
            [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
        });
    };

    getObjects(url) {
        axios.get(`${BASE_LOCAL_ENDPOINT}/${url}`).then(response => {
            // handle success
            response.data.sort(this.sortList);
            this.setState({
                list: response.data.map(current => {
                    return { ...current, disabled: true };
                })
            });
        }).catch(error => {
            // handle error
            console.log(error);
            this.setState({
                error: error.message
            });
        });
    }
    editAchievement = (e, id) => {
        this.setState(prevState => {
            const oldlist = prevState.list;
            return {
                list: oldlist.map(current => {
                    return (current.id === id) ? { ...current, disabled: !current.disabled } : current;
                })
            };
        });
    };
    createEmployee(e) {
        e.preventDefault();
        const {
            nameEmployee,
            jobEmployee,
            areaEmployee,
            imgSrcEmployee,
            pointsEmployee
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/employees`, {
            name: nameEmployee,
            job: jobEmployee,
            area: areaEmployee,
            imgSrc: imgSrcEmployee,
            points: pointsEmployee
        }).then(response => {
            this.setState(({ list }) => {
                return {
                    list: [...list, response.data],
                    nameEmployee: "",
                    jobEmployee: "",
                    areaEmployee: "",
                    imgSrcEmployee: "",
                    pointsEmployee: ""
                };
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                error: error.message
            });
        });
    }

    createPrize(e) {
        e.preventDefault();
        const {
            namePrize,
            descriptionPrize,
            pointsPrize,
            imgSrcPrize
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/prizes`, {
            name: namePrize,
            description: descriptionPrize,
            points: pointsPrize,
            imgSrc: imgSrcPrize
        }).then(response => {
            this.setState(({ list }) => {
                return {
                    list: [...list, response.data],
                    namePrize: "",
                    descriptionPrize: "",
                    pointsPrize: "",
                    imgSrcPrize: ""
                };
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                error: error.message
            });
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
        let cards, formEdit;

        const filteredList = list.sort(this.sortList).filter((val) =>
            val.name.toLowerCase().includes(filterText)
        ); // Ordena la lista según sea el caso y luego la filtra

        if (cardType === "achievements") {
            cards = (
                <div className="achievementsCont">
                    <ul className="achievement">
                        {filteredList.map(({ id, name, points, disabled }) => (
                            <AchievementCard
                                name={name}
                                points={points}
                                key={id}
                                editAchievement={e => this.editAchievement(e, id)}
                                disabled={disabled}
                            />
                        ))}
                    </ul>
                </div>
            );
        }
        else {
            cards = (
                <div className="card-container">
                    {filteredList.map(({ name, imgSrc, points, id }) => (
                        <Card
                            name={name}
                            srcImage={imgSrc}
                            points={points}
                            key={id}
                            id={id}
                            cardType={cardType}
                        />
                    ))}
                </div>
            );
            if (cardType === "employees") {
                formEdit = (
                    <FormEmployee
                        name={nameEmployee}
                        job={jobEmployee}
                        area={areaEmployee}
                        points={pointsEmployee}
                        onSubmit={e => this.createEmployee(e)}
                        handleChange={this.handleChange}
                        imgSrc={imgSrcEmployee}
                    />
                );
            }
            else if (cardType === "prizes") {
                formEdit = (
                    <FormPrize
                        name={namePrize}
                        description={descriptionPrize}
                        points={pointsPrize}
                        imgSrc={imgSrcPrize}
                        onSubmit={e => this.createPrize(e)}
                        handleChange={this.handleChange}
                    />
                );
            }
        }

        return (
            <>
                <form action="" className="buscar">
                    <input
                        className="input-buscar"
                        type="search"
                        placeholder="Buscar"
                        onChange={e => {
                            this.handleChange(e, "filterText");
                        }}
                    />
                    <i className="fa fa-search" />
                </form>
                {formEdit}
                {cards}
            </>
        );
    }
}

export default CardContainer;
