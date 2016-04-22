/*! growl-notifications 15-09-2014 */
!function(){angular.module("growlNotifications.config",[]).value("growlNotifications.config",{debug:!0}),angular.module("growlNotifications.directives",[]),angular.module("growlNotifications.filters",[]),angular.module("growlNotifications.services",[]),angular.module("growlNotifications",["growlNotifications.config","growlNotifications.directives","growlNotifications.filters","growlNotifications.services"])}(),function(){function a(a,c,d){var e={ttl:a.options.ttl||5e3};return{restrict:"AE",scope:!0,controller:b,controllerAs:"$growlNotification",link:function(b,f,g,h){var i=angular.extend({},e,b.$eval(g.growlNotificationOptions));g.ttl&&(i.ttl=b.$eval(g.ttl)),c.move(f,a.element),h.timer=d(function(){c.leave(f)},i.ttl)}}}function b(a,b){this.timer=null,this.remove=function(){b.leave(a),this.timer&&this.timer.cancel&&this.timer.cancel()}}a.$inject=["growlNotifications","$animate","$timeout"],b.$inject=["$element","$animate"],angular.module("growlNotifications.directives").directive("growlNotification",a)}(),function(){function a(a){return{restrict:"AE",link:function(b,c){a.element=c}}}a.$inject=["growlNotifications"],angular.module("growlNotifications.directives").directive("growlNotifications",a)}(),function(){function a(){var a={ttl:5e3};this.setOptions=function(b){return angular.extend(a,b),this},this.ttl=function(b){return angular.isDefined(b)?(a.ttl=b,this):a.ttl},this.$get=function(){function b(){this.options=a,this.element=null}return new b}}angular.module("growlNotifications.services").provider("growlNotifications",a)}();

var app = angular.module('gamehedge', ['ngSanitize', 'growlNotifications'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('-!');
	$interpolateProvider.endSymbol('!-');
});
app.config(['$httpProvider', '$locationProvider', function($httpProvider) {
	// initialize get if not there
	if(!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}
	// disable IE ajax request caching
	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	$httpProvider.defaults.transformRequest = function(data) {
		if(data === undefined) {
			return data;
		}
		return $.param(data);
	}
}]);
app.filter('range', function(){
	return function(input, min, max){
		min = parseInt(min);
		max = parseInt(max);
		for(var i = min; i < max; i++)
			input.push(i);
		return input;
	};
});
app.controller('SearchCtrl', function($scope, $http){
	$scope.type       = 'full';
	$scope.query      = '';
	$scope.city       = '';
	$scope.state      = '';
	$scope.category   = 8; // CatId - 2
	$scope.events     = {};
	$scope.page       = 1;
	$scope.per_page   = 25;
	$scope.num_events = 0;
	$scope.status     = 0;
	$scope.error      = '';
	$scope.searching  = false;
	$scope.searched   = false;
	$scope.last_query = '';
	$scope.search     = function(){
		$scope.last_query = $scope.query;
		$scope.searching  = true;
		if($scope.formSearch.$valid){
			if($scope.type == 'full') {
				var api_url = '/v1/search?api_key=' + api_key + '&t=f&q=' + $scope.query;
			} else if($scope.type == 'team') {
				var api_url = '/v1/search?api_key=' + api_key + '&t=t&q=' + $scope.query;
			} else {
				var api_url = '/v1/search?api_key=' + api_key + '&t=a&city=' + $scope.city + '&state=' + $scope.state + '&category=' + $scope.category;
			}
			var promise = $http.get(api_url).success(function(data, status, headers, config) {
				$scope.searching = false;
				if(data.status == 1) {
					$scope.events     = JSON.parse(data.events);
					$scope.page       = data.current_page;
					$scope.per_page   = data.per_page;
					$scope.num_events = data.num_events;
					$scope.status     = 1;
					$scope.searched   = true;
					for(var name in $scope.events) {
						if(!$scope.events.hasOwnProperty(name)) {
							continue;
						}
						if(typeof $scope.events[name] == 'object') {
							for(var label in $scope.events[name]) {
								if(!$scope.events[name].hasOwnProperty(label)) {
									continue;
								}
							}
						}
					}
				} else {
					$scope.status   = 0;
					$scope.error    = data.message;
					$scope.searched = true;
				}
			}).error(function(data, status, headers, config) {
				alert('error');
			});
		} else {
			// Invalid Form
		}
	};
	$scope.view_tickets = function(id){
		window.location.href = '/ticket/' + id;
	};
	if(typeof search_type != 'undefined') {
		$scope.type = search_type;
	}
	if(typeof search_query != 'undefined') {
		$scope.query = search_query;
	}
	$(document).ready(function(){
		if($scope.query != '')
			$scope.search();
	});
});
app.controller('TicketCtrl', function($scope, $http, $compile){
	$scope.qty         = 2;
	$scope.event_id    = event_id;
	$scope.tickets     = tickets;
	$scope.num_tickets = num_tickets;
	$scope.loading     = false;
	$scope.buy         = function(tgroup, price) {
		var data    = {event_id: $scope.event_id, tgroup_id: tgroup, price: price};
		var promise = $http.post('/order/add', data).success(function(data, status, headers, config) {
			if(data.status == 1)
				window.location.href = '/order';
			else
				alert('There was an error adding your tickets to the cart. (' + data.message + ')');
		}).error(function(data, status, headers, config) {
			alert('There was a problem adding your tickets to the cart.');
		});
	};
});

