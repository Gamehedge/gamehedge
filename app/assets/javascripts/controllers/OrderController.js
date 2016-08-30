controllers = angular.module('gamehedge')

controllers.controller('OrderController', function($scope,$rootScope,$http,Auth,$location,$routeParams,$timeout,apiService,$filter,$window){

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
		$scope.secondConfirm = false;
		if(toogle == "card"){
			$scope.edit_credit_card = true;
		}
		else if(toogle == "billing"){
			$scope.edit_billing = true;
		}
		else if(toogle == "deliver"){
			$scope.edit_deliver = true;
			$scope.edit_billing = true;
		}
		$timeout(function(){
			$('input#cc').payment('formatCardNumber');
			$('input#cvv').payment('formatCardCVC');
			$('input.numeric').payment('restrictNumeric');
		},10);
	}

	$scope.confirmPay = function(){
		var error = "";
		if($scope.email == ""){
			console.log("Email " + $scope.email)
			error = "All fields are required"
		}
		else if($scope.confirm_email == ""){
			console.log("Confirm Email " + $scope.confirm_email)
			error = "All fields are required"
		}
		else if($scope.cc == ""){
			console.log("CC " + $scope.cc)
			error = "All fields are required"
		}
		else if($scope.cvv == ""){
			console.log("cvv " + $scope.cvv)
			error = "All fields are required"
		}
		else if($scope.exp_month == ""){
			console.log("month " + $scope.exp_month)
			error = "All fields are required"
		}
		else if($scope.exp_year == ""){
			console.log("exp_year " + $scope.exp_year)
			error = "All fields are required"
		}
		else if($scope.first_name_billing == ""){
			console.log("first_name " + $scope.first_name_billing)
			error = "All fields are required"
		}
		else if($scope.last_name_billing == ""){
			console.log("last_name " + $scope.last_name_billing)
			error = "All fields are required"
		}
		else if($scope.address_billing == ""){
			console.log("address " + $scope.address_billing)
			error = "All fields are required"
		}
		else if($scope.phone_billing == ""){
			console.log("phone_number " + $scope.phone_billing)
			error = "All fields are required"
		}
		else if($scope.zipcode_billing == ""){
			console.log("zipcode " + $scope.zipcode_billing)
			error = "All fields are required"
		}
		else if($scope.city_billing == ""){
			console.log("city " + $scope.city_billing)
			error = "All fields are required"
		}
		else if($scope.state_billing == ""){
			console.log("state " + $scope.state_billing)
			error = "All fields are required"
		}

		else if($scope.email != $scope.confirm_email){
			error = "Email and confirmation email fields must be the same."
		}
		else if($.payment.validateCardNumber($scope.cc) == false){
			error = "Invalid card number"
		}
		else if($.payment.validateCardExpiry($scope.exp_month,$scope.exp_year) == false){
			error = "Invalid expiration date"
		}
		if(error == ""){
			if($scope.secondConfirm){
				alert("paying now");
			}
			else{
				$scope.secondConfirm = true
				$scope.edit_deliver = false;
				$scope.edit_credit_card = false;
				$scope.edit_billing = false;
			}
		}
		else{
			alert(error);
		}
	}

	$scope.getClient = function(){
		Auth.currentUser().then(function(user) {
	        $http({
		        method: 'GET',
		        url: '/clients/show?id='+user.te_uid,
		    }).then(function successCallback(response) {
		    	$scope.client = response.data;
		    	console.log("Client");
		    	console.log($scope.client);
		    	
		    }, function errorCallback(response) {
		        console.log(response);
		    });
	    }, function(error) {
	        console.log(error);
	    });
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
	$scope.country_shipping = "US";
	$scope.email = "";
	$scope.confirm_email = "";
	$scope.cc = "";
	$scope.cvv = "";
	$scope.exp_month = "";
	$scope.exp_year = "";
	$scope.first_name_billing = "";
	$scope.last_name_billing = "";
	$scope.address_billing = "";
	$scope.phone_billing = "";
	$scope.zipcode_billing = "";
	$scope.city_billing = "";
	$scope.state_billing = "";
	$scope.getTicket();
	$scope.getPromoCodes();
	$scope.getServiceFees();
	$scope.getClient();
	$rootScope.isOrder = true;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$('input#cc').payment('formatCardNumber');
	$('input#cvv').payment('formatCardCVC');
	$('input.numeric').payment('restrictNumeric');
	$timeout(function(){
		$('input#cc').payment('formatCardNumber');
		$('input#cvv').payment('formatCardCVC');
		$('input.numeric').payment('restrictNumeric');
		for(i=$('.seals').find('img').length;i>1;){
			$('.seals').find('img').first().remove();
			i = $('.seals').find('img').length;
		}
		$('.seals').removeClass('hidden');
	},500);
	$scope.edit_deliver = true;
	$scope.edit_credit_card = true;
	$scope.edit_billing = true;
	$scope.secondConfirm = false;
	$window.scrollTo(0, 0);
});