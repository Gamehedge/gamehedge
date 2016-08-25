controllers = angular.module('gamehedge')

controllers.controller('OrderController', function($scope,$rootScope,$http,$location,$timeout,dataService,$window){
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
});