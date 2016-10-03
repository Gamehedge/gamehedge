app = angular.module('gamehedge')

app.controller('LeagueController', function($scope,$rootScope,$routeParams,dataService,apiService,$window,$http,$location, $timeout,Auth){
	$rootScope.showHeader = true;
    $scope.getLeagueInfo = function(){
		apiService.getData('/api/v1/sports/'+$routeParams.leagueId)
            .then(function(response){
                //console.log("League");
            	//console.log(response);
                $scope.league  = response;
                if($scope.league.name == "NHL"){
                    $rootScope.title = "NHL Hockey Tickets | Gamehedge";
                    $rootScope.description = "Meta Description - Buy and Save up to 60% on all NHL Hockey game tickets. If the home team loses by 4 goals or more, get 50% of your ticket price back.";
                    $scope.h1Text = "NHL Hockey Tickets"
                    $scope.h2Text = "NHL Hockey Ticket Prices | Teams | Schedule | Interactive Seating Charts"
                    $scope.bold = "Verified tickets delivered on time | 100% Buyer Guarantee | Secure Checkout"
                    $scope.italic = "At GameHedge every ticket comes with the Good Game Guarantee at no additional cost. Buy NHL Hockey tickets on GameHedge and if the home team loses by 4 goals or more, GameHedge will refund 50% of the ticket price."
                }
                else if($scope.league.name == "NBA"){
                    $rootScope.title = "NBA Basketball Tickets | Gamehedge";
                    $rootScope.description = "Meta Description - Buy and Save up to 60% on all NBA Basketball game tickets. If the home team loses by 15 points or more, get 50% of your ticket price back.";
                    $scope.h1Text = "NBA Basketball Tickets"
                    $scope.h2Text = "NBA Basketball Game Tickets | NBA Schedule | Interactive Seating Chart"
                    $scope.bold = "Verified tickets delivered on time | 100% Buyer Guarantee | Secure Checkout"
                    $scope.italic = "At GameHedge every ticket comes with the Good Game Guarantee at no additional cost. Buy NBA Basketball tickets on GameHedge and if the home team loses by 15 points or more, GameHedge will refund 50% of the ticket price."
                }
                else if($scope.league.name == "NCAAFB"){
                    $rootScope.title = "NCAAFB Football Tickets | Gamehedge";
                    $rootScope.description = "Meta Description - Buy and Save up to 60% on all NCAAFB Football game tickets. If the home team loses by 17 points or more, get 50% of your ticket price back.";
                    $scope.h1Text = "NCAAFB Football Tickets"
                    $scope.h2Text = "NCAAFB Football Game Tickets | Schedule | Interactive Seating Chart"
                    $scope.bold = "Verified tickets delivered on time | 100% Buyer Guarantee | Secure Checkout"
                    $scope.italic = "At GameHedge every ticket comes with the Good Game Guarantee at no additional cost. Buy NCAAFB Football tickets on GameHedge and if the home team loses by 17 points or more, GameHedge will refund 50% of the ticket price."
                }
                else if($scope.league.name == "NFL"){
                    $rootScope.title = "NFL Football Tickets | Gamehedge";
                    $rootScope.description = "Meta Description - Buy and Save up to 60% on all NFL Football game tickets. If the home team loses by 17 points or more, get 50% of your ticket price back.";
                    $scope.h1Text = "NFL Football Tickets"
                    $scope.h2Text = "By Division | NFC | NFC East | NFC North | NFC South| NFC West | AFC | AFC East | AFC North | AFC South | AFC West Los Angeles Rams, San Francisco 49ers, Chicago Bears, New York Giants, New York Jets, Detroit Lions, Dallas Cowboys, Pittsburgh Steelers, Cleveland Browns, Atlanta Falcons, Houston Texans, New England Patriots, Minnesota Vikings, Denver Broncos, Seattle Seahawks, Washington Redskins, Miami Dolphins, Philadelphia Eagles, Cincinnati Bengals, Oakland Raiders, Kansas City Chiefs, San Diego Chargers, Arizona Cardinals, Baltimore Ravens, Green Bay Packers, New Orleans Saints, Tennessee Titans, Jacksonville Jaguars, Carolina Panthers, Buffalo Bills, Tampa Bay Buccaneers, Indianapolis Colts"
                    $scope.bold = "Verified tickets delivered on time | 100% Buyer Guarantee | Secure Checkout"
                    $scope.italic = "At GameHedge every ticket comes with the Good Game Guarantee at no additional cost. Buy NFL Football tickets on GameHedge and if the home team loses by 17 points or more, GameHedge will refund 50% of the ticket price."
                }
                else if($scope.league.name == "MLB"){
                    $rootScope.title = "MLB Baseball Tickets | Gamehedge";
                    $rootScope.description = "Meta Description - Buy and Save up to 60% on all MLB Baseball game tickets. If the home team loses by 5 runs or more, get 50% of your ticket price back.";
                    $scope.h1Text = "MLB Baseball Tickets"
                    $scope.h2Text = "By Division | National League | National League East | National League Central | National League West | American League East | American League Central | American League West Los Angeles Dodgers, San Francisco Giants, Chicago Cubs, New York Mets, Los Angeles Angels, Detroit Tigers, Texas Rangers, New York Yankees, Pittsburgh Pirates, Cleveland Indians, Atlanta Braves, Houston Astros, Boston Red Sox, Minnesota Twins, Colorado Rockies, Seattle Mariners, Washington Nationals, Miami Marlins, Philadelphia Phillies, Cincinnati Reds, Tampa Bay Rays, Oakland Athletics, Chicago White Sox, St. Louis Cardinals, Kansas City Royals, San Diego Padres, Arizona Diamondbacks, Baltimore Orioles, Cleveland Indians, Toronto Blue Jays, Milwaukee Brewers"
                    $scope.bold = "Verified tickets delivered on time | 100% Buyer Guarantee | Secure Checkout"
                    $scope.italic = "At GameHedge every ticket comes with the Good Game Guarantee at no additional cost. Buy MLB Baseball tickets on GameHedge and if the home team loses by 5 runs or more, GameHedge will refund 50% of the ticket price."
                }
                
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
        now.setHours(now.getHours() + 1);
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
                    // if($scope.next_events[j].performances.length != 2){
                    //     $scope.next_events.splice(j,1);
                    // }
                    if($scope.next_events[j] != undefined){
                        if(moment().add(1,'h').isAfter(String($scope.next_events[j].occurs_at).replace('Z',''))) {
                            $scope.next_events.splice(j, 1);
                        }
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
    $rootScope.isEvent = false;
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