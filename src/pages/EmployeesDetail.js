import React, { Component } from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import axios from 'axios';
import '../styles/EmployeesDetail.css'
import Card from "../components/Card";
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class EmployeesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeInfo: {
                id: "",
                name: "",
                job: "",
                area: "",
                imgSrc: "",
                points: ""
            },
            prizes: [],
            redirectToEmployees: false,

            error: ''
        }
    }

    componentDidMount() {
        this.getEmployee();

    }
    getPrizes() {

        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
            .then(response => {
                this.setState({
                    prizes: response.data.filter(({ name, imgSrc, points, id }) => {

                        return points <= this.state.employeeInfo.points
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
    getEmployee() {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
            .then(response => {
                this.setState({
                    employeeInfo: response.data,
                    error: ''
                });
                this.getPrizes();

            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })

    }
    deleteEmployee = (e, id) => {
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
                axios.delete(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
                    .then((response) => {
                        this.setState({
                            redirectToEmployees: true
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
            employeeInfo: {
                id,
                name,
                job,
                area,
                imgSrc,
                points
            },
            prizes,
            redirectToEmployees,
        } = this.state;
        if (redirectToEmployees) return <Redirect to="/employees" />;
        return (
            <>
                <h1 className="page-title">Employee Detail</h1>


                <div className="employee-details">

                    <div className="trash-content">
                        <i onClick={e => this.deleteEmployee( e,id)} className="fas fa-trash fa-lg trashIcon"></i>
                    </div>

                    <div className="employee-content">
                        <div>
                            <img src={imgSrc} alt="" className="employee-image" />

                        </div>
                        <div></div>
                        <div className="employee-description">

                            <div className="detail-item">
                                <label htmlFor="name"><b>Name</b></label>
                                <div name="name"> {name}</div>
                            </div>
                            <div className="detail-item">
                                <label htmlFor="job"><b>Job</b></label>
                                <div name="job"> {job}</div>
                            </div>
                            <div className="detail-item">
                                <label htmlFor="area"><b>Area</b></label>
                                <div name="area"> {area}</div>
                            </div>
                            <div className="detail-item">
                                <label htmlFor="points"><b>Points</b></label>
                                <div name="points"> {points}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <h3 className="page-subtitle">Available Prizes</h3>
                <div className="prizesContainer">
                    {prizes.map(({ name, imgSrc, points, id }) => (
                        <Card
                            name={name}
                            srcImage={imgSrc}
                            points={points}
                            key={id}
                            id={id}
                            cardType="prizes"
                        />
                    ))}
                </div>

            </>
        );
    }
}

export default EmployeesDetail;