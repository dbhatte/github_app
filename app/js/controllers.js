var controllers = angular.module('controllers', ['services']);

controllers.controller('SearchController', ['$scope', '$timeout', 'RepoService', function ($scope, $timeout, RepoService){

   $scope.search = function() {
   		
        $scope.searching = true;

        $scope.noRepositories = false;
        $scope.userDoesNotExist = false;
        $scope.notResponding = false;
        $scope.processed = false;

        $scope.repositories = [];

        $scope.repoResource = RepoService.query({'username': $scope.searchTerm} ,
            function(data) {
                $scope.processed = true;
                $scope.searching = false;
                $scope.repositories = data;
                if (data.length === 0) {
                    $scope.noRepositories = true;
                }
            }, function(e) {
                $scope.searching = false;

                if (!$scope.processed) {
                    $scope.processed = true;

                    $scope.userDoesNotExist = true;
                }
            });

        $timeout(function (){

            if (!$scope.processed) {

                $scope.processed = true;
                $scope.notResponding = true;
                $scope.repoResource.$cancelRequest();
            }

        }, 1000);
	}
}]);