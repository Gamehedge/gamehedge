app = angular.module('gamehedge',[
  'templates',
  'ngRoute',
  'Devise',
  'templates',
  'ngAnimate',
  'ui.bootstrap',
  'slickCarousel',
  'angular-ladda',
  'angular-google-analytics',
  'ngLocationUpdate',
  'angularLoad',
  'sly'
])

//app.config([ '$routeProvider','$locationProvider','AuthProvider', '$httpProvider',
//    function($routeProvider,$locationProvider,AuthProvider,$httpProvider){
//      $httpProvider.useApplyAsync(true);

      /*GA Enabled START*/

       app.config([ '$routeProvider','$locationProvider','AuthProvider', 'AnalyticsProvider', '$httpProvider',
           function($routeProvider,$locationProvider,AuthProvider,AnalyticsProvider,$httpProvider){
             $httpProvider.useApplyAsync(true);
       //AnalyticsProvider.setAccount('UA-76054076-1');




    var ga_inuse = 'UA-76054076-1';

       //Check for govx cookie and set vars
    var govxcookie = '';
    var nameEQ5 = "isghgovx" + "=";
    var ca5 = document.cookie.split(';');
    for(var i5=0;i5 < ca5.length;i5++) {
        var c5 = ca5[i5];
        while (c5.charAt(0)==' ') c5 = c5.substring(1,c5.length);
        if (c5.indexOf(nameEQ5) == 0) {
            govxcookie = c5.substring(nameEQ5.length,c5.length);
        }
    }
    if(govxcookie == "1"){
        //SET GOVX GA ID
        //alert('GOVX GA 1'); 
        ga_inuse = 'UA-76054076-2';       
        console.log('GOVX GA 1');
    }else{
        if(document.referrer.indexOf("govx") > -1){
            //SET GOVX GA ID
            ga_inuse = 'UA-76054076-2';                   
            console.log('GOVX GA 2');
        }else{
            //GAMEHEDGE GA ID            
            console.log('GH GA');

        }
    }




       AnalyticsProvider.setAccount({
            tracker: ga_inuse,
            fields: {
                siteSpeedSampleRate: 30
            }
        });
       AnalyticsProvider.useAnalytics(true);
       AnalyticsProvider.trackUrlParams(true);
       AnalyticsProvider.useECommerce(true, false);
       AnalyticsProvider.setPageEvent('$viewContentLoaded');
       

      /*GA DIsabled END*/

      AuthProvider.resourceName('client');
      AuthProvider.loginPath('/clients/sign_in.json');
      AuthProvider.logoutPath('/clients/sign_out.json');
      AuthProvider.sendResetPasswordInstructionsPath('/clients/password.json');
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
        .when('/performer/:performerId/:slug', {
            templateUrl: "performer.html",
            controller: 'PerformerController',
        })
        .when('/performer/:performerId/:slug/home', {
            templateUrl: "performer.html",
            controller: 'PerformerController',
        })
        .when('/venues/:venueId/:slug', {
            templateUrl: "venue.html",
            controller: 'VenueController',
        })
        .when('/events_old/:eventId/:slug', {
            templateUrl: "event.html",
            controller: 'EventController',
        })
        .when('/events/:eventId/:slug', {
            templateUrl: "map-test.html",
            controller: 'mapTestController',
        })	
        .when('/govx/:eventId/:slug', {
            templateUrl: "govx.html",
            controller: 'govxController',
        })	
        .when('/comingsoon', {
            templateUrl: "cs.html",
            controller: 'csController',
        })	
        .when('/order/:ticektId', {
            templateUrl: "order.html",
            controller: 'OrderController',
        })
        .when('/govx-order/:ticektId', {
            templateUrl: "govx-order.html",
            controller: 'GovxOrderController',
        })
        .when('/confirm/:orderId', {
            templateUrl: "confirm.html",
            controller: 'ConfirmController',
        })
        .when('/member', {
            templateUrl: "member.html",
            controller: 'MemberController',
        })
        .when('/order_history', {
            templateUrl: "order_history.html",
            controller: 'OrderHistoryController',
        })
        .when('/press', {
            templateUrl: "press.html",
            controller: 'PressController',
        })
        .when('/our-terms', {
            templateUrl: "our-terms.html",
            controller: 'ourTermsController',
        })
        .when('/faq', {
            templateUrl: "faq.html",
            controller: 'faqController',
        })
        .when('/contact', {
            templateUrl: "contact.html",
            controller: 'contactController',
        })
        .when('/how-it-works', {
            templateUrl: "how-it-works.html",
            controller: 'howWorksController',
        })
        .when('/testimonials', {
            templateUrl: "testimonials.html",
            controller: 'Testimonials',
        })
        .when('/superbowl', {
            templateUrl: "superbowl.html",
            controller: 'Superbowl',
        })        
        .when('/privacy-policy', {
            templateUrl: "privacy-policy.html",
            controller: 'privacyPolicyController',
        })
        .when('/map-test/:eventId/:slug', {
            templateUrl: "map-test.html",
            controller: 'mapTestController',
        })
        // .otherwise({
        //     redirectTo: '/'
        // });
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

 app.run(function(Analytics) {
     Analytics.log;
 });

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