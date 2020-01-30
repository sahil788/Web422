import React, { Component } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';

class Teams extends Component {
    constructor() {
        super()
        this.state = {
            teams: []
        }
    }
    componentDidMount() {
        axios.get('https://teams-api-sahil.herokuapp.com/Teams')
            .then(res => {
                const teams = res.data;
                this.setState({
                    teams
                });
            });
    }
    render() {
        return (
            <MainContainer sidebar='Teams'>
                <h1 className="page-header">Teams</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Projects</th>
                            <th>Employees</th>
                            <th>Team Lead</th>
                        </tr>
                        {this.state.teams.map((team, index) => {
                            return (
                                <tr>
                                    <td key={index}>{team.TeamName}</td>
                                    <td key={index}>
                                    {team.Projects.map((project, index) => {
                                        return (
                                        <li key={index}>{project.ProjectName}</li>
                                        )
                                    })}
                                    </td>
                                    <td key={index}>{team.Employees.lenght} Employees</td>
                                    <td key={index}>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Teams;