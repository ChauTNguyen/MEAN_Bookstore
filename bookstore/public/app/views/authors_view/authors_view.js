'use strict';

var app = angular.module('bookstore.authors_view', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list_of_authors', {
        url: '/view_authors',
        templateUrl: '/app/views/authors_view/v_authors.html',
        controller: 'AuthorsCtrl',
        resolve: {
          authorPromise: ['authors', function (authors) {
            return authors.getAuthors();
          }]
        }
      })
      .state('author', {
        url: '/authors/{id}',
        templateUrl: '/app/views/authors_view/v_author.html',
        controller: 'AuthorCtrl',
        resolve: {
          author: ['$stateParams', 'authors', function ($stateParams, authors) {
            return authors.getAuthor($stateParams.id);
          }]
        }
      });
  }
]);

app.controller('AuthorsCtrl', [
  '$scope',
  'authors',
  function ($scope, authors) {
    $scope.authors = authors.authors;
    $scope.addAuthor = function () {
      if (
        (!$scope.lastName || $scope.lastName === '') ||
        (!$scope.firstName || $scope.firstName === '')) {
        return;
      }

      authors.addAuthor({ lastName: $scope.lastName, firstName: $scope.firstName });

      $scope.lastName = '';
      $scope.firstName = '';
    };
  }
]);

app.controller('AuthorCtrl', [
  '$scope',
  'author',
  'authors',
  function ($scope, author, authors) {
    $scope.author = author;
    $scope.editAuthor = function () {
      if (!$scope.lastName || $scope.lastName === '') { return; }
      if (!$scope.firstName || $scope.firstName === '') { return; }

      authors.updateAuthor(
        author._id, {
          lastName: $scope.lastName,
          firstName: $scope.firstName
        }).success(function (data) {
          // Update the placeholders of the two input fields.'
          $scope.author.lastName = $scope.lastName;
          $scope.author.firstName = $scope.firstName;

          $scope.lastName = '';
          $scope.firstName = '';
        });
    };
  }
]);