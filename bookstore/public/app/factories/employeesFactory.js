var app = angular.module('bookstore');

app.factory('employees', ['$http', function ($http) {
  var o = {
    employees: []
  };

  o.getEmployees = function () {
    return $http.get('/employees').success(function (data) {
      angular.copy(data, o.employees);
    });
  };

  o.addEmployee = function (employee) {
    return $http.post('/employees', employee).success(function (data) {
      o.employees.push(employee);
    });
  };

  return o;
}]);