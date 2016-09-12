app = angular.module('gamehedge')

app.controller('MenuBarController', function($scope,$rootScope,Auth,$location,dataService,$http,apiService){

	$scope.logout = function(){
        $scope.hideMenus();
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
    	Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            //console.log("logged out");
            $rootScope.isLoggedin = false;
            $rootScope.user = undefined;
            $location.path('/');
        }, function(error) {
            // An error occurred logging out.
            //console.log("An error occurred logging out.");
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
                $scope.searchResults = response.data;
        });
    };

    $scope.getLeagues = function(){
        apiService.getData('/api/v1/sports/')
            .then(function(response){
                $scope.leagueList = response;
        });
    }

    $scope.getDivisions = function(){
        apiService.getData('/api/v1/divisions?light=true')
            .then(function(response){
                $scope.divisions = response;
        });
    }

    $scope.getPerformers = function(){

        apiService.getData('/api/v1/performers?light=true')
            .then(function(response){
                $scope.performers = response;
        });
    }
    
    $scope.footer_email = "";
    $scope.footer_proccessing = false;
    $scope.sendEmailRequest = function(){
        if ($scope.footer_form.$valid) {
            $scope.footer_proccessing = true;
            
            dataService.getData("/contact/send_email_message?email=" + $scope.footer_email)
            .then(function(response){
                $scope.footer_proccessing = false;
                $scope.footer_email = "";
                swal({   
                    title: "Thanks!",   
                    text: "Our team will send you updates and deals.",   
                    type: "success"
                });
            });
        }
    }
    // Initializers

    $scope.getLeagues();
    $scope.getDivisions();
    $scope.getPerformers()
    
});