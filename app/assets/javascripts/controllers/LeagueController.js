app = angular.module('gamehedge')

app.controller('LeagueController', function($scope,$rootScope,$routeParams,dataService, apiService){
	$scope.getLeagueInfo = function(){
		return apiService.getData('/api/v1/sports/'+$routeParams.leagueId)
            .then(function(response){
                console.log("League");
            	console.log(response);
                $scope.league  = response;
                $scope.getDivisions();
        });
	};

	$scope.getDivisions = function(){
		return apiService.getData('/api/v1/divisions/?sport_id='+$scope.league.id)
            .then(function(response){
                console.log("Divisions");
            	console.log(response);
                $scope.divisions = response;
                $scope.getPerformers();
        });
	};

	$scope.getPerformers = function(){
		return apiService.getData('/api/v1/performers/?sport_id='+$scope.league.id)
            .then(function(response){
                console.log("Performers");
            	console.log(response);
                $scope.performers = response;
        });
	};

	//Search call

	$scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	console.log(response);
                return response;
        });
    };	
	  

	//Initializers

	$scope.getLeagueInfo();
});