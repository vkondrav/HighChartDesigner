'use strict';

/**
 * @ngdoc overview
 * @name highChartDesignerApp
 * @description
 * # highChartDesignerApp
 *
 * Main module of the application.
 */
angular
  .module('highChartDesignerApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'highcharts-ng',
    'hljs'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
