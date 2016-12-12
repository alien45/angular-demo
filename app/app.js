(function(angular) {
  'use strict';

// Declare app level module which depends on views, and components
  angular.module('demoApp', [
    'ngRoute',
    'ui.bootstrap',
    'pages.home',
  ]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
})(angular);

