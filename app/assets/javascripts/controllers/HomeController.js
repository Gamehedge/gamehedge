controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$http){
	
	$scope.loading = 0;
	$scope.getTiles = function(){
		$http({
		  	method: 'GET',
		  	url: '/api/v1/tiles/',
		  	headers: {
			   'Authorization': "Token token=TokenHere",
			},
		}).then(function successCallback(response) {
			$scope.tiles = response.data;
			console.log($scope.tiles);
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
	$('.grid').masonry({
	  itemSelector: '.grid-item',
	  columnWidth: 160,
	  gutterWidth: 20,
	});
	$scope.getTiles();
});