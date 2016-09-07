controllers = angular.module('gamehedge')

controllers.controller('MemberController', function($scope,$rootScope,$http,$location,Auth,apiService){
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
	$scope.loading = true;
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
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