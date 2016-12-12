(function(angular) {
  'use strict';

// Declare app level module which depends on views, and components
  angular.module('demoApp', [
    'ngRoute',
    'ui.bootstrap',
    'pages.home',
  ]);
  angular.module('demoApp').config(function ($locationProvider, $routeProvider) {
    'use strict';
    // user '!' after '#' on each pages
    $locationProvider.hashPrefix('!');
    // if page route is not defined redirect to default page
    $routeProvider.otherwise({redirectTo: '/home'});
  });
})(angular);

