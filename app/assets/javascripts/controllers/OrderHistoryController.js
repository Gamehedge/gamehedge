controllers = angular.module('gamehedge')

controllers.controller('OrderHistoryController', function($scope,$rootScope,$http,$location,Auth,apiService){
    $rootScope.showHeader = true;
	$scope.getLocalOrders = function(){
		apiService.getData('/api/v1/orders/?client_id='+$rootScope.user.te_uid)
            .then(function(response){
                $scope.local_orders  = response;
                //console.log("Local Orders");
            	//console.log($scope.local_orders);
                $scope.getOrders();
        });
	}

	$scope.getOrders = function(){
		//console.log($rootScope.user.te_uid);
        $http({
            method: 'GET',
            url: '/orders/list/?id='+$rootScope.user.te_uid,
        }).then(function successCallback(response) {
        	$scope.orders = response.data;
        	for(i=0;i<$scope.orders.length;i++){
            	var result = $.grep($scope.local_orders, function(e){ return e.te_order_id == $scope.orders[i].id; });
            	if(result.length > 0){
            		$scope.orders[i].refund_status = result[0].refund_status;
            	}
            }
            //console.log("Orders");
            //console.log($scope.orders);
            $scope.loading = false;
        }, function errorCallback(response) {
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
	}

	$scope.requestRefund = function(oid,index){
		swal({
			html: true,
			title: "Request Refund?",
			text: "<strong>Sorry the game didn't work out as you may have hoped - but you are eligible for a Good Game Guarantee Refund!</strong><br><p>Simply click on REQUEST REFUND below and you will receive a refund of 50% of your ticket price within 5-10 business days.</p><br><p>The refund will be credited to the credit card that you used to make your purchase.</p><br><p>If you have any questions, please email us at support@gamehedge.com or give us a jingle at 908-312-FANS (3267).</p><br><p>Hope your team wins next time!</p>",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#91c33f",
			confirmButtonText: "Yes, request refund!",
			closeOnConfirm: false 
		},function(){
			$http({
	            method: 'POST',
	            url: '/orders/request_refund/',
	            data: {id: oid},
	        }).then(function successCallback(response) {
	        	//console.log(response);
	        	if(response.data == "success"){
	        		$scope.orders[index].refund_status.name = "Refund Requested";
	        		$scope.orders[index].refund_status.id = 3;
	        		swal({
						title: "Refund Requested",
						text: "Your refund has been requested successfully",
						type: "success",
						confirmButtonColor: "#91c33f",
					});
	        	}
	        	else{
	        		swal({
						title: "Refund not Requested",
						text: "There was an error processing your request.",
						type: "error",
						confirmButtonColor: "#DD6B55",
					});
	        	}
	        }, function errorCallback(response) {
	            //console.log(response);
	            swal({
					title: "Refund not Requested",
					text: "There was an error processing your request.",
					type: "error",
					confirmButtonColor: "#DD6B55",
				});
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	        });
		});
	}

	$rootScope.darkHeader = true;
	$scope.loading = true;
	$rootScope.searchTerm = "";
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
        $rootScope.isLoggedin = true;
        $scope.getLocalOrders();
    }, function(error) {
        // unauthenticated error
        //console.log("error login");
        $rootScope.user = undefined;
        $rootScope.isLoggedin = false;
        $location.path('/');
    });
});