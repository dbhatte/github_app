'use strict';

var services = angular.module('services', ['ngResource']);

services.factory('RepoService', ['$resource', function($resource){

	return $resource('https://api.github.com/users/:username/repos', {}, {
      query: {method:'GET', params:{username : '@username'}, isArray:true, cancellable: true}
    });

}]);