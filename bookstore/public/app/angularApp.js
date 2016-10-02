'use strict';

var app = angular.module('bookstore', [
  'ui.router',
  'bookstore.staff_view',
  'bookstore.orders_view',
  'bookstore.order_form',
  'bookstore.inventory_view',
  'bookstore.customers_view',
  'bookstore.authors_view'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
  }
]);