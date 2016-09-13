controllers = angular.module('gamehedge')

controllers.controller('contactController', function($scope,$rootScope,$location,$window, dataService, apiService){
    $window.scrollTo(0, 0);
    $rootScope.showHeader = true;
    $rootScope.searchTerm = "";
    $scope.value_1 = Math.floor((Math.random() * 10) + 1);;
    $scope.value_2 = Math.floor((Math.random() * 10) + 1);;
    $scope.answer = $scope.value_1 + $scope.value_2;
    
    $scope.proccessing = false;
    $scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	//console.log(response)
                var width = $("#search_element").width() + 50;
                //console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                
                return response;
        });
    };
    
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