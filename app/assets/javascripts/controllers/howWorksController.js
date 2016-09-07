controllers = angular.module('gamehedge')

controllers.controller('howWorksController', function($scope,$rootScope,$location,$window, dataService, $timeout){
    $window.scrollTo(0, 0);
    $rootScope.showHeader = true;
    
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
    
    $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: true,
        arrows: false,  
        infinite: false,
        dots: true,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
            }
        }
    };
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 100);
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 200);
    
    $timeout(function () {
        $scope.slickConfig.method.slickSetOption(null, null, true);  
    }, 500);
});