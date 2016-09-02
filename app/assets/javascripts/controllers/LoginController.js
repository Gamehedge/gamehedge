controllers = angular.module('gamehedge')

controllers.controller('LoginController', function($scope,$rootScope,Auth,$location,$window,$http){
    $rootScope.locat = $location.url();
    Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        console.log()
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
            $rootScope.user = undefined;
            $rootScope.isLoggedin = false;
            alert("Email or password incorrect");
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            console.log(currentUser);
            $rootScope.user = currentUser;
            $rootScope.isLoggedin = true;
            $location.path('/');
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}

    $scope.forgotPass = function(value){
        $scope.forgot_password = value;
    }

    $rootScope.isOrder = false;
    $rootScope.darkHeader = true;
    $scope.forgot_password = false;
    $window.scrollTo(0, 0);
});