controllers = angular.module('gamehedge')

controllers.controller('contactController', function($scope,$rootScope,$location,$window, dataService, apiService){
    $window.scrollTo(0, 0);
    $rootScope.showHeader = true;
    $scope.searchTerm = "";
    $scope.value_1 = Math.floor((Math.random() * 10) + 1);;
    $scope.value_2 = Math.floor((Math.random() * 10) + 1);;
    $scope.answer = $scope.value_1 + $scope.value_2;

    $rootScope.title = "Contact us | Gamehedge";
    $rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team loses by a certain amount or more, get 50% of your ticket price back.";
    
    $scope.proccessing = false;
    $scope.getSearchHints = function(val) {
        var now = new Date();
        now.setHours(now.getHours() + 1);
        var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        return dataService.getData("/search/?search=" + val + "&limit=4&today_date="+today_date)
            .then(function(response){
            	//console.log(response)
                var width = $("#search_element").width() + 50;
                //console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                $scope.searchBarResults = response.data;
                return response;
        });
    };
    $scope.onSelect = function ($item, $model, $label) {
        $location.path($scope.searchTerm.url);
    };

    $scope.goToSearch = function(){
        if($scope.searchBarResults != undefined){
            if($scope.searchBarResults.length > 0){
                $location.path($scope.searchBarResults[0].url);
            }
        }
    }
    
    $scope.redirect = function() {
        
    }
    
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.contactForm.$valid) {
            if($scope.contact.human != $scope.answer) {
                swal("Error", "The answer is wrong. Please check and try again.", "error");
            }
            else {
                $scope.proccessing = true;
                
                dataService.getData("/contact/send_message?name=" + $scope.contact.name + "&email=" + $scope.contact.email + "&message=" + $scope.contact.message)
                .then(function(response){
                    $scope.proccessing = false;
                    swal({   
                        title: "Thanks for contact us",   
                        text: "Our team will respond as soon as possible.",   
                        type: "success",    
                        closeOnConfirm: false 
                    }, 
                    function(){   
                        swal.close();
                        $location.path('/');
                        $scope.$apply();
                    });
                });
                
            }
        }

    };
});