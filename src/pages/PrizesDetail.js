import React, {Component} from 'react';
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";

class PrizesDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            prizeInfo: {
                name: "",
                description: "",
                imgSrc: "",
                points: ""
            },
            error: ''
        }
    }

    componentDidMount(){
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
    render(){
        const {
            prizeInfo: {
                name,
                description,
                imgSrc,
                points
            }
        } = this.state;
        return (
            <>
                <h1 className="page-title">Prizes Detail</h1>
                <div className="employee-details">
                    <div>
                        <img src={imgSrc} alt="" className="employee-image" />
                    </div>
                    <div className="employee-content">
                        <p><b>Name: </b>{name}</p>
                        <p><b>Description: </b>{description}</p>
                        <p><b>Points: </b>{points}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default PrizesDetail;