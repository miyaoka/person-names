'use strict';

angular.module('personNamesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTable',
  'toaster'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/names/', {
        templateUrl: 'partials/names/list',
        controller: 'NamesListCtrl'
      })
      .when('/names/create', {
        templateUrl: 'partials/names/create',
        controller: 'NamesCreateCtrl'
      })
      .when('/names/fetch', {
        templateUrl: 'partials/names/fetch',
        controller: 'NamesFetchCtrl'
      })
      .when('/names/random', {
        templateUrl: 'partials/names/random',
        controller: 'NamesRandomCtrl'
      })
      .when('/names/:nameId/', {
        templateUrl: 'partials/names/view',
        controller: 'NamesViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
