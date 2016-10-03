controllers = angular.module('gamehedge')

controllers.controller('HomeController', function($scope,$rootScope,$http,$location,dataService,$window, $timeout,Auth,apiService){
    $rootScope.showHeader = true;
	$scope.TilesIndex = 0;
	$scope.loading = true;
	$rootScope.locat = $location.url();
    
    $scope.car_interval = 0;
    $scope.car_noWrapSlides = false;
    $scope.car_active = 0;
    $rootScope.title = "Home | Gamehedge";
    $rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by a certain amount or more, get 50% of your ticket price back.";
	
	$scope.getTiles = function(){
		apiService.getData('/api/v1/tiles/')
            .then(function(response){
            	$scope.tiles = response;
				for(i=0;i<$scope.tiles.length;i++){
					$scope.tiles[i].ready = false;
				}
				$scope.loading = false;
				$scope.TilesIndex = 0;
				for(i=0;i<$scope.tiles.length;i++){
					if($scope.tiles[i].tile_type.id != "4"){
						$scope.getNextEvents(i);	
					}
					else{
						console.log($scope.tiles[i]);
						$scope.tiles[i].ready = true;
					}
				}
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
				if($scope.tiles[index].has_geolocation == false){
					id = $scope.tiles[index].venue.te_uid;
				}
				else{
					id = 0;
				}
				source = "venue";
			}
		}
		if($scope.tiles[index].has_geolocation == true){
			url = '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=50&geolocated=true';
		}
		else{
			url = '/events/next/?type=events&id='+id+'&source='+source+'&page=1&perpage=50';
		}
		//console.log(url)
		$http({
		  	method: 'GET',
		  	url: url,
		}).then(function successCallback(response2) {
			if($scope.tiles[index].tile_type.id == '3' && $scope.tiles[index].has_geolocation == true){
				$scope.tiles[index].events = response2.data.events;
				$scope.tiles[index].venue = response2.data.venue;
				$scope.tiles[index].url = response2.data.venue.url;
			}
			else{
				$scope.tiles[index].events = response2.data;
			}
			if($scope.tiles[index].events != null){
				for(j=$scope.tiles[index].events.length - 1;j>=0;j--){
					// if($scope.tiles[index].events[j].performances.length != 2){
					// 	$scope.tiles[index].events.splice(j,1);
					// }
					if($scope.tiles[index].events[j] != undefined){
                        if(moment().add(1,'h').isAfter(String($scope.tiles[index].events[j].occurs_at).replace('Z',''))) {
                            $scope.tiles[index].events.splice(j, 1);
                        }
                    }
				}
			}
			$scope.tiles[index].ready = true;
			index += 1;
			if(index >= $scope.tiles.length){
				//console.log("Tiles");
				//console.log($scope.tiles);
				
			}
			$timeout(function(){
				$('.grid').masonry({
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition: true,
					gutter: 23,
				});
			},500)
			
		}, function errorCallback(response2) {
			//console.log(response2);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	
	$scope.getNear = function(id,i){
		$http({
		  	method: 'GET',
		  	url: '/events/near/?id='+id,
		}).then(function successCallback(response) {
			//console.log(response.data);
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
		var now = new Date();
		now.setHours(now.getHours() + 1);
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        return dataService.getData("/search/?search=" + val + "&limit=4&today_date="+today_date)
            .then(function(response){
            	//console.log(response)
                var width = $("#search_element").width() + 50;
                //console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                $scope.searchBarResults = response.data;
                return response.data;
        });
    };	
    $scope.onSelect = function ($item, $model, $label) {
        $location.path($scope.searchTerm.url);
    };

    $scope.goToSearch = function(){
        if($scope.searchBarResults != undefined){
            if($scope.searchBarResults.length > 0){
                $location.path($scope.searchBarResults[0].url);
            }
        }
    }
    
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
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 100);
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 200);
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 500);
    
	//Initializers
	$rootScope.isOrder = false;
    $rootScope.isEvent = false;
	$rootScope.darkHeader = false;
	$rootScope.noFooter = false;
	$scope.searchTerm = "";
	$scope.getTiles();
	$window.scrollTo(0, 0);
    $scope.compareDate =  "2015-09-05T00:00:00.000Z";
    //The global variable locat gets the current location.path
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
        $rootScope.isLoggedin = true;
    }, function(error) {
        // unauthenticated error
        //console.log("error login");
        $rootScope.user = undefined;
        $rootScope.isLoggedin = false;
    });
})
.filter('spaceless', function () {
  return function (input) {
      return input.replace(/ /g, '-');
  };
})
.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                $('.grid').masonry({
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition: true,
					gutter: 23,
				});
            });
            element.bind('error', function(){
                $('.grid').masonry({
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition: true,
					gutter: 23,
				});
            });
        }
    };
});