'use strict';

var app = angular.module('bookstore.customers_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_customers', {
        url: '/view_customers',
        templateUrl: '/app/views/customers_view/v_customers.html',
        controller: 'CustomersCtrl',
        resolve: {
          customerPromise: ['customers', function (customers) {
            return customers.getCustomers();
          }]
        }
      })
      .state('customer', {
        url: '/customers/{id}',
        templateUrl: '/app/views/customers_view/v_customer.html',
        controller: 'CustomerCtrl',
        resolve: {
          customer: ['$stateParams', 'customers', function ($stateParams, customers) {
            return customers.getCustomer($stateParams.id);
          }]
        }
      });
  }]);

app.controller('CustomersCtrl', [
  '$scope',
  'customers',
  function ($scope, customers) {
    $scope.customers = customers.customers;

    $scope.addCustomer = function () {
      if (!$scope.lastName || $scope.lastName === '') {
        return;
      }
      if (!$scope.firstName || $scope.firstName === '') {
        return;
      }

      customers.addCustomer({
        lastName: $scope.lastName,
        firstName: $scope.firstName,
        phoneNumber: $scope.phoneNumber
      });

      $scope.lastName = '';
      $scope.firstName = '';
      $scope.phoneNumber = '';
    };
  }
]);

app.controller('CustomerCtrl', [
  '$scope',
  'customer',
  function ($scope, customer) {
    $scope.customer = customer;
  }
]);