app.controller('CheckoutCtrl', function($scope, $http){
	$scope.existing      = existing;
	$scope.client        = typeof client != 'undefined' ? client : 1;
	$scope.order_data    = order_data;
	$scope.shipping_data = shipping_data;
	$scope.accept_terms  = 0;
    
    if(typeof credit_cards != 'undefined'){
        if(Object.keys(credit_cards).length > 0){
            $scope.has_card = true;
        }
        else {
            $scope.has_card = false;
        }
        
    }
    else {
        $scope.has_card = false;
    }
    
	if($scope.existing) {
		$scope.client_data = customer_data;
		$scope.addresses   = addresses;
		if($scope.has_card) {
			$scope.data         = {optin: 1, shipping_address_id: $scope.client_data.primary_shipping_address.id, billing_address_id: $scope.client_data.primary_billing_address.id, card_id: $scope.client_data.primary_credit_card.id, phone_id: $scope.client_data.primary_phone_number.id, email_id: $scope.client_data.primary_email_address.id, shipping_option: $scope.shipping_data[shipping_id].id, ticket_format: ticket_format, fee: $scope.order_data.service_fee, qty: parseInt($scope.order_data.qty)};
            $scope.credit_cards = credit_cards;
			$scope.credit_card  = $scope.credit_cards[$scope.data.card_id];
		} else {
			$scope.data         = {optin: 1, shipping_address_id: $scope.client_data.primary_shipping_address.id, billing_address_id: $scope.client_data.primary_billing_address.id, phone_id: $scope.client_data.primary_phone_number.id, email_id: $scope.client_data.primary_email_address.id, shipping_option: $scope.shipping_data[shipping_id].id, ticket_format: ticket_format, fee: $scope.order_data.service_fee, qty: parseInt($scope.order_data.qty)};
		}
		$scope.shipping_address = $scope.addresses[$scope.data.shipping_address_id];
		$scope.billing_address  = $scope.addresses[$scope.data.billing_address_id];
		$scope.toggle_edit      = {shipping: 0, billing: 0, credit: 0};
		$scope.toggle_add       = {shipping: 0, billing: 0, credit: 0};
		$scope.toggleEdit = function(section) {
			if($scope.toggle_edit[section])
				$scope.toggle_edit[section] = 0;
			else
				$scope.toggle_edit[section] = 1;
		};
		$scope.toggleAdd = function(section) {
			if($scope.toggle_add[section])
				$scope.toggle_add[section] = 0;
			else
				$scope.toggle_add[section] = 1;
		};
		$scope.setShippingAddress = function() {
			$scope.shipping_address = $scope.addresses[$scope.data.shipping_address_id];
			$scope.toggleEdit('shipping');
		};
		$scope.setBillingAddress = function() {
			$scope.billing_address = $scope.addresses[$scope.data.billing_address_id];
			$scope.toggleEdit('billing');
		};
		$scope.setCreditCard = function() {
			$scope.credit_card = $scope.credit_cards[$scope.data.card_id];
			$scope.toggleEdit('credit');
		};
		$scope.addShippingAddress = function() {
			var payload       = $scope.sdata;
			payload.api_key   = api_key;
			payload.client_id = customer_data.id;
			var promise       = $http.post('/v1/client/shipping', payload).success(function(data, status, headers, config) {
				if(data.status == 1) {
					$scope.addresses[data.payload.id] = data.payload;
					$scope.shipping_address           = data.payload;
					$scope.data.shipping_address_id   = data.payload.id;
					$scope.toggleEdit('shipping');
					$scope.toggleAdd('shipping');
				} else {
					alert('Failed to add new Shipping Address.');
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		};
		$scope.addBillingAddress = function() {
			var payload       = $scope.bdata;
			payload.api_key   = api_key;
			payload.client_id = customer_data.id;
			var promise       = $http.post('/v1/client/billing', payload).success(function(data, status, headers, config) {
				if(data.status == 1) {
					$scope.addresses[data.payload.id] = data.payload;
					$scope.billing_address            = data.payload;
					$scope.data.billing_address_id    = data.payload.id;
					$scope.toggleEdit('billing');
					$scope.toggleAdd('billing');
				} else {
					alert('Failed to add new Billing Address.');
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		};
		$scope.addCreditCard = function() {
			var payload        = $scope.cdata;
			payload.api_key    = api_key;
			payload.client_id  = customer_data.id;
			payload.phone_id   = $scope.data.phone_id;
			payload.address_id = $scope.data.billing_address_id;
			var promise        = $http.post('/v1/client/creditcard', payload).success(function(data, status, headers, config) {
				if(data.status == 1) {
					$scope.credit_cards[data.payload.id] = data.payload;
					$scope.credit_card                   = data.payload;
					$scope.data.card_id                  = data.payload.id;
					$scope.toggleEdit('credit');
					$scope.toggleAdd('credit');
				} else {
					alert('Failed to add a new Credit Card.');
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		};
	} else {
		$scope.data = {optin: 1, store_card: 1, samebilling: 1, shipping_option: $scope.shipping_data[shipping_id].id, ticket_format: ticket_format, fee: $scope.order_data.service_fee, qty: parseInt($scope.order_data.qty)};
		$scope.toggleSame = function() {
			if($scope.data.samebilling) {
				$scope.data.sfirstname = $scope.data.bfirstname;
				$scope.data.slastname  = $scope.data.blastname;
				$scope.data.saddress1  = $scope.data.baddress1;
				$scope.data.saddress2  = $scope.data.baddress2;
				$scope.data.scity      = $scope.data.bcity;
				$scope.data.sstate     = $scope.data.bstate;
			} else {
				$scope.data.sfirstname = '';
				$scope.data.slastname  = '';
				$scope.data.saddress1  = '';
				$scope.data.saddress2  = '';
				$scope.data.scity      = '';
				$scope.data.sstate     = '';
			}
		};
	}
	$scope.shipping = $scope.shipping_data[$scope.data.shipping_option];
	$scope.setShipping = function() {
		$scope.shipping = $scope.shipping_data[$scope.data.shipping_option];
		$scope.updateTotals();
	};
	$scope.getFees = function() {
		if(typeof service_fee == 'undefined')
			return parseFloat(0.00);
		for(var k in service_fee) {
			var cfee = service_fee[k];
			if(parseFloat($scope.subtotal) >= parseFloat(cfee.range_minimum)) {
				if(cfee.type == 'PercentageServiceFee') {
					$scope.data.fee = parseFloat($scope.subtotal * cfee.amount / 100);
				} else {
					$scope.data.fee = parseFloat(cfee.amount);
				}
			}
		}
	};
	$scope.updateTotals = function() {
		$scope.subtotal = $scope.data.qty * $scope.order_data.price;
		$scope.getFees();
		$scope.total = ($scope.data.qty * $scope.order_data.price) + parseFloat($scope.data.fee) + parseFloat($scope.shipping.price);
	};
	$scope.process = function() {
		if(typeof $scope.toggleSame != 'undefined')
			$scope.toggleSame();
		if($scope.accept_terms == 1) {
			if($scope.frmCheckout.$valid) {
				if(typeof $scope.data.email != 'undefined' && $scope.data.email != $scope.data.email2) {
					alert('Your email addresses do not match.');
					return false;
				}
				if(typeof $scope.data.password != 'undefined' && $scope.data.password != $scope.data.password2) {
					alert('Your passwords do not match.');
					return false;
				}
				var promise = $http.post('/order/process', $scope.data).success(function(data, status, headers, config) {
					if(data.status == 1) {
						window.location.href = '/order/confirm';
					} else if(data.status == 2) {
						alert('Validation Error: ' + data.message);
					} else {
						alert('There was a problem processing your order.');
						window.location.href = '/order';
					}
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			} else {
				alert('Please fill out all required fields.');
			}
		} else {
			alert('Please accept our terms of Service before you continue.');
		}
	};
	$scope.updateTotals();
});
