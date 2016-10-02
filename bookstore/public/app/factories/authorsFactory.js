var app = angular.module('bookstore');

app.factory('authors', ['$http', function ($http) {
  var o = {
    authors: []
  };

  o.getAuthors = function () {
    return $http.get('/authors').success(function (data) {
      angular.copy(data, o.authors);
    });
  };

  o.addAuthor = function (author) {
    return $http.post('/authors', author).success(function (data) {
      o.authors.push(author);
    });
  };

  o.getAuthor = function (id) {
    return $http.get('/authors/' + id).then(function (res) {
      return res.data;
    });
  };

  o.updateAuthor = function (id, data) {
    return $http.put('/authors/' + id, data);
  };

  return o;
}]);