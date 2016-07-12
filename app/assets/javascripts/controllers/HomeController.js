controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$http){
	
	$scope.loading = 0;
	$scope.getSports = function(){
		$http({
		  	method: 'GET',
		  	url: '/api/v1/sports/',
		  	headers: {
			   'Authorization': "Token token=TokenHere",
			},
		}).then(function successCallback(response) {
			$scope.sports = response.data;
			for(i=0;i<$scope.sports.length;i++){
				$scope.sports[i].near_events = $scope.getNear($scope.sports[i].te_uid,i);
			}

			// this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log(response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.getNear = function(id,i){
		$http({
		  	method: 'GET',
		  	url: '/events/near/?id='+id,
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.sports[i].near_events = response.data;
			$scope.loading += 1;
			// this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			$scope.sports[i].near_events = []
			$scope.loading += 1;
			// called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.getSports();
});