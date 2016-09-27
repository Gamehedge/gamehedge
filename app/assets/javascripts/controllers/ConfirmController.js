controllers = angular.module('gamehedge')

controllers.controller('ConfirmController', function($scope,$rootScope,$http,Auth,$location,$routeParams,$timeout,apiService,$filter,$window,Analytics){
	$rootScope.showHeader = true;
    
    $scope.getTicket = function(){
    	apiService.getData('/api/v1/orders/'+$routeParams.orderId)
            .then(function(response){
            	console.log("Order");
            	console.log(response);
                $scope.order = response;
                $scope.loading = false;
                $rootScope.title = "Order | Gamehedge";
				$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by a certain amount or more, get 50% of your ticket price back.";
                
        });
	}

	$scope.updatePassword = function(){
        
		if($scope.password == $scope.confirm_password && $scope.password != ""){
			$http({
		        method: 'POST',
		        url: '/clients/update_password',
		        data: {password: $scope.password,
		        	confirm_password: $scope.confirm_password,
		        	email: $rootScope.user.email,
		        },
		    }).then(function successCallback(response) {
		    	swal("Success", "Your password has been updated", "success");
		    	$scope.login2();
		    }, function errorCallback(response) {
		    	//console.log(response);
		    });
		}
		else if($scope.password == ""){
			swal("Error", "Password cannot be empty", "warning");
		}
		else{
			swal("Error", "Both password fields must be the same", "warning");
		}
	}

	$scope.login2 = function(){
		var credentials = {
            email: $rootScope.user.email,
            password: $scope.password,
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        //console.log(credentials);
        Auth.login(credentials, config).then(function(user) {
            //console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            // Authentication failed...
            //console.log("failed");
            $rootScope.user = undefined;
            $rootScope.isLoggedin = false;
            //console.log("Email or password incorrect");
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            //console.log(currentUser);
            $rootScope.user = currentUser;
            $rootScope.isLoggedin = true;
            $scope.first_time = false;
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}

	$scope.checkLogin = function(){
		Auth.currentUser().then(function(user) {
	        // User was logged in, or Devise returned
	        // previously authenticated session.
	        //console.log(user); // => {id: 1, ect: '...'}
	        $rootScope.user = user;
	        $rootScope.isLoggedin = true;
	        $scope.getTicket();
	    }, function(error) {
	        // unauthenticated error
	        //console.log("error login");
	        $rootScope.user = undefined;
	        $rootScope.isLoggedin = false;
	    });
	}
	$scope.orderId = $rootScope.orderId;
	$rootScope.isOrder = true;
    $rootScope.isEvent = false;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$scope.order_success = false;
	$scope.first_time = ($location.search()['first_time'] === 'true');
	$scope.loading = true;
	$scope.password = "";
	$scope.checkLogin();
});