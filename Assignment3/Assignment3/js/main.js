/*********************************************************************************
* WEB422 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Sahil Lapsiwala Student ID: 132584160 Date: 12/10/2018
*
********************************************************************************/

var viewModel = {
    teams: ko.observableArray([]),
    employees: ko.observableArray([]),
    projects: ko.observableArray([])
};


function showGenericModal(title, message) {
    $('.modal-title').html(title);
    $('.modal-body').html(message);
    $('#genericModal').modal('show');
}

function initializeTeams() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'https://teams-api-sahil.herokuapp.com/teams-raw',
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.teams = ko.mapping.fromJS(data);
                resolve(data);
            })
            .fail(function (err) {
                reject("Error loading the team data.");
            });
    })
}


function initializeEmployees() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'https://teams-api-sahil.herokuapp.com/employees',
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.employees = ko.mapping.fromJS(data);
                resolve(data);
            })
            .fail(function (err) {
                reject("Error loading the employee data.");
            });
    })
}



function initializeProjects() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'https://teams-api-sahil.herokuapp.com/projects',
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.projects = ko.mapping.fromJS(data);
                resolve(data);
            })
            .fail(function (err) {
                reject("Error loading the project data.");
            });
    })
}

$(function () {

    initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(function () {
            ko.applyBindings(viewModel);
            $('.multiple').multipleSelect({ filter: true });
            $('.single').multipleSelect({ single: true, filter: true });
        }).catch(function (err) {
            showGenericModal('Error', 'Unable to get the data');
        })
});

function saveTeam() {
    let currentTeam = this;
    $.ajax({
        url: "https://teams-api-sahil.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
        }),
        contentType: "application/json"
    })
        .done(function (data) {
            showGenericModal('Success', currentTeam.TeamName() + ' Updated Successfully')
        })
        .fail(function (err) {
            showGenericModal('Error', 'Error updating the team information.');
        });
}