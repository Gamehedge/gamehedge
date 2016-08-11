controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$rootScope,$http,$location,$timeout,dataService){

	$scope.getEventInfo = function(){
		return apiService.getData('/api/v1/sports/'+$routeParams.leagueId)
            .then(function(response){
                console.log("League");
            	console.log(response);
                $scope.league  = response;
                $scope.getDivisions();
        });
	};
}