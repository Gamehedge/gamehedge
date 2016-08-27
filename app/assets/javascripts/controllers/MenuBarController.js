app = angular.module('gamehedge')

app.controller('MenuBarController', function($scope,$rootScope,Auth,$location,dataService,$http){


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

    $scope.logout = function(){
        $scope.hideMenus();
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
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

    $scope.getLeagues = function(){
        $http({
            method: 'GET',
            url: '/api/v1/sports',
            headers: {
               'Authorization': 'Token token="TokenHere"'
            },
        }).then(function successCallback(response) {

            $scope.leagueList = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.location(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    // Initializers

    $scope.getLeagues();
});