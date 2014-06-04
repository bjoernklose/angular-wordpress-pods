'use strict';

var app = angular
  .module('exampleApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap', // for Modal window and such
    'wp-pods-api'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pods.html',
        controller: 'PodsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(PodsEndPointProvider) {
      PodsEndPointProvider.setAPI('http://your.domain.tld/wp-json/' + 'pods/');
      PodsEndPointProvider.setAuth('Basic base64auth');
      PodsEndPointProvider.setPodTypes(['mypod']);
  });
