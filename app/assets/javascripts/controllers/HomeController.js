controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$rootScope,$http,$location,$timeout,dataService,$window){
	$scope.TilesIndex = 0;
	$scope.loading = true;
	$rootScope.locat = $location.url();
    
    $scope.car_interval = 0;
    $scope.car_noWrapSlides = false;
    $scope.car_active = 0;
	
	$scope.getTiles = function(){
		$http({
		  	method: 'GET',
		  	url: '/api/v1/tiles/',
		  	headers: {
			   'Authorization': "Token token=TokenHere",
			},
		}).then(function successCallback(response) {
			$scope.tiles = response.data;
			for(i=0;i<$scope.tiles.length;i++){
				$scope.tiles[i].ready = false;
			}
			$scope.loading = false;
			$scope.TilesIndex = 0;
			for(i=0;i<$scope.tiles.length;i++){
				$scope.getNextEvents(i);	
			}
		}, function errorCallback(response) {
			console.log(response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.getNextEvents = function(index){
		var id = 0;
		var url = "";
		source = "";
		if($scope.tiles[index].tile_type != undefined){
			if($scope.tiles[index].tile_type.id == '1'){
				id = $scope.tiles[index].sport.te_uid;
				source = "league";
			}
			else if($scope.tiles[index].tile_type.id == '2'){
				id = $scope.tiles[index].performer.te_uid;	
				source = "team";
			}
			else if($scope.tiles[index].tile_type.id == '3'){
				id = $scope.tiles[index].venue.te_uid;
				source = "venue";
			}
		}
		if($scope.tiles[index].has_geolocation == true){
			url = '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=10&geolocated=true';
		}
		else{
			url = '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=10';
		}
		console.log(url)
		$http({
		  	method: 'GET',
		  	url: url,
		}).then(function successCallback(response2) {
			$scope.tiles[index].events = response2.data;
			if($scope.tiles[index].events != null){
				for(j=$scope.tiles[index].events.length - 1;j>=0;j--){
					if($scope.tiles[index].events[j].performances.length != 2){
						$scope.tiles[index].events.splice(j,1);
					}
				}
			}
			$scope.tiles[index].ready = true;
			index += 1;
			if(index >= $scope.tiles.length){
				console.log("Tiles");
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

	//Search call

	$scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	//console.log(response)
                var width = $("#search_element").width() + 50;
                console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                
                return response;
        });
    };	
    
    $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: true,
        arrows: false,  
        infinite: false,
        dots: true,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
            }
        }
    };
	//Initializers
	$rootScope.isOrder = false;
	$rootScope.darkHeader = false;
	$rootScope.noFooter = false;
	$scope.getTiles();
	$window.scrollTo(0, 0);
    $scope.compareDate =  "2015-09-05T00:00:00.000Z";
})
.filter('spaceless', function () {
  return function (input) {
      return input.replace(/ /g, '-');
  };
});