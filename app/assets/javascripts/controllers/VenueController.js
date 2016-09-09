app = angular.module('gamehedge')

app.controller('VenueController', function($scope,$rootScope,$routeParams,dataService, apiService,$window,$location, $timeout,Auth){
    $rootScope.showHeader = true;
	$scope.getVenueInfo = function(){
		apiService.getData('/api/v1/venues/'+$routeParams.venueId)
            .then(function(response){
                console.log("Venue");
            	console.log($scope.venue);
                $scope.venue  = response;
                if($routeParams.slug == $scope.venue.slug){
                    $scope.getEvents();
                }
                else{
                    $location.path("/");
                }
        });
	};

    $scope.getTestimonials = function(){
        apiService.getData('/api/v1/testimonials/?performer_id='+String($scope.performer.id))
            .then(function(response){
                //console.log("Testimonials");
                $scope.testimonials = response;
                //console.log($scope.testimonials);
        });
    }

    $scope.getEvents = function(){
        var now = new Date();
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        var url = ""
        if($scope.performer_id == 0){
            url = '/api/v1/events/?venue_id='+$scope.venue.id+'&today_date='+today_date+'&page='+$scope.page+'&per_page=10';
        }
        else{
            url = '/api/v1/events/?venue_id='+$scope.venue.id+'&today_date='+today_date+'&page='+$scope.page+'&per_page=10&selected_team='+$scope.performer_id;
        }
        //console.log(url)
        apiService.getData(url)
            .then(function(response){
                //console.log("Events");
                $scope.events = $scope.events.concat(response.data);
                if($scope.events.length < Number(response.total)){
                    $scope.load_more = true;
                }
                else{
                    $scope.load_more = false;   
                }
                $scope.disable_toogle = false;
                //console.log($scope.events);
                $scope.loading = false;
        });
    };

    $scope.toogleHome = function(id){
        if($scope.performer_id != id && !$scope.disable_toogle){
            $scope.disable_toogle = true;
            $scope.loading = true;
            $scope.load_more = false;
            $scope.page = 1;
            $scope.events = []
            $scope.performer_id = id;
            $scope.getEvents()    
        }   
    }

	//Search call

	$scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	//console.log(response);
                var width = $("#search_element").width() + 50;
                //console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                
                return response;
        });
    };	

    $scope.loadMore = function(){
        $scope.loading = true;
        $scope.load_more = false; 
        $scope.page += 1;
        $scope.getEvents();
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
    $scope.disable_toogle = false;
    $rootScope.noFooter = false;
    $scope.loading = true;
    $scope.all_games = true;
    $scope.page = 1;
    $scope.load_more = false;
    $scope.events = []
    $scope.testimonials = []
	$scope.getVenueInfo();
    $scope.performer_id = 0;
    $scope.compareDate =  "2015-09-05T00:00:00.000Z"
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