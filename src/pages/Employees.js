import React, { Component } from 'react';
import CardContainer from '../containers/CardContainer'

class Employees extends Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        return (
            <>
                <h1 className="page-title">Employees</h1>
                <CardContainer cardType="employees" />
            </>
        );
    }

}

export default Employees;