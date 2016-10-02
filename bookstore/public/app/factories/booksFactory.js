var app = angular.module('bookstore');

app.factory('books', ['$http', function ($http) {
  var o = {
    books: []
  };

  o.getBooks = function () {
    return $http.get('/books').success(function (data) {
      angular.copy(data, o.books);
    });
  };

  o.addBook = function (book) {
    return $http.post('/books', book).success(function (data) {
      o.books.push(book);
    });
  };

  o.getBook = function (id) {
    return $http.get('/books/' + id).then(function (res) {
      return res.data;
    });
  };

  return o;
}]);