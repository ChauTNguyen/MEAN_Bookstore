'use strict';

var app = angular.module('bookstore.orders_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_orders', {
        url: '/view_orders',
        templateUrl: '/app/views/orders_view/v_orders.html',
        controller: 'OrdersCtrl',
        resolve: {
          bookPromise: ['books', function (books) {
            return books.getBooks();
          }],
          customerPromise: ['customers', function (customers) {
            return customers.getCustomers();
          }],
          employeePromise: ['employees', function (employees) {
            return employees.getEmployees();
          }],
          orderPromise: ['orders', function (orders) {
            return orders.getOrders();
          }]
        }
      });
  }]);

app.controller('OrdersCtrl', [
  '$scope',
  'orders',
  function ($scope, orders) {
    $scope.orders = orders.orders;
  }
]);