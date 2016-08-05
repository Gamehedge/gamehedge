app = angular.module('gamehedge',[
  'templates',
  'ngRoute',
  'Devise',
  'templates',
  'ngAnimate',
  'ui.bootstrap',
])

app.config([ '$routeProvider','$locationProvider','AuthProvider',
    function($routeProvider,$locationProvider,AuthProvider){
      AuthProvider.resourceName('client');
      AuthProvider.loginPath('/clients/sign_in.json');
      AuthProvider.logoutPath('/clients/sign_out.json');
      $routeProvider
        .when('/', {
            templateUrl: "home.html",
            controller: 'HomeController',
        })
        .when('/login/', {
            templateUrl: "login.html",
            controller: 'LoginController',
        })
        .when('/leagues/:leagueId', {
            templateUrl: "league.html",
            controller: 'LeagueController',
        })
        .otherwise({
            redirectTo: '/'
        });
      if(window.history && window.history.pushState){
          //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

       // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

       // if you don't wish to set base URL then use this
       $locationProvider.html5Mode({
               enabled: true,
               requireBase: false
        });
      }
    }
]);

app.run(function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (event, next, nextParams) {
        $rootScope.locat = next.split('#')[next.split('#').length - 1];
    });
});