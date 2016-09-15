controllers = angular.module('gamehedge')

controllers.controller('PressController', function($scope,$rootScope,$location,$window, dataService){
    $window.scrollTo(0, 0);
    $rootScope.showHeader = true;
    $scope.searchTerm = "";
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
                return response.data;
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
});