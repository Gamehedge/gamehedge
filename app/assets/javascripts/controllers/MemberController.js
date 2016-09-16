controllers = angular.module('gamehedge')

controllers.controller('MemberController', function($scope,$rootScope,$http,$location,Auth){
    $rootScope.showHeader = true;
    $scope.getClient = function(){
		$http({
	        method: 'GET',
	        url: '/clients/show?id='+$rootScope.user.te_uid,
	    }).then(function successCallback(response) {
	    	$scope.client = response.data.client;
	    	//console.log("Client");
	    	//console.log($scope.client);
	    	$scope.loading = false;
	    }, function errorCallback(response) {
	        //console.log(response);
	    });
	}

	$rootScope.darkHeader = true;
	$scope.searchTerm = "";
	$scope.loading = true;
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
        $rootScope.title = $rootScope.user.name;
    	$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by a certain amount or more, get 50% of your ticket price back.";
        $rootScope.isLoggedin = true;
        $scope.getClient();
    }, function(error) {
        // unauthenticated error
        //console.log("error login");
        $rootScope.user = undefined;
        $rootScope.isLoggedin = false;
        $location.path('/');
    });
});