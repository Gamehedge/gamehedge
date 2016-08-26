controllers = angular.module('gamehedge')

controllers.controller('OrderController', function($scope,$rootScope,$http,$location,$routeParams,$timeout,apiService){

	$scope.updateStates = function(){
		$timeout(function(){
			$('#state_id').find('option').each(function(index){
				if($(this).html() != "Select region"){
					$(this).html($(this).val());
				}
			});
		},10);
	}

	$scope.getTicket = function(){
		$http({
            method: 'GET',
            url: '/tickets/show?id='+$routeParams.ticektId,
        }).then(function successCallback(response) {
        	$scope.ticket = response.data;
        	console.log("Ticket")
        	console.log($scope.ticket);
        	apiService.getData('/api/v1/events/'+$scope.ticket.event.id)
	            .then(function(response){
	            	console.log("Event");
	            	console.log(response);
	                $scope.event  = response;
	                $scope.amount = $location.search()['amount'];
	                $scope.calculateSubtotal();
	        });
        }, function errorCallback(response) {
            console.log(response);
        });
	}

	$scope.calculateSubtotal = function(){
		$scope.subtotal = Number($scope.ticket.retail_price) * Number($scope.amount);
	}

	// Initializers
	$scope.updateStates();
	$scope.getTicket();
	$http({
	  	method: 'GET',
	  	url: 'https://api.ticketevolution.com/v9/settings/service_fees',
	  	headers: {
		   'X-Token': "5bfd4b6110681d224a8c1fa6333f375f",
		   'X-Signature': "g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi",
		   'Accept': "application/json",
		},
	}).then(function successCallback(response) {
		console.log(response);
	}, function errorCallback(response) {
		console.log(response);
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
	$rootScope.isOrder = true;
	$('input#cc').payment('formatCardNumber');
	$('input#cvv').payment('formatCardCVC');
	$('input.numeric').payment('restrictNumeric');
	$('#country2').change(function(){
		$scope.updateStates();
	});
});