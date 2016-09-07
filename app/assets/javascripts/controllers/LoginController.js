controllers = angular.module('gamehedge')

controllers.controller('LoginController', function($scope,$rootScope,Auth,$location,$window,$http){
    $rootScope.locat = $location.url();
    $rootScope.showHeader = true;
    Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        //console.log()
        $location.path('/');
    }, function(error) {
        // unauthenticated error
        
    });
	$scope.login = function(){
        $scope.logging_in = true;
		var credentials = {
            email: $scope.email,
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
            $location.path('/');
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}

    $scope.forgotPass = function(value){
        $scope.forgot_password = value;
    }

    $scope.updatePassword = function(){
        $scope.sending_password = true;
        var parameters = {
            email: $scope.email
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
    $scope.logging_in = false;
    $scope.sending_password = false;
    $rootScope.isOrder = false;
    $rootScope.darkHeader = true;
    $scope.forgot_password = false;
    $window.scrollTo(0, 0);
})
