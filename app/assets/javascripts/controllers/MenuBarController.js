app = angular.module('gamehedge')

app.controller('MenuBarController', function($scope,$rootScope,Auth,$location,dataService){
	//The global variable locat gets the current location.path
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
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
        $scope.hideMenus();
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

    $scope.showSlideMain = function(){
        $rootScope.showMenu = true;
        $scope.showMainMenu = true;
    }
    $scope.hideMenus = function(){
        $rootScope.showMenu = false;
        $scope.showMainMenu = false;
        $scope.showSearchMenu = false;
    }

    $scope.showSlideSearch = function(){
        $rootScope.showMenu = true;
        $scope.showSearchMenu = true;
    }

    $scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
                console.log(response)
                $scope.searchResults = response;
        });
    };

    $scope.appendToElement = window.document.querySelector('#results');
});