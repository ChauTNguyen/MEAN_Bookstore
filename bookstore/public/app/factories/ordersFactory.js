var app = angular.module('bookstore');

app.factory('orders', ['$http', function ($http) {
  var o = {
    orders: []
  };

  o.getOrders = function () {
    return $http.get('/orders').success(function (data) {
      angular.copy(data, o.orders);
    });
  };

  o.createOrder = function (order) {
    return $http.post('/orders', order).success(function (data) {
      o.orders.push(order);
    });
  };

  return o;
}]);