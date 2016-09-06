app = angular.module('gamehedge')

app.controller('MenuBarController', function($scope,$rootScope,Auth,$location,dataService,$http){


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
            $rootScope.isLoggedin = false;
            $rootScope.user = undefined;
            $location.path('/');
        }, function(error) {
            // An error occurred logging out.
            console.log("An error occurred logging out.");
        });
        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
             $rootScope.isLoggedin = false;
             $rootScope.user = undefined;
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
                //console.log(response)
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
            console.log("Leagues");
            console.log($scope.leagueList);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.location(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.getDivisions = function(){
        $http({
            method: 'GET',
            url: '/api/v1/divisions?light=true',
            headers: {
               'Authorization': 'Token token="TokenHere"'
            },
        }).then(function successCallback(response) {

            $scope.divisions = response.data;
            console.log("Divisions");
            console.log($scope.divisions);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.location(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.getPerformers = function(){
        $http({
            method: 'GET',
            url: '/api/v1/performers?light=true',
            headers: {
               'Authorization': 'Token token="TokenHere"'
            },
        }).then(function successCallback(response) {

            $scope.performers = response.data;
            console.log("Performers");
            console.log($scope.performers);
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
    $scope.getDivisions();
    $scope.getPerformers()
    
});