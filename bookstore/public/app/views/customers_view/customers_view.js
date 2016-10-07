var app = angular.module('bookstore.customers_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_customers', {
        url: '/view_customers',
        templateUrl: '/app/views/customers_view/v_customers.html',
        controller: 'CustomerListCtrl',
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

app.controller('CustomerListCtrl', [
  '$scope',
  'customers',
  function ($scope, customers) {
    $scope.customers = customers.customers;

    $scope.addCustomer = function () {
      if (!$scope.lastName || $scope.lastName === '') { return; }
      if (!$scope.firstName || $scope.firstName === '') { return; }

      customers.addCustomer({
        lastName: $scope.lastName,
        firstName: $scope.firstName,
        phoneNumber: $scope.phoneNumber
      });

      $scope.lastName = '';
      $scope.firstName = '';
      $scope.phoneNumber = '';
    };

    $scope.getTotalNoOfBooksBought = function (customer) {
      var sum = 0;

      if (customer.orders) {
        for (var i = 0; i < customer.orders.length; ++i) {
          if (customer.orders[i].booksOrdered.length) {
            sum += customer.orders[i].booksOrdered.length;
          }
        }
      }

      return sum;
    }

    $scope.getTotalMoneySpent = function (customer) {
      var sum = 0;

      // Temporary error handling.
      if (customer.orders) {
        for (var i = 0; i < customer.orders.length; ++i) {
          if (customer.orders[i].total) {
            sum += customer.orders[i].total;
          }
        }
      }

      return sum;
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