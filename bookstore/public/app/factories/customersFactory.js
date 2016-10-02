var app = angular.module('bookstore');

app.factory('customers', ['$http', function ($http) {
  var o = {
    customers: []
  };

  o.getCustomers = function () {
    return $http.get('/customers').success(function (data) {
      angular.copy(data, o.customers);
    });
  };

  o.addCustomer = function (customer) {
    return $http.post('/customers', customer).success(function (data) {
      o.customers.push(customer);
    });
  };

  o.getCustomer = function (id) {
    return $http.get('/customers/' + id).then(function (res) {
      return res.data;
    });
  };

  return o;
}]);