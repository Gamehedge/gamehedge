controllers = angular.module('gamehedge')

controllers.controller('OrderController', function($scope,$rootScope,$http,$location,$routeParams,$timeout,apiService,$filter){

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
	                $scope.calculateValues();
	        });
        }, function errorCallback(response) {
            console.log(response);
        });
	}

	$scope.getPromoCodes = function(){
		apiService.getData('/api/v1/promo_codes/')
            .then(function(response){
                console.log("Promo Codes");
            	console.log(response);
                $scope.promo_codes = response;
                $scope.calculateValues();
        });
	}

	$scope.getServiceFees= function(){
		apiService.getData('/api/v1/service_fees/')
            .then(function(response){
                $scope.service_fees = response
                angular.forEach($scope.service_fees, function (fee) {
			    	fee.minimum_amount = Number(fee.minimum_amount);
			   	});
            	$scope.service_fees = $filter('orderBy')($scope.service_fees,'minimum_amount');
            	console.log("Service Fees");
            	console.log($scope.service_fees);
                $scope.calculateValues();
        });
	}

	$scope.checkCardNumber = function(){
		console.log($scope.cc)
		$scope.card_type = $.payment.cardType($scope.cc);
	}

	$scope.calculateValues = function(){
		if($scope.ticket && $scope.amount){
			$scope.subtotal = Number($scope.ticket.retail_price) * Number($scope.amount);
		}
		if(typeof $scope.service_fees != "undefined" && $scope.service_fees.length != 0){
			for(i=0;i<$scope.service_fees.length;i++){
				if(i+1 == $scope.service_fees.length){
					$scope.service_fee = Number($scope.service_fees[i].fee_amount)*$scope.subtotal/100;
					break;
				}
				else if($scope.subtotal > $scope.service_fees[i].minimum_amount && $scope.subtotal <= $scope.service_fees[i+1].minimum_amount){
					$scope.service_fee = Number($scope.service_fees[i].fee_amount)*$scope.subtotal/100;
					break;
				}
			}
		}
		else{
			$scope.service_fee = 0;
		}
		if(typeof $scope.service_fees != "undefined"){
			if($scope.ticket.format == "Physical"){
				$scope.total = $scope.subtotal + $scope.service_fee + Number($scope.shipping_fee);
			}
			else{
				$scope.total = Number($scope.subtotal) + Number($scope.service_fee);
			}
		}
	}

	$scope.toogleReview = function(toogle){
		if(toogle == "card"){
			$scope.edit_credit_card = true;
		}
		else if(toogle == "billing"){
			$scope.edit_billing = true;
		}
		else if(toogle == "deliver"){
			$scope.edit_deliver = true;
		}
	}

	$scope.confirmPay = function(){
		$scope.edit_deliver = false;
		$scope.edit_credit_card = false;
		$scope.edit_billing = false;
	}

	$http({
        method: 'GET',
        url: '/signature?url=settings/shipping?',
    }).then(function successCallback(response) {
    	$scope.shipping_list = response.data.settings;
    	$scope.shipping_fee = "25.0";
    }, function errorCallback(response) {
        console.log(response);
    });
	// Initializers
	$scope.updateStates();
	$scope.country_shipping = "US";
	$scope.getTicket();
	$scope.getPromoCodes();
	$scope.getServiceFees();
	$rootScope.isOrder = true;
	$('input#cc').payment('formatCardNumber');
	$('input#cvv').payment('formatCardCVC');
	$('input.numeric').payment('restrictNumeric');
	$('#country2').change(function(){
		$scope.updateStates();
	});
	$scope.edit_deliver = true;
	$scope.edit_credit_card = true;
	$scope.edit_billing = true;

});