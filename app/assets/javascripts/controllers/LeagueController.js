app = angular.module('gamehedge')

app.controller('LeagueController', function($scope,$rootScope,$routeParams,dataService,apiService,$window,$http){
	$scope.getLeagueInfo = function(){
		return apiService.getData('/api/v1/sports/'+$routeParams.leagueId)
            .then(function(response){
                console.log("League");
            	console.log(response);
                $scope.league  = response;
                $scope.getDivisions();
                $scope.getNextEvents();
        });
	};

	$scope.getDivisions = function(){
		return apiService.getData('/api/v1/divisions/?sport_id='+$scope.league.id)
            .then(function(response){
                console.log("Divisions");
            	console.log(response);
                $scope.divisions = response;
                var len = $scope.divisions.length;
                var mid = len / 2;
                $scope.divisions_first  = $scope.divisions.slice(0, mid);  
                $scope.divisions_last = $scope.divisions.slice(mid, len);
                $scope.getPerformers();
        });
	};

	$scope.getPerformers = function(){
		return apiService.getData('/api/v1/performers/?sport_id='+$scope.league.id)
            .then(function(response){
                console.log("Performers");
            	console.log(response);
                $scope.performers = response;
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
	$scope.getNextEvents = function(){
        id = $scope.league.te_uid;
        source = "league";
        url = '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=10&geolocated=true';
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response2) {
            $scope.next_events = response2.data;
            if($scope.next_events != null){
                for(j=$scope.next_events.length - 1;j>=0;j--){
                    if($scope.next_events[j].performances.length != 2){
                        $scope.next_events.splice(j,1);
                    }
                }
            }
            $scope.ready = true;
            console.log("Next events");
            console.log($scope.next_events);
        }, function errorCallback(response2) {
            console.log(response2);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

	//Initializers
    $scope.loading = true;
    $scope.next_events = [];
	$scope.getLeagueInfo();
    $window.scrollTo(0, 0);
});