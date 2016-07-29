controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$rootScope,$http,$location){
	$scope.loading = 0;
	$scope.TilesIndex = 0;
	$rootScope.locat = $location.url();
	$scope.getTiles = function(){
		$http({
		  	method: 'GET',
		  	url: '/api/v1/tiles/',
		  	headers: {
			   'Authorization': "Token token=TokenHere",
			},
		}).then(function successCallback(response) {
			$scope.tiles = response.data;
			$scope.TilesIndex = 0;
			$scope.getNextEvents();
				
			
		}, function errorCallback(response) {
			console.log(response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.getNextEvents = function(){
		var id = 0;
		if($scope.tiles[$scope.TilesIndex].tile_type.id == '1'){
			id = $scope.tiles[$scope.TilesIndex].sport.te_uid;
			source = "league";
		}
		else if($scope.tiles[$scope.TilesIndex].tile_type.id == '2'){
			id = $scope.tiles[$scope.TilesIndex].performer.te_uid;	
			source = "team";
		}
		else if($scope.tiles[$scope.TilesIndex].tile_type.id == '3'){
			id = $scope.tiles[$scope.TilesIndex].venue.te_uid;
			source = "venue";
		}
		$http({
		  	method: 'GET',
		  	url: '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=10',
		}).then(function successCallback(response2) {
			$scope.tiles[$scope.TilesIndex].events = response2.data;
			for(j=$scope.tiles[$scope.TilesIndex].events.length - 1;j>=0;j--){
				if($scope.tiles[$scope.TilesIndex].events[j].performances.length != 2){
					$scope.tiles[$scope.TilesIndex].events.splice(j,1);
				}
			}
			$scope.TilesIndex += 1;
			if($scope.TilesIndex < $scope.tiles.length){
				$scope.getNextEvents();
			}
			else{
				console.log($scope.tiles);
			}
		}, function errorCallback(response2) {
			console.log(response2);
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