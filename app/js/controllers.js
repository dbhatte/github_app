var controllers = angular.module('controllers', ['services']);

controllers.controller('SearchController', ['$scope', '$timeout', 'RepoService', function ($scope, $timeout, RepoService){

   $scope.search = function() {
   		
        $scope.showMessage('Searching for '+$scope.searchTerm, false);
        $scope.repositories = [];
        $scope.processed = false;

        $scope.repoResource = RepoService.query({'username': $scope.searchTerm} ,
            function(data) {
                $scope.processed = true;
                $scope.repositories = data;
                if (data.length === 0) {
                    $scope.showMessage('The user '+$scope.searchTerm+' does not have any repositories', true);
                }
            }, function(e) {
                $scope.showMessage('', false);
                $scope.processed = true;
                $scope.showMessage('The user '+$scope.searchTerm+' does not exist', true);
            });

        $timeout(function (){
            if (!$scope.processed) {
                $scope.processed = true;
                $scope.showMessage('Website not responding', true);
                $scope.repoResource.$cancelRequest();
            }
        }, 1000);
	}

    $scope.showMessage = function(messageText, isError) {
        $scope.messageText = messageText;
        $scope.isError = isError;
        $scope.isInfo = !isError;
    };
}]);