'use strict';

describe('GitHub controllers', function() {

  beforeEach(module('GitHubApp'));

  describe('SearchController', function(){
    var scope, $httpBackend, ctrl,
        dataRepositories = function() {
          return [
                  {
                    "id": 17923577,
                    "name": "Euler",
                    "html_url": "https://github.com/jack/Euler"
                  },
                  {
                    "id": 33790268,
                    "name": "nikhil-theme",
                    "html_url": "https://github.com/jack/nikhil-theme"
                  },
                  {
                    "id": 24246489,
                    "name": "Scripts",
                    "html_url": "https://github.com/jack/Scripts"
                  }
                ];
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('https://api.github.com/users/jack/repos').respond(dataRepositories());

      scope = $rootScope.$new();
      scope.searchTerm = 'jack';

      ctrl = $controller('SearchController', {$scope: scope});
    }));


    it('should fetch user repositories', function() {
      expect(scope.repositories).toBeUndefined();

        scope.$apply(function() {
            scope.search();
        });

      $httpBackend.flush();

      expect(scope.repositories.length).toEqual(dataRepositories().length);
    });
  });




});
