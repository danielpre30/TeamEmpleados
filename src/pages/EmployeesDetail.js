import React, { Component } from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import axios from 'axios';

class EmployeesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeInfo: {
                name: "",
                job: "",
                area: "",
                imgSrc: "",
                points: ""
            },
            error: ''
        }
    }

    componentDidMount() {
        this.getEmployee();
    }
    getEmployee() {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
            .then(response => {
                this.setState({
                    employeeInfo: response.data,
                    error: ''
                })
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
            }
        } = this.state;
        return (
            <>
                <h1 className="page-title">Employee Detail</h1>
                <div>
                    <img src={imgSrc} alt="" />
                    <p><b>Name: </b>{name}</p>
                    <p><b>Job: </b>{job}</p>
                    <p><b>Area: </b>{area}</p>
                    <p><b>Points: </b>{points}</p>
                </div>
            </>
        );
    }
}

export default EmployeesDetail;