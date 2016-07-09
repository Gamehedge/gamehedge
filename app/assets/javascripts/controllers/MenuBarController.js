app = angular.module('gamehedge')

app.controller('MenuBarController', function($scope,$rootScope,Auth,$location){
	//The global variable locat gets the current location.path
	$scope.global = $rootScope;
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        console.log(user); // => {id: 1, ect: '...'}
        $rootScope.isLoggedin = true;
    }, function(error) {
        // unauthenticated error
        $rootScope.isLoggedin = false;
    });
    var config = {
        headers: {
            'X-HTTP-Method-Override': 'DELETE'
        }
    };
    $scope.logout = function(){
    	Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            console.log("logged out");
        }, function(error) {
            // An error occurred logging out.
            console.log("An error occurred logging out.");
        });
        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
             $rootScope.isLoggedin = false;
        });
    }
});