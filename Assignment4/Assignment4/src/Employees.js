import React, { Component } from 'react';

import MainContainer from './MainContainer';

import axios from 'axios';

import moment from 'moment';

class Employees extends Component {
    constructor() {
        super();
        this.state = { employees: [] };
    }
    componentDidMount() {
        axios.get("https://teams-api-sahil.herokuapp.com/employees").then((res) => {
            this.setState({
                employees: res.data
            });
        })
    }
    render() {
        return (
            <MainContainer sidebar='Employees'>
                <h1 className="page-header">Employees</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name & Position</th>
                            <th>Address</th>
                            <th>Phone Num</th>
                            <th>Hire Date</th>
                            <th>Salary Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(function (employee, index) {
                            return (
                                <tr>
                                    <td>{employee.FirstName}
                                        {employee.FirstName} - {employee.Position.PositionName}</td>
                                    <td>{employee.AddressStreet},
                                        {employee.AddressCity},
                                        {employee.AddressState}
                                        {employee.AddressZip}</td>
                                    <td>{employee.PhoneNum},
                                        Ext {employee.Extension}</td>
                                    <td>{moment(employee.HireDate).format('LL')}</td>
                                    <td>$ {employee.SalaryBonus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ MainContainer>
        );
    }
}

export default Employees;