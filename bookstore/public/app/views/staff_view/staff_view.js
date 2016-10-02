'use strict';

var app = angular.module('bookstore.staff_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_employees', {
        url: '/view_employees',
        templateUrl: '/app/views/staff_view/v_employees.html',
        controller: 'EmployeesCtrl',
        resolve: {
          employeePromise: ['employees', function (employees) {
            return employees.getEmployees();
          }]
        }
      });
  }]);

app.controller('EmployeesCtrl', [
  '$scope',
  'employees',
  function ($scope, employees) {
    $scope.employees = employees.employees;

    $scope.addEmployee = function () {
      employees.addEmployee({
        lastName: $scope.lastName,
        firstName: $scope.firstName,
        status: $scope.status
      });
    };
  }
]);