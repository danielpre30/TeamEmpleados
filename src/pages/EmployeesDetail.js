import React, { Component } from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import axios from 'axios';
import '../styles/EmployeesDetail.css'
import Card from "../components/Card";


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
   

    render() {
        const {
            employeeInfo: {
                name,
                job,
                area,
                imgSrc,
                points
            },
            prizes,
        } = this.state;
        return (
            <>
                <h1 className="page-title">Employee Detail</h1>
                <div className="employee-details">
                    <div>
                        <img src={imgSrc} alt="" className="employee-image" />
                    </div>

                    <div className="employee-content">
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