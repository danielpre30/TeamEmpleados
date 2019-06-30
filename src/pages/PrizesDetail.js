import React, { Component } from 'react';
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Redirect } from 'react-router-dom';
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css';
import '../styles/Detail.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class PrizesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prizeInfo: {
                id: "",
                name: "",
                description: "",
                imgSrc: "",
                points: ""
            },
            redirectToPrizes: false,
            error: '',
            enable: false
        }
    }

    componentDidMount() {
        this.getPrize();
    }

    getPrize() {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
            .then(response => {
                this.setState({
                    prizeInfo: response.data,
                    error: ''
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error.message
                })
            })
    }
    deletePrize = (e, id) => {
        const axios = require('axios');
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            type: 'warning',
            title: 'Are you sure to delete this employee?',
            text: "You won't be able to revert this",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it'
        }).then((result) => {
            if (result.value) {
                axios.delete(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
                    .then((response) => {
                        this.setState({
                            redirectToPrizes: true
                        });

                    }).catch((error) => {
                        console.log(error);
                    })
                Swal.fire(
                    'Deleted!'
                )
            }
        });
    }

    handleChange = (e, field) => {
        const value = e.target.value;
        this.setState((prevState) => {
            return {
                prizeInfo: {
                    ...prevState.prizeInfo,
                    [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
                }
            }
        });
    };
    editPrize = () => {
        this.setState({
            enable: true
        });
    }
    editChecked = (e, id) => {
        const { prizeInfo } = this.state;
        axios.put(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`, prizeInfo)
            .then(response => {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    type: 'success',
                    title: 'This Prize has been saved',
                    showConfirmButton: false,
                    timer: 1800
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: error.message
                });
            });

        this.setState({
            enable: false
        });
    }

    render() {
        const {
            prizeInfo: {
                id,
                name,
                description,
                imgSrc,
                points
            },
            redirectToPrizes,
            enable
        } = this.state;
        if (redirectToPrizes) return <Redirect to="/prizes" />;

        var inputs = [];
        var icon;

        if (enable) {
            icon = <i className="fas fa-check icons" onClick={(e) => { this.editChecked(e, id) }} />;
            inputs.push(<input type="text" name="name" defaultValue={name} onChange={(e) => { this.handleChange(e, "name") }} />);
            inputs.push(<input type="text" name="description" defaultValue={description} onChange={(e) => { this.handleChange(e, "description") }} />);
            inputs.push(<input type="number" name="points" defaultValue={points} onChange={(e) => { this.handleChange(e, "points") }} />);
            inputs.push(<div className="detail-item">
                <label htmlFor="imgSrc"><b>Image URL</b></label>
                <input type="text" name="imgSrc" defaultValue={imgSrc} onChange={(e) => { this.handleChange(e, "imgSrc") }} />
            </div>)
        }
        else {
            icon = <i className="far fa-edit fa-lg icons" onClick={this.editPrize} />;
            inputs.push(<div name="name"> {name}</div>);
            inputs.push(<div name="job"> {description}</div>);
            inputs.push(<div name="points"> {points}</div>);
        }


        return (
            <>
                <h1 className="page-title">Prizes Detail</h1>
                <div className="detail-details">
                    <div className="detail-content">
                        <div>
                            <img src={imgSrc} alt="" className="detail-image" />
                        </div>
                        <div className="detail-description">
                            <div className="detail-item">
                                <label htmlFor="name"><b>Name</b></label><br />
                                {inputs[0]}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="description"><b>Description</b></label><br />
                                {inputs[1]}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="points"><b>Points</b></label><br />
                                {inputs[2]}
                            </div>
                            {inputs[3]}
                        </div>
                    </div>
                    <div className="trash-content">
                        {icon}
                        <i onClick={e => this.deletePrize(e, id)} className="fas fa-trash fa-lg icons"></i>
                    </div>
                </div>
            </>
        );
    }
}

export default PrizesDetail;