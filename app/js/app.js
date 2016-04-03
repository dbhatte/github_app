var gitHubApp = angular.module('GitHubApp', ['ngRoute', 'ngResource', 'controllers']);


gitHubApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
    when('/app', {
      templateUrl: 'partials/search.html',
      controller: 'SearchController'
    }).
    otherwise({
      redirectTo: '/app'
    });
}]);