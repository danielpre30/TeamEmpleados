import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import CardContainer from '../containers/CardContainer'

class Employees extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return (
            <div>
                <NavBar/>
                <h1>Employees</h1>
                <CardContainer cardType="employees"/>
            </div>
        );
    }
    
}

export default Employees;