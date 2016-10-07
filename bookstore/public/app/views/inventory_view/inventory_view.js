var app = angular.module('bookstore.inventory_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_books', {
        url: '/view_inventory',
        templateUrl: '/app/views/inventory_view/v_inv.html',
        controller: 'InventoryCtrl',
        resolve: {
          bookPromise: ['books', function (books) {
            return books.getBooks();
          }],
          authorPromise: ['authors', function (authors) {
            return authors.getAuthors();
          }]
        }
      })
      .state('book', {
        url: '/books/{id}',
        templateUrl: '/app/views/inventory_view/v_book.html',
        controller: 'BookCtrl',
        resolve: {
          book: ['$stateParams', 'books', function ($stateParams, books) {
            return books.getBook($stateParams.id);
          }]
        }
      });
  }]);

app.controller('InventoryCtrl', [
  '$scope',
  'books',
  'authors',
  function ($scope, books, authors) {
    $scope.books = books.books;
    $scope.authors = authors.authors;

    $scope.addBook = function () {
      if (!$scope._title || $scope._title === '') { return; }
      // TODO: '0'' causes the two below statements to return. 
      if (!$scope.cost || $scope.cost === '') { return; }
      if (!$scope.retailPrice || $scope.retailPrice === '') { return; }
      if ($scope.retailPrice < 0 || $scope.cost < 0) { return; }
      
      var author = document.getElementById("mainAuthor");

      books.addBook({
        bookID: $scope.bookID,
        _title: $scope._title,
        mainAuthor: author.options[e.selectedIndex].value,
        cost: $scope.cost,
        retailPrice: $scope.retailPrice,
        hasBeenSold: $scope.hasBeenSold
      });

      $scope.bookID = '';
      $scope._title = '';
      // TODO: Make $scope.mainAuthor reset on-submit as well.
      $scope.cost = '';
      $scope.retailPrice = '';
      $scope.hasBeenSold = '';
    };
  }
]);

app.controller('BookCtrl', [
  '$scope',
  'book',
  function ($scope, book) {
    $scope.book = book;
  }
]);