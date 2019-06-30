import React, { Component } from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import axios from 'axios';
import '../styles/EmployeesDetail.css'
import Card from "../components/Card";
import '../resources/fontawesome-free-5.9.0-web/css/all.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router-dom';

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
            enable: false,
            error: ''
        }
    }

    handleChange = (e, field) => {
        const value = e.target.value;
        this.setState((prevState) => {
            return {
                employeeInfo: {
                    ...prevState.employeeInfo,
                    [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
                }
            }
        });
    };

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

    editEmployee = () => {
        this.setState({
            enable: true
        });
    }

    editChecked = (e,id) => {
        const { employeeInfo } = this.state;
        axios.put(`${BASE_LOCAL_ENDPOINT}/employees/${id}`, employeeInfo)
            .then(response => {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    type: 'success',
                    title: 'This Employee has been saved',
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
            enable
        } = this.state;
        if (redirectToEmployees) return <Redirect to="/employees" />;
        var inputs = [];
        var icon;

        if (enable) {
            icon = <i className="fas fa-check icons" onClick={(e)=>{this.editChecked(e,id)}} />;
            inputs.push(<input type="text" name="name" defaultValue={name} onChange={(e) => { this.handleChange(e, "name") }} />);
            inputs.push(<input type="text" name="job" defaultValue={job} onChange={(e) => { this.handleChange(e, "job") }} />);
            inputs.push(<input type="text" name="area" defaultValue={area} onChange={(e) => { this.handleChange(e, "area") }} />);
            inputs.push(<input type="number" name="points" defaultValue={points} onChange={(e) => { this.handleChange(e, "points") }} />);
            inputs.push(<div className="detail-item">
                <label htmlFor="imgSrc"><b>Image URL</b></label>
                <input type="text" name="imgSrc" defaultValue={imgSrc} onChange={(e) => { this.handleChange(e, "imgSrc") }} />
            </div>)
        }
        else {
            icon = <i className="far fa-edit fa-lg icons" onClick={this.editEmployee} />;
            inputs.push(<div name="name"> {name}</div>);
            inputs.push(<div name="job"> {job}</div>);
            inputs.push(<div name="area"> {area}</div>);
            inputs.push(<div name="points"> {points}</div>);
        }
        return (
            <>
                <h1 className="page-title">Employee Detail</h1>


                <div className="employee-details">

                    <div className="employee-content">
                        <div>
                            <img src={imgSrc} alt="" className="employee-image" />

                        </div>
                        <div></div>
                        <div className="employee-description">

                            <div className="detail-item">
                                <label htmlFor="name"><b>Name</b></label>
                                {inputs[0]}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="job"><b>Job</b></label>
                                {inputs[1]}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="area"><b>Area</b></label>
                                {inputs[2]}
                            </div>
                            <div className="detail-item">
                                <label htmlFor="points"><b>Points</b></label>
                                {inputs[3]}
                            </div>
                            {inputs[4]}
                        </div>
                    </div>
                    <div className="trash-content">
                        {icon}
                        <i onClick={e => this.deleteEmployee(e, id)} className="fas fa-trash fa-lg icons"></i>
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