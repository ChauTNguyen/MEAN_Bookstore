'use strict';

var app = angular.module('bookstore.order_form', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('create_order', {
        url: '/create_order',
        templateUrl: '/app/views/order_form/create_order.html',
        controller: 'CreateOrderCtrl',
        resolve: {
          bookPromise: ['books', function (books) {
            return books.getBooks();
          }],
          customerPromise: ['customers', function (customers) {
            return customers.getCustomers();
          }],
          employeePromise: ['employees', function (employees) {
            return employees.getEmployees();
          }]
        }
      });
  }
]);

app.controller('CreateOrderCtrl', [
  '$scope',
  'books',
  'customers',
  'employees',
  'orders',
  function ($scope, books, customers, employees, orders) {
    $scope.books = books.books;
    $scope.customers = customers.customers;
    $scope.employees = employees.employees;

    var customer = document.getElementById("customer");
    var employee = document.getElementById("employee");

    $scope.getOrderTotal = function () {
      var sum = 0;

      for (var i = 0; i < $scope.cart.length; ++i) {
        sum += $scope.cart[i].retailPrice;
      }

      return sum;
    };

    $scope.cart = [];

    $scope.createOrder = function () {
      orders.createOrder({
        date: Date.now(),
        id: $scope.id,
        orderedBy: customer.options[customer.selectedIndex].value,
        soldBy: employee.options[employee.selectedIndex].value,
        booksOrdered: $scope.cart,
        total: $scope.getOrderTotal()
      });

      $scope.id = '';
      $scope.cart = [];
      // TODO: Selected options are not removed.
    };

  }
]);