controllers = angular.module('gamehedge')

controllers.controller('OrderHistoryController', function($scope,$rootScope,$http,$location,Auth,apiService){
	
    $rootScope.showHeader = true;
    $rootScope.title = "Order history | Gamehedge";
    $rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team loses by a certain amount or more, get 50% of your ticket price back.";
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
		var core_acc_use = 1;
		if(!$rootScope.govx){
			core_acc_use = 2;			
		}
		//alert(core_acc_use);
		//core_acc_use=2;

        $http({
            method: 'GET',
            url: '/orders/list/?id='+$rootScope.user.te_uid+"&core_account="+core_acc_use,
        }).then(function successCallback(response) {
			var get_total_orders = 0;
			
        	$scope.orders = response.data;
        	for(i=0;i<$scope.orders.length;i++){
				get_total_orders++;
				get_total_orders++;
            	var result = $.grep($scope.local_orders, function(e){ return e.te_order_id == $scope.orders[i].id; });
            	if(result.length > 0){
            		$scope.orders[i].refund_status = result[0].refund_status;
            	}
            }
            //console.log("Orders");
			//console.log($scope.orders);

				//TEVO FIX
				//NO ORDERS FROM THIS ACCOUNT. CHECK SECOND ONE
				if (get_total_orders == 0){
					if (core_acc_use == "1") {
						core_acc_use = "2";
					}else{
						core_acc_use = "1";
					}
					$http({
						method: 'GET',
						url: '/orders/list/?id='+$rootScope.user.te_uid+"&core_account="+core_acc_use,
					}).then(function successCallback(response) {
						var get_total_orders = 0;
						
						$scope.orders = response.data;
						for(i=0;i<$scope.orders.length;i++){
							get_total_orders++;
							get_total_orders++;
							var result = $.grep($scope.local_orders, function(e){ return e.te_order_id == $scope.orders[i].id; });
							if(result.length > 0){
								$scope.orders[i].refund_status = result[0].refund_status;
							}
						}
						$scope.loading = false;
					}, function errorCallback(response) {
						console.log('no orders err');
						//console.log(response);
						// called asynchronously if an error occurs
						// or server returns response with an error status.
					});

				}

            $scope.loading = false;
        }, function errorCallback(response) {
			console.log('no orders err');
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
		});
		
		//console.log(get_total_orders);

	}

	$scope.requestRefund = function(oid,index){
		swal({
			html: true,
			title: "Request Refund?",
			text: "<strong>Sorry the game didn't work out as you may have hoped - but you are eligible for a Good Game Guarantee Refund!</strong><br><p>Simply click on REQUEST REFUND below and you will receive a refund of 50% of your ticket price within 5-10 business days.</p><br><p>The refund will be credited to the credit card that you used to make your purchase.</p><br><p>If you have any questions, please email us at support@gamehedge.com or give us a jingle Toll Free at 888-804-4330.</p><br><p>Hope your team wins next time!</p>",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#91c33f",
			confirmButtonText: "Yes, request refund!",
			closeOnConfirm: false 
		},function(){

			core_account_use = 1;
			if(!$rootScope.govx){
				core_account_use = 2;
			}
	

			$http({
	            method: 'POST',
	            url: '/orders/request_refund/',
	            data: {id: oid, core_account: core_account_use},
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
	$scope.searchTerm = "";
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