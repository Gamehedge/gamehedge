controllers = angular.module('gamehedge')

controllers.controller('LoginController', function($scope,$rootScope,Auth,$location){
    Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $location.path('/');
    }, function(error) {
        // unauthenticated error
        
    });
	$scope.login = function(){
		var credentials = {
            email: $scope.email,
            password: $scope.password,
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        console.log(credentials);
        Auth.login(credentials, config).then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            // Authentication failed...
            console.log("failed");
            $rootScope.isLoggedin = false;
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            console.log("logged in");
            $rootScope.isLoggedin = true;
            $location.path('/');
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}
});