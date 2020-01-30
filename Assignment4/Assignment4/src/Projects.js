import React, { Component } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';
import moment from 'moment';

class Projects extends Component {
    constructor() {
        super()
        this.state = {
            projects: []
        }
    }
    componentDidMount() {
        axios.get('https://teams-api-sahil.herokuapp.com/projects')
            .then(res => {
                const projects = res.data;
                this.setState({
                    projects
                });
            });
    }
    render() {
        return (
            <MainContainer sidebar='Projects'>
                <h1 className="page-header">Projects</h1>
                <div className="row">
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                                {this.state.projects.map((project, index) => {
                                    return (
                                        <tr>
                                            <td key={index}>{project.ProjectName}</td>
                                            <td key={index}>{project.ProjectDescription}</td>
                                            <td key={index}>{moment(project.ProjectStartDate).format('LL')}</td>
                                            <td key={index}>{(project.ProjectEndDate == null ? 'n/a' : moment(project.ProjectEndDate).format('LL'))}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
               
            </MainContainer>
        );
    }
}

export default Projects;