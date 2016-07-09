app = angular.module('gamehedge',[
  'templates',
  'ngRoute',
  'Devise',
  'templates',
])

app.config([ '$routeProvider','AuthProvider',
    function($routeProvider,AuthProvider){
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
            .otherwise({
                redirectTo: '/'
            });
    }
]);

app.run(function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (event, next, nextParams) {
        $rootScope.locat = next.split('#')[next.split('#').length - 1];
    });
});