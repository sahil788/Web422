/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Sahil Lapsiwala Student ID: 132584160 Date: 28/01/2018
*
*
********************************************************************************/



$(function () {
    let employeesModel = [];
    let filteredEmployeesModel = [];

    initializeEmployeesModel();

    function initializeEmployeesModel() {
        $.ajax({
            url: "https://teams-api-sahil.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (employees) {
            employeesModel = _.take(employees, 300);
            refreshEmployeeRows(employeesModel);
        })
        .fail(function () {
            showGenericModal('Error', "Unable to get Employees");
        });
    }

    function showGenericModal(title, message) {
        $("#genericModal").modal ({
            backdrop: 'static', 
            keyboard: false, 
        });
        $("#modal-title").empty();
        $("#modal-body").empty();
        $("#modal-title").text(title);
        $("#modal-body").html(message);
    }

    function refreshEmployeeRows(employees) {
        let rowTemplate = _.template('<% _.forEach(employees, function(employee) { %>' +
            '<div class="row body-row" data-id="<%- employee._id %>">' +
            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
            '</div>' +
            '<% }); %>');
        let rows = rowTemplate({ 'employees': employees });
        $('#employees-table').empty();
        $("#employees-table").append(rows);
    }

    function getFilteredEmployeesModel(filterString) {
        let expression = new RegExp(filterString.toUpperCase());
        filteredEmployeesModel = _.filter(employeesModel, function (employee) {
            let firstName = employee.FirstName.toUpperCase();
            let lastName = employee.LastName.toUpperCase();
            let positionName = employee.Position.PositionName.toUpperCase();

            if ((firstName.search(expression) > -1) ||
                (lastName.search(expression) > -1) ||
                (positionName.search(expression) > -1)) {
                return true;
            } else {
                return false;
            }
        });
        return filteredEmployeesModel;
    }

    function getEmployeeModelById(id) {
        let employeeById = _.find(employeesModel, function (employee) {
            if (employee._id == id) {
                return _.cloneDeep(employee);
            } else {
                return null;
            }
        });
        
        return employeeById;
    }
    initializeEmployeesModel();
    $('#employee-search').on('keyup', function () {
        let strToSearch = $('#employee-search').val();
        let result = getFilteredEmployeesModel(strToSearch);
        
        refreshEmployeeRows(result);
    });

    $('.bootstrap-header-table').on('click', '.body-row', function(){
        let clickedID = $(this).attr('data-id');
        
        let empData = getEmployeeModelById(clickedID);
        

        let mDate = moment(empData.HireDate);
        empData.HireDate = mDate.format('LL');
        

        let modelBox = _.template('<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%-employee.Extension %><br>' +
            '<strong>Hire Date:</strong> <%- employee.HireDate %>');

            showGenericModal(
                empData.FirstName + " " + empData.LastName, 
                modelBox({ 'employee':empData })
            );
    });

});