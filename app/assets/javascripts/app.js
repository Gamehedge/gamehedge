app = angular.module('gamehedge',[
  'templates',
  'ngRoute',
  'controllers',
])

app.config([ '$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: "index.html",
                controller: 'HomeController',
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);