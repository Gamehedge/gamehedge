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
        .when('/leagues/:leagueId/:slug', {
            templateUrl: "league.html",
            controller: 'LeagueController',
        })
        .when('/performers/:performerId/:slug', {
            templateUrl: "performer.html",
            controller: 'PerformerController',
        })
        .when('/venues/:venueId/:slug', {
            templateUrl: "venue.html",
            controller: 'VenueController',
        })
        .when('/events/:eventId/:slug', {
            templateUrl: "event.html",
            controller: 'EventController',
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

app.directive('bindUnsafeHtml', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
              // watch the 'bindUnsafeHtml' expression for changes
              return scope.$eval(attrs.bindUnsafeHtml);
            },
            function(value) {
              // when the 'bindUnsafeHtml' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);