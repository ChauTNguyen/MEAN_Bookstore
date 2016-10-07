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
        controller: 'EmployeeListCtrl',
        resolve: {
          employeePromise: ['employees', function (employees) {
            return employees.getEmployees();
          }]
        }
      });
  }]);

app.controller('EmployeeListCtrl', [
  '$scope',
  'employees',
  function ($scope, employees) {
    $scope.employees = employees.employees;

    $scope.addEmployee = function () {
      if (!$scope.lastName || $scope.lastName === '') { return; }
      if (!$scope.firstName || $scope.firstName === '') { return; }
      if (!$scope.status || $scope.status === '') { return; }

      employees.addEmployee({
        lastName: $scope.lastName,
        firstName: $scope.firstName,
        status: $scope.status
      });

      $scope.lastName = '';
      $scope.firstName = '';
      $scope.status = '';
    };
  }
]);