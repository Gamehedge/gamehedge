controllers = angular.module('gamehedge')

controllers.controller('OrderController', function($scope,$rootScope,$http,Auth,$location,$routeParams,$timeout,apiService,$filter,$window,Analytics){
    $rootScope.showHeader = true;
    $scope.getTicket = function(){
		$http({
            method: 'GET',
            url: '/tickets/show?id='+$routeParams.ticektId,
        }).then(function successCallback(response) {
        	$scope.ticket = response.data;
        	//console.log("Ticket")
        	//console.log($scope.ticket);
        	apiService.getData('/api/v1/events/'+$scope.ticket.event.id)
	            .then(function(response){
	            	// console.log("Event");
	            	// console.log(response);
	                $scope.event = response;
	                $rootScope.title = "Order | Gamehedge";
					$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by "+$scope.event.home_performer.sport.ggg+" or more, get 50% of your ticket price back.";
	                $scope.amount = $location.search()['amount'];
	                $scope.calculateValues();
	        });
	        if($scope.ticket.format == "Physical"){
	    		$scope.shipping_fee = "25.0";
	    	}
	    	else{
	    		$scope.shipping_fee = 0;
	    	}
	    	$scope.ticketsLoaded = true;
        }, function errorCallback(response) {
            //console.log(response);
        });
	}

	$scope.checkEmail =function(){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test($scope.client.email) == true){
			$http({
	            method: 'POST',
	            url: '/clients/exists',
	            data: {
	            	email: $scope.client.email,
	            },
	        }).then(function successCallback(response) {
	        	//console.log(response.data)
	        	if(response.data == "true"){
	        		$('#myModal').modal('show');
	        	}
	        });
		}
	}

	$scope.getPromoCodes = function(){
		apiService.getData('/api/v1/promo_codes/')
            .then(function(response){
                //console.log("Promo Codes");
            	//console.log(response);
                $scope.promo_codes = response;
                var today = new Date()
                today.setHours(today.getHours()-(today.getTimezoneOffset()/60));
                today = today.toISOString();
                today = today.split('T')[0] + "T00:00:00.000Z";
                for(i=0;i<$scope.promo_codes.length;i++){
                	var date_1 = new Date($scope.promo_codes[i].start_date).toISOString();
                	var date_2 = new Date($scope.promo_codes[i].end_date).toISOString();
                	today = new Date(today);
                	date_1 = new Date(date_1);
                	date_2 = new Date(date_2);
                	if($scope.promo_codes[i].active == true && today >= date_1 && today <= date_2){
                		$scope.active_promos = true;
                		break;
                	}
                }
                $scope.getServiceFees();
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
            	//console.log("Service Fees");
            	//console.log($scope.service_fees);
            	$scope.getTicket();
        });
	}

	$scope.checkCardNumber = function(){
		$scope.card.card_company = $.payment.cardType($scope.card.last_digits);
	}

	$scope.calculateValues = function(){
		if($scope.ticket && $scope.amount){
			$scope.subtotal = (Number($scope.ticket.retail_price) * Number($scope.amount));
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
		for(i=0;i<$scope.promo_codes.length;i++){
			// console.log($scope.promo_codes[i].code);
			// console.log($scope.promo_code);
			if($scope.promo_code == $scope.promo_codes[i].code){
				if($scope.promo_codes[i].is_percentage == true){
					$scope.discount = ($scope.subtotal + $scope.service_fee)*Number($scope.promo_codes[i].value)/100;
				}
				else{
					$scope.discount = Number($scope.promo_codes[i].value);
				}
				break;
			}
			else{
				$scope.discount = 0;
			}
		}
		if(typeof $scope.service_fees != "undefined"){
			if($scope.ticket.format == "Physical"){
				$scope.total = $scope.subtotal + $scope.service_fee + Number($scope.shipping_fee) - $scope.discount;
			}
			else{
				$scope.total = Number($scope.subtotal) + Number($scope.service_fee) - $scope.discount;
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
		$scope.editing = true;
		if(toogle == "card"){
			if($rootScope.isLoggedin == false){
				$scope.edit_credit_card = 3;
			}
			else{
				$scope.edit_credit_card = 2;
			}
		}
		else if(toogle == "billing"){
			if($rootScope.isLoggedin == false){
				$scope.edit_billing = 3;
			}
			else{
				$scope.edit_billing = 2;
			}
		}
		else if(toogle == "deliver"){
			if($rootScope.isLoggedin == false){
				$scope.edit_deliver = 3;
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

	$scope.createCard = function(){
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
	    		$scope.processing = false;
	    		$scope.payProcess = false;
	    		$scope.edit_deliver = 1;
				$scope.edit_billing = 1;
				$scope.edit_credit_card = 3;
				swal("Error", response.data.error, "error");
	    	}
	    	else{
		    	$scope.card = response.data;
		    	$scope.cards.push($scope.card);
		    	$scope.credit_card_index = 0;
		    	//console.log($scope.card);
		    	$scope.confirmPay();
		    }
	    }, function errorCallback(response) {
	    	//console.log(response);
	    	scope.processing = false;
			$scope.payProcess = false;
		    $scope.edit_credit_card = 3;
		    $scope.edit_billing = 1;
		    $scope.edit_deliver = 1;
	    });
	}

	$scope.goToConfirm = function(){
		// $rootScope.orderId = $scope.order.id;
		$location.path('/confirm/'+String($scope.ticket.id));
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
			    	//console.log($scope.shipping_address);
			    	$scope.edit_deliver = 1;
			    	$scope.processing = false;
			    	$scope.addShippingProcess = false;
			    }, function errorCallback(response) {
			    	//console.log(response);
			    	$scope.processing = false;
			    	$scope.addShippingProcess = false;
			    });
			}
			else{
				$scope.addShippingProcess = false;
				$scope.processing = false;
				swal("Error", "All fields are required", "warning");
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
			    		if($scope.changed_credit_card == true){
							$scope.card = $scope.cards[$scope.credit_card_index];
						}
						else{
							$scope.card = $scope.client.primary_credit_card;
						}
						swal("Error", response.data.error, "error");
			    	}
			    	else{
				    	$scope.card = response.data;
				    	$scope.cards.push($scope.card);
				    	$scope.credit_card_index = $scope.cards.length - 1;
				    	//console.log($scope.card);
				    }
				    $scope.processing = false;
				    $scope.addCardProcess = false;
				    $scope.edit_credit_card = 1;
			    }, function errorCallback(response) {
			    	//console.log(response);
			    	$scope.processing = false;
			    	$scope.addCardProcess = false;
			    });
			}
			else if($.payment.validateCardExpiry($scope.card.expiration_month,$scope.card.expiration_year) == false){
				$scope.processing = false;
				$scope.addCardProcess = false;
				swal("Error", "Expiration date not valid!", "warning");
			}
			else if($.payment.validateCardNumber($scope.card.last_digits) == false){
				$scope.processing = false;
				$scope.addCardProcess = false;
				swal("Error", "Card number not valid!", "warning");
			}
			else{
				$scope.processing = false;
				$scope.addCardProcess = false;
				swal("Error", "All fields are required", "warning");
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
			    	//console.log($scope.billing_address);
			    	$scope.edit_billing = 1;
			    	$scope.processing = false;
			    	$scope.addBillingProcess = false;
			    }, function errorCallback(response) {
			    	//console.log(response);
			    	$scope.processing = false;
			    	$scope.addBillingProcess = false;
			    });
			}
			else{
				$scope.processing = false;
			    $scope.addBillingProcess = false;
			    swal("Error", "All fields are required", "warning");
			}
		}
	}

	$scope.confirmPay = function(){
		$scope.processing = true;
		$scope.payProcess = true;
		$scope.edit_deliver = 1;
		$scope.edit_billing = 1;
		$scope.edit_credit_card = 1;
		if($rootScope.isLoggedin == true){
			if($scope.last_digits == ""){
				$scope.processing = false;
				$scope.payProcess = false;
				swal("Error", "No credit card selected", "warning");
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
				else if($scope.ticket.format == "Eticket"){
					type = "Eticket";
				}
				else if($scope.ticket.format == "Flash_seats"){
					type = "FlashSeats";
				}
				else if($scope.ticket.format == "TM_mobile"){
					type = "TMMobile";
				}
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
			        	ship_to_name: $rootScope.user.name,
			        	amount: Number($scope.total.toFixed(2)),
			        	email_address_id: $scope.client.primary_email_address.id,
			        	pay_type: "credit_card",
			        	shipment_price: Number($scope.shipping_fee),
			        	session_id: $scope.session_id,
			        	user_agent: navigator.userAgent,
			        	selectedPhone: $scope.client.primary_phone_number.id,
			        	event_id: $scope.event.id,
			        	event_name: $scope.event.name,
			        	event_occurs_at: $scope.event.occurs_at,
			        	event_location: $scope.event.venue.name + ", " +$scope.event.location,
			        	section: $scope.ticket.section,
			        	row: $scope.ticket.row,
			        	ticket_type: $scope.ticket.format,
			        	service_fee:  Number($scope.service_fee.toFixed(2)),
			        	ticket_format: $scope.ticket.format,
			        	cost: $scope.ticket.wholesale_price,
			        	discount: Number($scope.discount.toFixed(2)),
			        	subtotal: Number($scope.subtotal.toFixed(2)),
			        	email: $scope.client.primary_email_address.address,
			        	broker_name: $scope.ticket.office.name,
			        	last_digits: $scope.card.last_digits,
			        	address: $scope.shipping_address.street_address,
			        	phone: $scope.client.primary_phone_number.number,
			        	event_home_team: $scope.event.home_performer.name,
			        	event_away_team: $scope.event.away_performer.name,
			        },
			    }).then(function successCallback(response) {
			    	$scope.processing = false;
			    	$scope.payProcess = false;
			    	if(response.data.error == undefined){
			    		$scope.order = response.data;
			    		$scope.order_success = true;
			    		// Create transaction
						Analytics.addTrans($scope.order.id, 'Gamehedge', $scope.total, $scope.shipping_fee, $scope.service_fee);
						// Add items to transaction
						Analytics.addItem($scope.order.id, $scope.ticket.id, $scope.event.name, $scope.event.sport.name, $scope.ticket.retail_price, $scope.quantity);
						// Complete transaction
						Analytics.trackTrans();
						$scope.goToConfirm();
						// Clear transaction
						// Analytics.clearTrans();
			    		//console.log("Order");
			    		//console.log($scope.order);
			    	}
			    	else{
			    		console.log("Error");
			    		console.log(response);
			    		swal("Error", response.data.error, "error");
			    	}
			    }, function errorCallback(response) {
			    	//console.log(response);
			    	$scope.processing = false;
			    	$scope.payProcess = false;
			    });
			}
		}
		else{
			if($scope.client.email == "" || $scope.client.confirm_email == "" || $scope.card.last_digits == "" || $scope.card.expiration_month == "" || $scope.card.expiration_year == "" || $scope.card.cvv == "" || $scope.billing_address.name == "" || $scope.billing_address.street_address == "" || $scope.billing_address.country_code == "" || $scope.billing_address.postal_code == "" || $scope.billing_address.region == "" || $scope.billing_address.locality == "" || $scope.client.primary_phone_number.number == ""){
				$scope.processing = false;
				$scope.payProcess = false;
				$scope.edit_deliver = 3;
				$scope.edit_billing = 3;
				$scope.edit_credit_card = 3;
				swal("Error", "All fields are requierd", "warning");
			}
			else if($.payment.validateCardExpiry($scope.card.expiration_month,$scope.card.expiration_year) == false){
				$scope.processing = false;
				$scope.payProcess = false;
				$scope.edit_deliver = 3;
				$scope.edit_billing = 3;
				$scope.edit_credit_card = 3;
				swal("Error", "Expiration date not valid!", "warning");
			}
			else if($.payment.validateCardNumber($scope.card.last_digits) == false){
				$scope.processing = false;
				$scope.payProcess = false;
				$scope.edit_deliver = 3;
				$scope.edit_billing = 3;
				$scope.edit_credit_card = 3;
				swal("Error", "Card number not valid.", "warning");
			}
			else if($scope.client.email != $scope.client.confirm_email){
				$scope.processing = false;
				$scope.payProcess = false;
				$scope.edit_deliver = 3;
				$scope.edit_billing = 3;
				$scope.edit_credit_card = 3;
				swal("Error", "Email and confirm email fields shpuld be equal", "warning");
			}
			else{
				$http({
			        method: 'POST',
			        url: '/clients/create',
			        data: { 
			        	name: $scope.billing_address.name,
			        	email: $scope.client.email,
			        	region: $scope.billing_address.region,
			        	country_code: $scope.billing_address.country_code,
			        	postal_code: $scope.billing_address.postal_code,
			        	street_address: $scope.billing_address.street_address,
			        	locality: $scope.billing_address.locality,
			        	phone_number: $scope.client.primary_phone_number.number,
			        },
			    }).then(function successCallback(response) {
			    	if(response.data.error == undefined){
			    		console.log("Client created");
			    		console.log("Client");
			    		console.log(response.data.client);
			    		console.log("User");
                        console.log(response.data.temp_password);
			    		console.log(response.data.user);
			    		$scope.client = response.data.client;
			    		$scope.temp_password = response.data.temp_password;
			    		$rootScope.isLoggedin = true;
			    		$rootScope.isLoggedin = true;
                        console.log("pre login...");
			    		$rootScope.user = response.data.user;
			    		$scope.addresses = $scope.client.addresses;
			    		$scope.billing_address = $scope.client.primary_billing_address;
			    		$scope.shipping_address = $scope.client.primary_shipping_address;
                        console.log("GO TO LOGIN");
			    		$scope.loginFcn();
			    	}
			    	else{
			    		//console.log("Error");
			    		//console.log(response);
			    		$scope.processing = false;
						$scope.payProcess = false;
						$scope.edit_deliver = 3;
						$scope.edit_billing = 3;
						$scope.edit_credit_card = 3;
						swal("Error", response.data.error, "error");
			    	}
			    }, function errorCallback(response) {
			    	//console.log(response);
			    	$scope.processing = false;
					$scope.payProcess = false;
					$scope.edit_deliver = 3;
					$scope.edit_billing = 3;
					$scope.edit_credit_card = 3;
			    });
			}
			
		}
	}

	$scope.updatePassword = function(){
        
		if($scope.password == $scope.confirm_password && $scope.password != ""){
			$http({
		        method: 'POST',
		        url: '/clients/update_password',
		        data: {password: $scope.password,
		        	confirm_password: $scope.confirm_password,
		        	email: $scope.client.primary_email_address.address,
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

	$scope.loginFcn = function(){
        console.log("login ENTER");
        console.log(credentials);
		var credentials = {
            email: $scope.client.email,
            password: $scope.temp_password,
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
            if($scope.order_success == false){
                $scope.createCard();
            }
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}

	$scope.login2 = function(){
		var credentials = {
            email: $scope.client.primary_email_address.address,
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

	$scope.checkLogin = function(){
		Auth.currentUser().then(function(user) {
	        // User was logged in, or Devise returned
	        // previously authenticated session.
	        //console.log(user); // => {id: 1, ect: '...'}
	        $rootScope.user = user;
	        $rootScope.isLoggedin = true;
	    }, function(error) {
	        // unauthenticated error
	        //console.log("error login");
	        $rootScope.user = undefined;
	        $rootScope.isLoggedin = false;
	    });
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
		    	//console.log("Client");
		    	//console.log($scope.client);
		    	//console.log("Cards");
		    	//console.log($scope.cards);
		    	//console.log("Addresses");
		    	//console.log($scope.addresses);
		    	$scope.edit_deliver = 1;
				$scope.edit_credit_card = 1;
				$scope.edit_billing = 1;
				$scope.shipping_address = $scope.client.primary_shipping_address;
				$scope.billing_address = $scope.client.primary_billing_address;
				$scope.card = $scope.client.primary_credit_card;
				$rootScope.isLoggedin = true;
				$rootScope.user = user;
				$rootScope.first_time = false;
				$('#myModal').modal('hide');
				$scope.logging_in = false;
				$scope.clientLoaded = true;
				//console.log($scope.shipping_address);

		    }, function errorCallback(response) {
		    	$rootScope.user = undefined;
		    	$rootScope.isLoggedin = false;
		    	$scope.edit_deliver = 3;
				$scope.edit_credit_card = 3;
				$scope.edit_billing = 3;
				$rootScope.first_time = true;
				$scope.creditCardFieldEnable();
				$('#myModal').modal('hide');
				$scope.logging_in = false;
				$scope.clientLoaded = true;
				//console.log("Not logged in");
		        //console.log(response);
		    });
	    }, function(error) {
	    	$rootScope.user = undefined;
	        $rootScope.isLoggedin = false;
	    	$scope.edit_deliver = 3;
			$scope.edit_credit_card = 3;
			$scope.edit_billing = 3;
			$rootScope.first_time = true;
			$scope.clientLoaded = true;
			$scope.creditCardFieldEnable();
			//console.log("Not logged in");
	        //console.log(error);
	    });
	}

	$http({
        method: 'GET',
        url: '/signature?url=settings/shipping?',
    }).then(function successCallback(response) {
    	$scope.shipping_list = response.data.settings;
    }, function errorCallback(response) {
        //console.log(response);
    });
    $http({
        method: 'POST',
        url: '/clients/get_session',
        data: {},
    }).then(function successCallback(response) {
    	$scope.session_id = response.data;
    	$("#session_iframe").html('<iframe frameborder="0" height="1" scrolling="no" src="/clients/info?session=' + $scope.session_id + '" width="1"></iframe>');
    }, function errorCallback(response) {
        //console.log(response);
    });
	// Initializers
	$scope.client = {}
	$scope.client.email = "";
	$scope.client.confirm_email = "";
	
	$scope.cards = [];
	$scope.card = {};
	$scope.card.card_company = ""
	$scope.card.cvv = ""
	$scope.card.expiration_month = ""
	$scope.card.expiration_year = ""
	$scope.card.last_digits = ""
	$scope.card.name = ""
	$scope.client.primary_phone_number = {};
	$scope.client.primary_phone_number.number = ""
	$scope.client.primary_phone_number.id = ""
	$scope.changed_credit_card = false;

	$scope.addresses = [];
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
	$scope.discount = 0;
	$scope.active_promos = false;

	$scope.processing = false;
	$scope.shipping_address_index = 0;
	$scope.billing_address_index = 0;
	$scope.credit_card_index = 0;
	$scope.getPromoCodes();
	$scope.getClient();
	$rootScope.isOrder = true;
    $rootScope.isEvent = false;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$scope.order_success = false;
	$scope.editing = false;
	$scope.password = "";

	// $scope.script = '<script ng-src="https://cdn.ywxi.net/js/inline.js?w=96"></script>';
	$scope.script = $("#mcafee-seal").html()
	
	$scope.searchTerm = "";
	$window.scrollTo(0, 0);





	//Login Scripts
	$scope.clearPassword = function(){
		$scope.password = "";
	}

	$scope.login = function(){
        $scope.logging_in = true;
		var credentials = {
            email: $scope.client.email,
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
            $scope.logging_in = false;
            swal("Error", "Email or password incorrect. Please check amd try again.", "error");
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            //console.log(currentUser);
            $rootScope.user = currentUser;
            $rootScope.isLoggedin = true;
            $scope.getClient();
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}

    $scope.forgotPass = function(value){
        $scope.forgot_password = value;
    }

    $scope.updatePasswordAuth = function(){
        $scope.sending_password = true;
        var parameters = {
            email: $scope.client.email
        };
        
        Auth.sendResetPasswordInstructions(parameters).then(function() {
            $scope.sending_password = false;
            swal("Request submitted", "You will be receiving an email with the recovery password instructions shortly.", "success");
            
        },function(error){
            if(error.data.errors){
                $scope.sending_password = false;
                swal("Request failed", "E-mail not found. Please check your e-mail address.", "error");
            }
        });
    }

    $scope.showPromoField = function(){
    	$scope.show_promo_field = !$scope.show_promo_field;
    }

    $scope.logging_in = false;
    $scope.clientLoaded = false;
    $scope.ticketsLoaded = false;
    $scope.sending_password = false;
    $scope.forgot_password = false;
    $scope.show_promo_field = false;
	
})
.filter('replaceText', function () {
    return function (text) {
        if (!text) {
            return text;
        }

        return text.replace(/\_/g, ' '); // Replaces all occurences
    };
});