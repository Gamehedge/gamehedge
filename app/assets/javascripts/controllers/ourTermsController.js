controllers = angular.module('gamehedge')

controllers.controller('ourTermsController', function($scope,$rootScope,$location,$window, dataService){
    $window.scrollTo(0, 0);
    $rootScope.showHeader = true;
    
    $scope.getSearchHints = function(val) {
        return dataService.getData("/search/?search=" + val + "&limit=10")
            .then(function(response){
            	//console.log(response)
                var width = $("#search_element").width() + 50;
                //console.log("width: " + width);
                $('#form-home-search [uib-typeahead-popup].dropdown-menu').width(width);
                
                return response.data;
        });
    };
});