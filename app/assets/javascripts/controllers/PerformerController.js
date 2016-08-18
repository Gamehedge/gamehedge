app = angular.module('gamehedge')

app.controller('PerformerController', function($scope,$rootScope,$routeParams,dataService, apiService,$window){
	$scope.getPerformerInfo = function(){
		apiService.getData('/api/v1/performers/'+$routeParams.performerId)
            .then(function(response){
                console.log("Performer");
            	console.log(response);
                $scope.performer  = response;
                $scope.getTestimonials();
                $scope.getEvents();
        });
	};

    $scope.getTestimonials = function(){
        apiService.getData('/api/v1/testimonials/?performer_id='+String($scope.performer.id))
            .then(function(response){
                console.log("Testimonials");
                $scope.testimonials = response;
                console.log($scope.testimonials);
        });
    }

    $scope.getEvents = function(){
        var now = new Date();
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        var url = "";
        if($scope.all_games == true){
            url = '/api/v1/events/?selected_team='+$scope.performer.id+'&today_date='+today_date+'&page='+$scope.page+'&per_page=10';
        }
        else{
            url = '/api/v1/events/?selected_team='+$scope.performer.id+'&today_date='+today_date+'&page='+$scope.page+'&per_page=10&home_performer_id='+String($scope.performer.id);
        }
        apiService.getData(url)
            .then(function(response){
                console.log("Events");
                $scope.events = $scope.events.concat(response.data);
                if($scope.events.length < Number(response.total)){
                    $scope.load_more = true;
                }
                else{
                    $scope.load_more = false;   
                }
                $scope.disable_toogle = false;
                console.log($scope.events);
                $scope.loading = false;
        });
    };

    $scope.toogleHome = function(home){
        if($scope.all_games != home && !$scope.disable_toogle){
            $scope.disable_toogle = true;
            $scope.loading = true;
            $scope.load_more = false;
            $scope.page = 1;
            $scope.events = []
            $scope.all_games = home;
            $scope.getEvents()    
        }   
    }

	//Search call

	$scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	console.log(response);
                return response;
        });
    };	

    $scope.loadMore = function(){
        $scope.loading = true;
        $scope.load_more = false; 
        $scope.page += 1;
        $scope.getEvents();
    }
	  

	//Initializers
    $scope.disable_toogle = false;
    $scope.loading = true;
    $scope.all_games = true;
    $scope.page = 1;
    $scope.load_more = false;
    $scope.events = []
    $scope.testimonials = []
	$scope.getPerformerInfo();
    $scope.compareDate =  "2015-09-05T00:00:00.000Z"
    $window.scrollTo(0, 0);
});