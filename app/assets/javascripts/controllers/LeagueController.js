app = angular.module('gamehedge')

app.controller('LeagueController', function($scope,$rootScope,$routeParams,dataService,apiService,$window,$http,$location, $timeout,Auth){
	$rootScope.showHeader = true;
    $scope.getLeagueInfo = function(){
		apiService.getData('/api/v1/sports/'+$routeParams.leagueId)
            .then(function(response){
                //console.log("League");
            	//console.log(response);
                $scope.league  = response;
                if($routeParams.slug == $scope.league.slug){
                    if($scope.league.active == true){
                        $scope.getDivisions();
                        $scope.getNextEvents();    
                    }
                    else{
                        $location.path("/");
                    }
                }
                else{
                    $location.path("/");
                }
        });
	};

	$scope.getDivisions = function(){
		apiService.getData('/api/v1/divisions/?sport_id='+$scope.league.id)
            .then(function(response){
                //console.log("Divisions");
            	//console.log(response);
                $scope.divisions = response;
                var len = $scope.divisions.length;
                var mid = len / 2;
                $scope.divisions_first  = $scope.divisions.slice(0, mid);  
                $scope.divisions_last = $scope.divisions.slice(mid, len);
                $scope.getPerformers();
        });
	};

	$scope.getPerformers = function(){
		apiService.getData('/api/v1/performers/?sport_id='+$scope.league.id)
            .then(function(response){
                //console.log("Performers");
            	//console.log(response);
                $scope.performers = response;
                $scope.loading = false;
        });
	};

	//Search call

	$scope.getSearchHints = function(val) {
        var now = new Date();
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        return dataService.getData("/search/?search=" + val + "&limit=4&today_date="+today_date)
            .then(function(response){
            	//console.log(response);
            
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
            //console.log("Next events");
            //console.log($scope.next_events);
        }, function errorCallback(response2) {
            //console.log(response2);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        
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
    $rootScope.darkHeader = false;
    $rootScope.noFooter = false;
    $scope.loading = true;
    $scope.searchTerm = "";
    $scope.next_events = [];
	$scope.getLeagueInfo();
    $window.scrollTo(0, 0);
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
});