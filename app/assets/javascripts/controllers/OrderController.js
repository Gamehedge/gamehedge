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
	        if($scope.ticket.format == "Physical"){
	    		$scope.shipping_fee = "25.0";
	    	}
	    	else{
	    		$scope.shipping_fee = 0;
	    	}
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
		$scope.card.card_company = $.payment.cardType($scope.card.last_digits);
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

	$scope.selectAddress = function(type){
		if(type == "shipping"){
			$scope.shipping_address = $scope.addresses[$scope.shipping_address_index];
			$scope.changed_shipping_address = true;
			$scope.edit_deliver = 1;
		}
		else if(type == "billing"){
			$scope.billing_address = $scope.addresses[$scope.billing_address_index];
			$scope.changed_billing_address = true;
			$scope.edit_billing = 1;
		}
		if(type == "card"){
			$scope.card = $scope.cards[$scope.credit_card_index];
			$scope.changed_credit_card = true;
			$scope.edit_credit_card = 1;
		}
		$scope.editing = false;
	}

	$scope.toogleReview = function(toogle){
		$scope.secondConfirm = false;
		$scope.editing = true;
		if(toogle == "card"){
			if($rootScope.isLoggedIn == false){
				$scope.edit_credit_card = 3;
			}
			else{
				$scope.edit_credit_card = 2;
			}
		}
		else if(toogle == "billing"){
			if($rootScope.isLoggedIn == false){
				$scope.edit_billing = 3;
			}
			else{
				$scope.edit_billing = 2;
			}
		}
		else if(toogle == "deliver"){
			if($rootScope.isLoggedIn == false){
				$scope.edit_deliver = 4;
			}
			else{
				$scope.edit_deliver = 2;
			}
		}
		$scope.creditCardFieldEnable();
	}
	$scope.creditCardFieldEnable = function(){
		$timeout(function(){
			$('input#cc').payment('formatCardNumber');
			$('input#cvv').payment('formatCardCVC');
			$('input.numeric').payment('restrictNumeric');
		},100);
	}

	$scope.addField = function(type){
		if(type == "shipping"){
			$scope.edit_deliver = 3;
			$scope.shipping_address = {};
			$scope.shipping_address.country_code = "";
			$scope.shipping_address.id = "";
			$scope.shipping_address.locality = "";
			$scope.shipping_address.name = "";
			$scope.shipping_address.postal_code = "";
			$scope.shipping_address.region = "";
			$scope.shipping_address.street_address = "";
		}
		else if(type == "card"){
			$scope.edit_credit_card = 3;
			$scope.card.cvv = ""
			$scope.card.expiration_month = ""
			$scope.card.expiration_year = ""
			$scope.card.last_digits = ""
			$scope.card.card_company = ""
			$scope.creditCardFieldEnable();
		}
		else if(type == "billing"){
			$scope.edit_billing = 3;
			$scope.billing_address = {};
			$scope.billing_address.country_code = "";
			$scope.billing_address.id = "";
			$scope.billing_address.locality = "";
			$scope.billing_address.name = "";
			$scope.billing_address.postal_code = "";
			$scope.billing_address.region = "";
			$scope.billing_address.street_address = "";
		}
	}

	$scope.cancelAdd = function(type){
		if(type == "shipping"){
			$scope.edit_deliver = 1;
			if($scope.changed_shipping_address == true){
				$scope.shipping_address = $scope.addresses[$scope.shipping_address_index];
			}
			else{
				$scope.shipping_address = $scope.client.primary_shipping_address;
			}
		}
		else if(type == "card"){
			$scope.edit_credit_card = 1;
			if($scope.changed_credit_card == true){
				$scope.card = $scope.cards[$scope.credit_card_index];
			}
			else{
				$scope.card = $scope.client.primary_credit_card;
			}
		}
		else if(type == "billing"){
			$scope.edit_billing = 1;
			if($scope.changed_billing_address == true){
				$scope.billing_address = $scope.addresses[$scope.billing_address_index];
			}
			else{
				$scope.billing_address = $scope.client.primary_billing_address;
			}
		}
		$scope.editing = false;
	}

	$scope.confirmSave = function(type){
		$scope.processing = true;
		$scope.editing = false;
		if(type == "shipping"){
			$scope.addShippingProcess = true;
			if($scope.shipping_address.name != "" && $scope.shipping_address.street_address != "" && $scope.shipping_address.locality != "" && $scope.shipping_address.region != "" && $scope.shipping_address.postal_code != "" && $scope.shipping_address.country_code != ""){
				$http({
			        method: 'POST',
			        url: '/clients/add_address',
			        data: { 
			        	id: $scope.client.id,
			        	name: $scope.shipping_address.name,
			        	street_address: $scope.shipping_address.street_address,
			        	locality: $scope.shipping_address.locality,
			        	region: $scope.shipping_address.region,
			        	postal_code: $scope.shipping_address.postal_code,
			        	country_code: $scope.shipping_address.country_code,
			        },
			    }).then(function successCallback(response) {
			    	$scope.shipping_address = response.data;
			    	$scope.addresses.push($scope.shipping_address);
			    	$scope.shipping_address_index = $scope.addresses.length - 1;
			    	console.log($scope.shipping_address);
			    	$scope.edit_deliver = 1;
			    	$scope.processing = false;
			    	$scope.addShippingProcess = false;
			    }, function errorCallback(response) {
			    	console.log(response);
			    	$scope.processing = false;
			    	$scope.addShippingProcess = false;
			    });
			}
			else{
				alert("All fields are required");
				$scope.addShippingProcess = false;
				$scope.processing = false;
			}
		}
		else if(type == "card"){
			$scope.addCardProcess = true;
			if($scope.card.cvv != "" && $scope.card.expiration_month != "" && $scope.card.expiration_year != "" && $scope.card.last_digits != "" && $.payment.validateCardNumber($scope.card.last_digits) == true && $.payment.validateCardExpiry($scope.card.expiration_month,$scope.card.expiration_year) == true){
				$http({
			        method: 'POST',
			        url: '/clients/add_credit_card',
			        data: { 
			        	id: $scope.client.id,
			        	address_id: $scope.billing_address.id,
			        	number: $scope.card.last_digits,
			        	expiration_month: $scope.card.expiration_month,
			        	expiration_year: $scope.card.expiration_year,
			        	verification_code: $scope.card.cvv,
			        	name: $scope.client.name,
			        },
			    }).then(function successCallback(response) {
			    	if(response.data.error != undefined){
			    		alert(response.data.error);
			    		if($scope.changed_credit_card == true){
							$scope.card = $scope.cards[$scope.credit_card_index];
						}
						else{
							$scope.card = $scope.client.primary_credit_card;
						}
			    	}
			    	else{
				    	$scope.card = response.data;
				    	$scope.cards.push($scope.card);
				    	$scope.credit_card_index = $scope.cards.length - 1;
				    	console.log($scope.card);
				    }
				    $scope.processing = false;
				    $scope.addCardProcess = false;
				    $scope.edit_credit_card = 1;
			    }, function errorCallback(response) {
			    	console.log(response);
			    	$scope.processing = false;
			    	$scope.addCardProcess = false;
			    });
			}
			else if($.payment.validateCardExpiry($scope.card.expiration_month,$scope.card.expiration_year) == false){
				alert("Expiration date not valid!");
				$scope.processing = false;
				$scope.addCardProcess = false;
			}
			else if($.payment.validateCardNumber($scope.card.last_digits) == false){
				alert("Card number not valid!");
				$scope.processing = false;
				$scope.addCardProcess = false;
			}
			else{
				alert("All fields are required");
				$scope.processing = false;
				$scope.addCardProcess = false;
			}
		}
		else if(type == "billing"){
			$scope.addBillingProcess = true;
			if($scope.billing_address.name != "" && $scope.billing_address.street_address != "" && $scope.billing_address.locality != "" && $scope.billing_address.region != "" && $scope.billing_address.postal_code != "" && $scope.billing_address.country_code != ""){
				$http({
			        method: 'POST',
			        url: '/clients/add_address',
			        data: { 
			        	id: $scope.client.id,
			        	name: $scope.billing_address.name,
			        	street_address: $scope.billing_address.street_address,
			        	locality: $scope.billing_address.locality,
			        	region: $scope.billing_address.region,
			        	postal_code: $scope.billing_address.postal_code,
			        	country_code: $scope.billing_address.country_code,
			        },
			    }).then(function successCallback(response) {
			    	$scope.billing_address = response.data;
			    	$scope.addresses.push($scope.billing_address);
			    	$scope.billing_address_index = $scope.addresses.length - 1;
			    	console.log($scope.billing_address);
			    	$scope.edit_billing = 1;
			    	$scope.processing = false;
			    	$scope.addBillingProcess = false;
			    }, function errorCallback(response) {
			    	console.log(response);
			    	$scope.processing = false;
			    	$scope.addBillingProcess = false;
			    });
			}
			else{
				alert("All fields are required");
				$scope.processing = false;
			    $scope.addBillingProcess = false;
			}
		}
	}

	$scope.confirmPay = function(){
		$scope.processing = true;
		$scope.payProcess = true;
		if($scope.isLoggedIn == true){
			if($scope.last_digits == ""){
				alert("No credit card selected");
				$scope.processing = false;
				$scope.payProcess = false;
			}
			else{
				var service_type = "LEAST_EXPENSIVE"
				if($("#shipping option:selected").text() == "Priority Overnight"){
					service_type = "PRIORITY_OVERNIGHT";
				}
				else if($("#shipping option:selected").text() == "FedEx 2 Day"){
					service_type = "FEDEX_2_DAY";
				}
				var type = $scope.ticket.format;
				if($scope.ticket.format == "Physical"){
					type = "FedEx";
				}
				console.log("processing");
				$http({
			        method: 'POST',
			        url: '/orders/create',
			        data: { 
			        	user_id: $rootScope.user.te_uid,
			        	billing_address_id: $scope.billing_address.id,
			        	ship_address_id: $scope.shipping_address.id,
			        	credit_card_id: $scope.card.id,
			        	quantity: $scope.amount,
			        	ticket_group_id: $scope.ticket.id,
			        	price: $scope.ticket.retail_price,
			        	ticket_group_signature: $scope.ticket.signature,
			        	type: type,
			        	service_type: service_type,
			        	ship_to_name: $scope.shipping_address.name,
			        	amount: $scope.total,
			        	email_address_id: $scope.client.primary_email_address.id,
			        	pay_type: "credit_card",
			        	shipment_price: Number($scope.shipping_fee),
			        	session_id: $scope.session_id,
			        	user_agent: navigator.userAgent,
			        	selectedPhone: $scope.card.phone_number.phone_number.id,
			        	event_id: $scope.event.id,
			        	section: $scope.ticket.section,
			        	row: $scope.ticket.row,
			        	ticket_type: $scope.ticket.format,
			        	service_fee: $scope.service_fee,
			        	ticket_format: $scope.ticket.format,
			        	cost: $scope.ticket.wholesale_price,
			        },
			    }).then(function successCallback(response) {
			    	if(response.data.error == undefined){
			    		$scope.order = response.data;
			    		$scope.order_success = true;
			    		console.log("Order");
			    		console.log($scope.order);
			    	}
			    	else{
			    		alert(response.data.error);
			    		console.log("Error");
			    		console.log(response);
			    	}
			    	$scope.processing = false;
			    	$scope.payProcess = false;
			    }, function errorCallback(response) {
			    	console.log(response);
			    	$scope.processing = false;
			    	$scope.payProcess = false;
			    });
			}
		}
	}

	$scope.getClient = function(){
		Auth.currentUser().then(function(user) {
	        $http({
		        method: 'GET',
		        url: '/clients/show?id='+user.te_uid,
		    }).then(function successCallback(response) {
		    	$scope.client = response.data.client;
		    	$scope.cards = response.data.cards;
		    	$scope.addresses = response.data.client.addresses;
		    	console.log("Client");
		    	console.log($scope.client);
		    	console.log("Cards");
		    	console.log($scope.cards);
		    	console.log("Addresses");
		    	console.log($scope.addresses);
		    	$scope.edit_deliver = 1;
				$scope.edit_credit_card = 1;
				$scope.edit_billing = 1;
				$scope.secondConfirm = true;
				$scope.shipping_address = $scope.client.primary_shipping_address;
				$scope.billing_address = $scope.client.primary_billing_address;
				$scope.card = $scope.client.primary_credit_card;
				$scope.isLoggedIn = true;
				console.log($scope.shipping_address);

		    }, function errorCallback(response) {
		    	$scope.isLoggedIn = false;
		    	$scope.edit_deliver = true;
				$scope.edit_credit_card = true;
				$scope.edit_billing = true;
				$scope.secondConfirm = false;
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
    }, function errorCallback(response) {
        console.log(response);
    });
    $http({
        method: 'POST',
        url: '/clients/get_session',
        data: {},
    }).then(function successCallback(response) {
    	$scope.session_id = response.data;
    	$("#session_iframe").html('<iframe frameborder="0" height="1" scrolling="no" src="/clients/info?session=' + $scope.session_id + '" width="1"></iframe>');
    }, function errorCallback(response) {
        console.log(response);
    });
	// Initializers
	$scope.client = {}
	$scope.client.email = "";
	$scope.client.confirm_email = "";
	
	$scope.card = {};
	$scope.card.card_company = ""
	$scope.card.cvv = ""
	$scope.card.expiration_month = ""
	$scope.card.expiration_year = ""
	$scope.card.last_digits = ""
	$scope.card.name = ""
	$scope.card.phone_number = {};
	$scope.card.phone_number.phone_number = {};
	$scope.card.phone_number.phone_number.number = ""
	$scope.changed_credit_card = false;


	$scope.shipping_address = {};
	$scope.shipping_address.country_code = "";
	$scope.shipping_address.id = "";
	$scope.shipping_address.locality = "";
	$scope.shipping_address.name = "";
	$scope.shipping_address.postal_code = "";
	$scope.shipping_address.region = "";
	$scope.shipping_address.street_address = "";
	$scope.changed_shipping_address = false;


	$scope.billing_address = {};
	$scope.billing_address.country_code = "";
	$scope.billing_address.id = "";
	$scope.billing_address.locality = "";
	$scope.billing_address.name = "";
	$scope.billing_address.postal_code = "";
	$scope.billing_address.region = "";
	$scope.billing_address.street_address = "";
	$scope.changed_billing_address = false;


	$scope.processing = false;
	$scope.shipping_address_index = 0;
	$scope.billing_address_index = 0;
	$scope.credit_card_index = 0;
	$scope.getTicket();
	$scope.getPromoCodes();
	$scope.getServiceFees();
	$scope.getClient();
	$rootScope.isOrder = true;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$scope.order_success = false;
	$scope.editing = false;
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
	$window.scrollTo(0, 0);
});