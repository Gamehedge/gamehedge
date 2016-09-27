controllers = angular.module('gamehedge')

controllers.controller('ConfirmController', function($scope,$rootScope,$http,Auth,$location,$routeParams,$timeout,apiService,$filter,$window,Analytics){
	$rootScope.showHeader = true;
    
    $scope.getTicket = function(){
		$http({
            method: 'GET',
            url: '/tickets/show?id='+$routeParams.ticektId,
        }).then(function successCallback(response) {
        	$scope.ticket = response.data;
        	// console.log("Ticket")
        	// console.log($scope.ticket);
        	apiService.getData('/api/v1/events/'+$scope.ticket.event.id)
	            .then(function(response){
	            	// console.log("Event");
	            	// console.log(response);
	                $scope.event = response;
	                $scope.loading = false;
	                $rootScope.title = "Order | Gamehedge";
					$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by "+$scope.event.home_performer.sport.ggg+" or more, get 50% of your ticket price back.";
	                
	        });
        }, function errorCallback(response) {
        	$scope.loading = false;
            //console.log(response);
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
            $rootScope.first_time = false;
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}
	$scope.orderId = $rootScope.orderId;
	$rootScope.orderId = null;
	$rootScope.isOrder = true;
    $rootScope.isEvent = false;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$scope.order_success = false;
	$scope.loading = true;
	$scope.password = "";
	$scope.getTicket();
});