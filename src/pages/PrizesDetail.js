import React, { Component } from 'react';
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Redirect } from 'react-router-dom';
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    render() {
        const {
            prizeInfo: {
                id,
                name,
                description,
                imgSrc,
                points
            },
            redirectToPrizes
        } = this.state;
        if (redirectToPrizes) return <Redirect to="/prizes" />;
        return (
            <>
                <h1 className="page-title">Prizes Detail</h1>
                <div className="employee-details">

                    <div className="employee-content">
                        <div>
                            <img src={imgSrc} alt="" className="employee-image" />
                        </div>
                        <div className="employee-description">
                            <div className="detail-item">
                                <label htmlFor="name"><b>Name</b></label><br/>
                                {name}
                                
                            </div>
                            <div className="detail-item">
                                <label htmlFor="description"><b>Description</b></label><br/>
                                {description}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="points"><b>Points</b></label><br/>
                                {points}
                            </div>
                        </div>
                    </div>
                    <div className="trash-content">
                        <i className="far fa-edit fa-lg icons"></i>
                        <i onClick={e => this.deletePrize(e, id)} className="fas fa-trash fa-lg icons"></i>
                    </div>
                </div>
            </>
        );
    }
}

export default PrizesDetail;