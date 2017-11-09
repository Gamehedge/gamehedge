controllers = angular.module('gamehedge')

controllers.controller('MemberController', function($scope,$rootScope,$http,$location,Auth){
	$rootScope.showHeader = true;
	
	core_account_use = 1;
	if(!$rootScope.govx){
		core_account_use = 2;
	}


    $scope.getClient = function(){
		core_account_use = 1;
		if(!$rootScope.govx){
			core_account_use = 2;
		}
		
		
		$http({
	        method: 'GET',
	        url: '/clients/show?id='+$rootScope.user.te_uid+'&core_account='+core_account_use,
	    }).then(function successCallback(response) {
	    	$scope.client = response.data.client;
	    	//console.log("Client");
	    	//console.log($scope.client);
	    	$scope.loading = false;
	    }, function errorCallback(response) {
	        //console.log(response);
		});
		

		/*
		$http({
			method: 'POST',
			url: '/clients/show',
			data: {
				id: $rootScope.user.te_uid,
				core_account: core_account_use,
			},
		}).then(function successCallback(response) {
	    	$scope.client = response.data.client;
	    	//console.log("Client");
	    	//console.log($scope.client);
	    	$scope.loading = false;
		});
		*/
	}

	$rootScope.darkHeader = true;
	$scope.searchTerm = "";
	$scope.loading = true;
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
        $rootScope.title = $rootScope.user.name + " | Gamehedge";
    	$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team loses by a certain amount or more, get 50% of your ticket price back.";
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