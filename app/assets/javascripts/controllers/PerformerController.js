app = angular.module('gamehedge')

app.controller('PerformerController', function($scope,$rootScope,$routeParams,dataService, apiService){
	$scope.getPerformerInfo = function(){
		apiService.getData('/api/v1/performers/'+$routeParams.performerId)
            .then(function(response){
                console.log("Performer");
            	console.log(response);
                $scope.performer  = response;
                $scope.getEvents();
                $scope.loading = false;
        });
	};

    $scope.getEvents = function(){
        var now = new Date();
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        apiService.getData('/api/v1/events/?selected_team='+$scope.performer.id+'&today_date='+today_date)
            .then(function(response){
                console.log("Events");
                $scope.events = response;
                console.log($scope.events);
                $scope.loading = false;
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
    $scope.loading = true;
	$scope.getPerformerInfo();
});